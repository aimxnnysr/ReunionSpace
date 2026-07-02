import { useState } from 'react';
import { Classmate, Memory } from '../types';
import { Sparkles, Search, User, Calendar, BookOpen, Heart, MessageSquare, Award } from 'lucide-react';

interface ClassDetailsViewProps {
  classmates: Classmate[];
  memories: Memory[];
  onInspectClassmate: (student: Classmate) => void;
}

interface Lecturer {
  id: string;
  name: string;
  subject: string;
  emoji: string;
  quote: string;
}

export default function ClassDetailsView({ classmates, memories, onInspectClassmate }: ClassDetailsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');

  // Static Lecturers List for Elysian K5
  const lecturers: Lecturer[] = [
    {
      id: 'L01',
      name: 'Mr. Azmi Harun',
      subject: 'Chemistry & Science Lead',
      emoji: '👨‍🔬',
      quote: '“Please double-check your calculations. And Amar, no unapproved bubble experiments in the hallway!”'
    },
    {
      id: 'L02',
      name: 'Madam Sarah Tan',
      subject: 'Additional Mathematics',
      emoji: '👩‍🏫',
      quote: '“Elysian has the highest mean score in calculus. You are mathematically destined for greatness.”'
    },
    {
      id: 'L03',
      name: 'Mr. Samuel Ong',
      subject: 'English Literature & Drama Coach',
      emoji: '🎭',
      quote: '“All the world is a stage, but K5 is definitely the liveliest and most dramatic scene.”'
    },
    {
      id: 'L04',
      name: 'Madam Hawa Yusof',
      subject: 'Physics Mentor',
      emoji: '🌌',
      quote: '“Quantum physics is simple. Retaining K5’s quiet concentration is a true absolute mystery.”'
    }
  ];

  // Group Classmates by Genders based on their IDs (Male: A000-A010, Female: A011-A017)
  const maleClassmatesList = classmates.filter(c => {
    const num = parseInt(c.id.replace('A', ''), 10);
    return num <= 10;
  });

  const femaleClassmatesList = classmates.filter(c => {
    const num = parseInt(c.id.replace('A', ''), 10);
    return num > 10;
  });

  // Handle Search & Filter for Classmates in Archive
  const filterList = (list: Classmate[]) => {
    return list.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredMales = filterList(maleClassmatesList);
  const filteredFemales = filterList(femaleClassmatesList);

  return (
    <div id="class-details-view" className="space-y-10 animate-fadeIn">
      
      {/* 1. Hero Premium Banner Header */}
      <section className="relative rounded-3xl overflow-hidden border border-slate-800/60 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        {/* Background Decorative Radial Glows */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="space-y-4 max-w-2xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            Official Batch Archive
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Elysian <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-emerald-400">— K5</span>
          </h1>
          <p className="text-slate-300 font-mono text-sm tracking-wide">
            CLASS PORTAL // BATCH 2020–2024
          </p>
          <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
            Welcome to the official, eternal digital yearbook. Built exclusively for Elysian K5 alumni to preserve achievements, check on classmate trajectories, celebrate our honorary mentors, and stay bound through time.
          </p>
        </div>

        {/* Vintage Hologram Batch Badge */}
        <div className="relative shrink-0 w-44 h-44 rounded-2xl bg-slate-950/80 border border-slate-800 p-4 flex flex-col justify-between items-center text-center shadow-lg z-10 backdrop-blur-md">
          <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-emerald-500 rounded-2xl opacity-15 blur"></div>
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
            <Award className="w-6 h-6 text-emerald-400 animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">SECTION</p>
            <p className="text-xl font-bold text-white tracking-wider">K5 ALUMNI</p>
          </div>
          <p className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            EST. 2020
          </p>
        </div>
      </section>

      {/* 2. Lecturers List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Honorary Lecturers</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 tracking-wider">K5 MENTORS</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {lecturers.map((lec) => (
            <div 
              key={lec.id}
              className="bg-slate-950/60 border border-slate-800/50 p-5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all space-y-4 relative overflow-hidden group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                    {lec.emoji}
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 font-semibold">{lec.id}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">{lec.name}</h4>
                  <p className="text-[10px] text-purple-400 font-mono mt-0.5">{lec.subject}</p>
                </div>
              </div>
              <blockquote className="text-[11px] text-slate-400 italic leading-relaxed border-t border-slate-800/30 pt-3">
                {lec.quote}
              </blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Classmates List (Grouped by Genders) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/40 pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Grouped Classmates Database</h2>
          </div>
          
          {/* Internal Filters & Search */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search archive..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-900/60 border border-slate-800/50 rounded-xl py-1.5 pl-9 pr-3 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-44 transition-all"
              />
            </div>
            <div className="flex bg-slate-900/60 border border-slate-800/50 rounded-xl p-0.5 text-[10px]">
              <button 
                onClick={() => setGenderFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${genderFilter === 'all' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setGenderFilter('male')}
                className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${genderFilter === 'male' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Males
              </button>
              <button 
                onClick={() => setGenderFilter('female')}
                className={`px-2.5 py-1 rounded-lg transition-all font-semibold ${genderFilter === 'female' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Females
              </button>
            </div>
          </div>
        </div>

        {/* Male list */}
        {(genderFilter === 'all' || genderFilter === 'male') && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              Male Classmates ({filteredMales.length})
            </h3>
            
            {filteredMales.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No matching male classmates.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {filteredMales.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => onInspectClassmate(student)}
                    className="bg-slate-900/40 border border-slate-800/30 hover:border-blue-500/30 p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group"
                  >
                    <div className={`w-9 h-9 rounded-full bg-linear-to-tr ${student.avatarGradient} flex items-center justify-center text-base shrink-0 border border-slate-800/40`}>
                      {student.avatarEmoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-200 truncate group-hover:text-blue-300 transition-colors">{student.name}</p>
                      <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{student.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Female list */}
        {(genderFilter === 'all' || genderFilter === 'female') && (
          <div className="space-y-3 pt-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-pink-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]"></span>
              Female Classmates ({filteredFemales.length})
            </h3>
            
            {filteredFemales.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No matching female classmates.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                {filteredFemales.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => onInspectClassmate(student)}
                    className="bg-slate-900/40 border border-slate-800/30 hover:border-pink-500/30 p-3.5 rounded-xl transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden group"
                  >
                    <div className={`w-9 h-9 rounded-full bg-linear-to-tr ${student.avatarGradient} flex items-center justify-center text-base shrink-0 border border-slate-800/40`}>
                      {student.avatarEmoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-200 truncate group-hover:text-pink-300 transition-colors">{student.name}</p>
                      <p className="text-[10px] text-slate-400 truncate font-mono mt-0.5">{student.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Memories Timeline/Grid inside Details */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">Archived Memories Feed</h2>
          </div>
          <span className="text-[10px] font-mono text-slate-500 tracking-wider">K5 TIMELINE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memories.slice(0, 3).map((mem) => (
            <div 
              key={mem.id}
              className="bg-slate-950/60 border border-slate-800/50 p-5 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-8 h-8 rounded-full bg-linear-to-tr ${mem.avatarGradient} flex items-center justify-center text-sm shadow`}>
                    {mem.avatarEmoji}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">{mem.classmateName}</h4>
                    <span className="text-[9px] text-slate-500 font-mono block">{mem.date}</span>
                  </div>
                </div>

                <div 
                  className="w-full h-32 rounded-xl border border-slate-800/50 relative overflow-hidden flex items-center justify-center p-4 text-center mb-3"
                  style={{ background: mem.imageValue }}
                >
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px]"></div>
                  <div className="relative z-10 text-center">
                    <span className="text-2xl mb-1 block">{mem.avatarEmoji}</span>
                    <span className="font-extrabold text-[11px] text-white tracking-wide block">{mem.classmateName}</span>
                    <span className="inline-block text-[8px] font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 mt-1">
                      Elysian Shot
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 italic leading-relaxed">
                  "{mem.caption}"
                </p>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 border-t border-slate-800/30 pt-3">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500/70" /> {mem.likes} Likes
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500/70" /> {mem.comments.length} Comments
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
