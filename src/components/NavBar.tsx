import { useState, useRef, useEffect } from 'react';
import { Classmate } from '../types';
import { Bell, LogOut, User, MapPin, Sparkles} from 'lucide-react';

interface NavBarProps {
  user: Classmate;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onUpdateProfileClick: () => void;
  notifications: Array<{ id: string; text: string; time: string; read: boolean }>;
  onMarkNotificationsRead: () => void;
}

export default function NavBar({
  user,
  onLogout,
  onUpdateProfileClick,
  notifications,
  onMarkNotificationsRead,
}: NavBarProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle outside click to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-20 bg-slate-950/20 backdrop-blur-md border-b border-slate-800/40 px-4 md:px-8 flex items-center justify-between">
      {/* Brand Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.4)]">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400 flex items-center gap-1">
            ReunionSpace
          </h1>
          <p className="text-[10px] font-mono text-slate-500 tracking-widest hidden sm:block">STUDENT PORTAL | ELYSIAN BATCH 2020–2024</p>
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-3.5">
        
        {/* Notification Bell */}
        <div className="relative" ref={notifMenuRef}>
          <button
            id="notif-bell-btn"
            onClick={() => {
              setShowNotifDropdown(!showNotifDropdown);
              setShowUserDropdown(false);
              if (!showNotifDropdown) {
                // Clear unread indicator visually on opening
                onMarkNotificationsRead();
              }
            }}
            className="w-10 h-10 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-blue-500/30 transition-all cursor-pointer relative"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-500 text-[10px] font-bold text-white flex items-center justify-center animate-bounce shadow-[0_0_8px_rgba(59,130,246,0.8)]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2.5 w-80 rounded-2xl bg-slate-950/90 border border-slate-800/50 backdrop-blur-2xl p-4 shadow-xl z-50 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/40 mb-2">
                <h3 className="font-bold text-sm text-white">Class Feed Signals</h3>
                <span className="text-[10px] font-mono text-blue-400 tracking-wider">REALTIME</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <p className="text-center text-xs text-gray-500 py-4">No recent signals.</p>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2.5 rounded-xl border transition-all text-xs flex items-start gap-2 ${
                        notif.read ? 'bg-slate-950/20 border-white/5 text-gray-400' : 'bg-blue-950/30 border-blue-500/20 text-gray-200'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5"></div>
                      <div className="flex-1">
                        <p>{notif.text}</p>
                        <span className="text-[9px] font-mono text-gray-500 block mt-1">{notif.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Trigger */}
        <div className="relative" ref={userMenuRef}>
          <button
            id="user-profile-menu-btn"
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setShowNotifDropdown(false);
            }}
            className="flex items-center gap-3 p-1.5 pr-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-slate-700/60 transition-all cursor-pointer"
          >
            <div className="relative">
              <div className={`w-8 h-8 rounded-full bg-linear-to-tr ${user.avatarGradient} flex items-center justify-center text-sm shadow border border-slate-700`}>
                {user.avatarEmoji}
              </div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-semibold text-slate-100 block">{user.name} <span className="text-[10px] text-slate-500 font-mono">[{user.id}]</span></span>
              <span className="text-[9px] text-blue-400 uppercase tracking-wide block">{user.role}</span>
            </div>
          </button>

          {/* User Profile Card Dropdown */}
          {showUserDropdown && (
            <div className="absolute right-0 mt-2.5 w-72 rounded-2xl bg-slate-950/90 border border-slate-800/50 backdrop-blur-2xl p-5 shadow-2xl z-50 text-left">
              <div className="text-center pb-4 border-b border-slate-800/40 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-tr ${user.avatarGradient} mx-auto flex items-center justify-center text-3xl shadow-lg mb-2`}>
                  {user.avatarEmoji}
                </div>
                <h3 className="font-bold text-white text-base leading-snug">{user.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-950 text-[10px] font-mono text-blue-400 border border-blue-500/20 uppercase tracking-wide">
                  {user.role}
                </span>
                
                <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mt-2 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <button
                  id="nav-edit-profile-btn"
                  onClick={() => {
                    onUpdateProfileClick();
                    setShowUserDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800/40 transition-all"
                >
                  <User className="w-4 h-4 text-emerald-400" />
                  <span>Update Profile Info</span>
                </button>

                <button
                  id="nav-logout-btn"
                  onClick={() => {
                    setShowUserDropdown(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Logout ReunionSpace</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
