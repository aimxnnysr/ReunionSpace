import { Classmate, Announcement, Memory } from '../types';
import {
  Sparkles,
  ArrowRight,
  Clock,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface HomeViewProps {
  user: Classmate;
  classmatesCount: number;
  memoriesCount: number;
  messagesCount: number;
  announcements: Announcement[];
  latestMemory: Memory | null;
  setActiveTab: (tab: string) => void;
  onPostMemoryQuick: () => void;
}

export default function HomeView({
  user,
  classmatesCount,
  memoriesCount,
  messagesCount,
  announcements,
  latestMemory,
  setActiveTab,
  onPostMemoryQuick,
}: HomeViewProps) {
  
  // Custom greeting based on time of day
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const greeting = getGreeting();
  console.log(greeting);

  return (
    <div id="home-view" className="space-y-8 animate-fadeIn">
      {/* Welcome Banner Panel */}
      <section
        id="welcome-panel"
        className="relative overflow-hidden bg-linear-to-br from-blue-900/20 to-emerald-900/10 border border-blue-500/20 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-3.5 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
            <Sparkles className="w-3 h-3 text-glow-blue" />
            <span>ALUMNI GATEWAY ONLINE</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Welcome back, <span className="text-blue-400">{user.name}</span>.
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-lg leading-relaxed">
              The Elysian portal is active. Stay connected, save and share nostalgic high school memories, and view coordinates with the alumni (Batch 2020–2024).
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={onPostMemoryQuick}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:bg-blue-400 transition-all cursor-pointer"
            >
              Post Memory
            </button>
            <button
              onClick={() => setActiveTab('profiles')}
              className="px-6 py-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-xl font-semibold hover:bg-slate-700 transition-all cursor-pointer"
            >
              Update Profile
            </button>
          </div>
        </div>

        {/* Vintage Virtual Yearbook Badge */}
        <div className="shrink-0 z-10 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-xl text-center max-w-xs md:w-64 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
          <BookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2.5 animate-pulse" />
          <div className="font-black text-xl text-white tracking-tight">ELYSIAN</div>
          <div className="text-[10px] font-mono text-slate-500 tracking-widest mt-0.5">BATCH 2020–2024</div>
          <div className="mt-4 pt-3.5 border-t border-slate-800/40 flex justify-around text-center">
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">STATUS</div>
              <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">ALUMNI</div>
            </div>
            <div className="border-l border-slate-800/40"></div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">CLASS</div>
              <div className="text-xs font-bold text-blue-400 font-mono mt-0.5">K5</div>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-full bg-[radial-gradient(circle_at_100%_0%,rgba(56,189,248,0.15)_0%,transparent_70%)] pointer-events-none"></div>
      </section>

      {/* Quick Stats Grid Section */}
      <section id="quick-stats" className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Total Classmates Card */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-4 flex flex-col justify-center items-center backdrop-blur-xl relative overflow-hidden group hover:border-blue-500/20 transition-all duration-300">
          <span className="text-3xl font-bold text-emerald-400">{classmatesCount}</span>
          <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter mt-1">Members</span>
        </div>

        {/* Total Memories Shared */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-4 flex flex-col justify-center items-center backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
          <span className="text-3xl font-bold text-blue-400">{memoriesCount}</span>
          <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter mt-1">Memories</span>
        </div>

        {/* New Updates Count */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-4 flex flex-col justify-center items-center backdrop-blur-xl col-span-2 lg:col-span-1 relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300">
          <span className="text-3xl font-bold text-white">{messagesCount}</span>
          <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter mt-1">Online</span>
        </div>

      </section>

      {/* Announcements and Quick Actions Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Announcements Feed - 7 cols */}
        <div id="announcements-feed" className="lg:col-span-7 bg-slate-950/60 border border-slate-800/50 rounded-3xl p-6 backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/40 mb-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Announcements</h3>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold font-mono">NEW</span>
          </div>

          <div className="space-y-4 flex-1">
            {announcements.map((ann, idx) => {
              const borderColors = ['border-emerald-500', 'border-blue-500', 'border-slate-500'];
              const borderColor = borderColors[idx % borderColors.length];
              return (
                <div key={ann.id} className={`p-4 bg-slate-900/40 rounded-2xl border-l-2 ${borderColor} border-y border-r border-slate-800/40 hover:border-slate-700/60 transition-all space-y-2`}>
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-semibold text-sm text-slate-100">{ann.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase shrink-0 ${
                      ann.category === 'Urgent'
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                        : ann.category === 'Event'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {ann.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{ann.content}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/30">
                    <span>Author: {ann.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ann.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & Latest Memory Widget - 5 cols */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Quick Actions Panel */}
          <div id="quick-actions" className="bg-slate-950/60 border border-slate-800/50 rounded-3xl p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Board Operations</h3>
            <div className="grid grid-cols-1 gap-2.5">
              
              <button
                id="btn-view-classmates"
                onClick={() => setActiveTab('classmates')}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-blue-500/10 border border-slate-800/50 hover:border-blue-500/20 transition-all text-left text-xs text-blue-400 font-semibold cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                  Explore Classmates
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                id="btn-post-memory"
                onClick={onPostMemoryQuick}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-emerald-500/10 border border-slate-800/50 hover:border-emerald-500/20 transition-all text-left text-xs text-emerald-400 font-semibold cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  Broadcast School Memory
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                id="btn-update-profile"
                onClick={() => setActiveTab('profiles')}
                className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/40 hover:bg-purple-500/10 border border-slate-800/50 hover:border-purple-500/20 transition-all text-left text-xs text-purple-400 font-semibold cursor-pointer group"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(163,116,250,0.8)]"></span>
                  Update Personal Information
                </span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>

            </div>
          </div>

          {/* Latest Shared Memory Preview Card */}
          {latestMemory && (
            <div className="bg-slate-950/60 border border-slate-800/50 rounded-3xl p-5 backdrop-blur-xl space-y-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Latest Memory</h4>
                  <span className="text-[10px] font-mono text-emerald-400">ACTIVE TIMELINE</span>
                </div>
                
                {/* Visual Image container (gradient style matching digital yearbook) */}
                <div
                  className="w-full h-32 rounded-xl border border-slate-800/50 relative overflow-hidden flex items-center justify-center p-4 text-center"
                  style={{ background: latestMemory.imageValue }}
                >
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
                  <div className="z-10">
                    <span className="text-3xl mb-1.5 block">{latestMemory.avatarEmoji}</span>
                    <span className="font-bold text-xs text-white block tracking-wide">{latestMemory.classmateName}</span>
                    <span className="text-[10px] text-slate-300 font-mono mt-0.5">{latestMemory.date}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic line-clamp-2 mt-3 leading-relaxed">
                  "{latestMemory.caption}"
                </p>
              </div>

              <button
                onClick={() => setActiveTab('memories')}
                className="w-full mt-3.5 py-2 px-4 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold text-slate-200 hover:text-white transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Browse Memories Timeline</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>

      </section>
    </div>
  );
}
