import { Home, BookOpen, Users, Image, User, Compass, MessageSquare, Settings } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  // Navigation structure in the polished requested order
  const navGroups = [
    {
      title: 'Archive & Community',
      items: [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'class-overview', label: 'Class Overview', icon: BookOpen },
        { id: 'classmates', label: 'Classmates', icon: Users },
        { id: 'memories', label: 'Memories', icon: Image },
      ]
    },
    {
      title: 'Social & Matrix',
      items: [
        { id: 'profiles', label: 'Profiles', icon: User },
        { id: 'where-now', label: 'Where Are They Now', icon: Compass },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
      ]
    },
    {
      title: 'System & Control',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  // Flattened array for mobile bottom navigation mapping
  const mobileNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'class-overview', label: 'Overview', icon: BookOpen },
    { id: 'classmates', label: 'Classmates', icon: Users },
    { id: 'memories', label: 'Memories', icon: Image },
    { id: 'where-now', label: 'Where Now', icon: Compass },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-950/60 border-r border-slate-800/40 backdrop-blur-2xl min-h-[calc(100vh-80px)] p-6 shrink-0 pt-8 justify-between">
        <div className="space-y-6">
          {navGroups.map((group, gIdx) => (
            <div key={group.title} className="space-y-1.5">
              {gIdx > 0 && <div className="border-t border-slate-800/30 my-4" />}
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2 font-mono">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`sidebar-link-${item.id}`}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer border ${
                        isActive
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900/20 border-transparent'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'
                        }`}
                      />
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Nostalgic class status card updated for Elysian */}
        <div className="mt-8 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/40 text-center">
          <p className="text-[10px] font-mono text-slate-500 mb-1 uppercase tracking-wider">Elysian</p>
          <p className="text-xs font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 font-mono">
            “Batch 2020–2024”
          </p>
        </div>
      </aside>

      {/* Mobile Bottom Navigation (sleek scrollable horizontal tab bar) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800/50 px-3 py-2 flex items-center overflow-x-auto justify-start gap-3 shadow-[0_-10px_25px_rgba(0,0,0,0.6)] scrollbar-none scroll-smooth">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-nav-link-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl shrink-0 transition-all border ${
                isActive 
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-400' 
                  : 'text-slate-400 border-transparent hover:text-white bg-slate-900/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
