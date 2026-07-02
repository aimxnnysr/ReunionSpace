import { Classmate } from '../types';
import { Briefcase, GraduationCap, Rocket, MapPin} from 'lucide-react';
import { useState } from 'react';

interface WhereAreTheyNowViewProps {
  classmates: Classmate[];
  onInspectClassmate: (student: Classmate) => void;
}

export default function WhereAreTheyNowView({ classmates, onInspectClassmate }: WhereAreTheyNowViewProps) {
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'study' | 'work' | 'entrepreneurship'>('all');

  const studyClassmates = classmates.filter(c => c.category === 'study');
  const workClassmates = classmates.filter(c => c.category === 'work');
  const entClassmates = classmates.filter(c => c.category === 'entrepreneurship');

  const filteredList = classmates.filter(c => {
    if (selectedGroup === 'all') return true;
    return c.category === selectedGroup;
  });

  // Calculate percentages
  const total = classmates.length;
  const workPercent = Math.round((workClassmates.length / total) * 100);
  const studyPercent = Math.round((studyClassmates.length / total) * 100);
  const entPercent = Math.round((entClassmates.length / total) * 100);

  return (
    <div id="where-now-view" className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">Where Are They Now?</h2>
        <p className="text-xs text-gray-400">Track professional, academic, and entrepreneurial coordinates across the globe</p>
      </div>

      {/* Ratios Statistics Dashboard */}
      <section id="ratio-dashboard" className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Work Metric */}
        <div
          onClick={() => setSelectedGroup(selectedGroup === 'work' ? 'all' : 'work')}
          className={`bg-slate-950/60 border p-5 rounded-3xl relative overflow-hidden cursor-pointer transition-all ${
            selectedGroup === 'work' ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-slate-800/50 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Working Professionals</span>
            </div>
            <span className="text-xl font-black text-emerald-400">{workPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${workPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-mono font-medium">{workClassmates.length} classmate{workClassmates.length !== 1 ? 's' : ''} in corporate / design fields</p>
        </div>

        {/* Study Metric */}
        <div
          onClick={() => setSelectedGroup(selectedGroup === 'study' ? 'all' : 'study')}
          className={`bg-slate-950/60 border p-5 rounded-3xl relative overflow-hidden cursor-pointer transition-all ${
            selectedGroup === 'study' ? 'border-blue-500 bg-blue-950/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-slate-800/50 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Higher Education</span>
            </div>
            <span className="text-xl font-black text-blue-400">{studyPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: `${studyPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-mono font-medium">{studyClassmates.length} classmate{studyClassmates.length !== 1 ? 's' : ''} pursuing PhDs / residencies</p>
        </div>

        {/* Entrepreneurship Metric */}
        <div
          onClick={() => setSelectedGroup(selectedGroup === 'entrepreneurship' ? 'all' : 'entrepreneurship')}
          className={`bg-slate-950/60 border p-5 rounded-3xl relative overflow-hidden cursor-pointer transition-all ${
            selectedGroup === 'entrepreneurship' ? 'border-purple-500 bg-purple-950/20 shadow-[0_0_15px_rgba(163,116,250,0.1)]' : 'border-slate-800/50 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">Entrepreneurs & Founders</span>
            </div>
            <span className="text-xl font-black text-purple-400">{entPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500" style={{ width: `${entPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 font-mono font-medium">{entClassmates.length} classmate{entClassmates.length !== 1 ? 's' : ''} running active businesses</p>
        </div>

      </section>

      {/* Filter Category Tabs Indicator */}
      <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
        <h3 className="font-bold text-sm text-white">
          Listing {selectedGroup === 'all' ? 'All Alumni' : selectedGroup.toUpperCase()} Members
        </h3>
        {selectedGroup !== 'all' && (
          <button
            onClick={() => setSelectedGroup('all')}
            className="text-[11px] text-blue-400 hover:underline font-mono font-semibold"
          >
            Reset filter view
          </button>
        )}
      </div>

      {/* List / Board Layout */}
      <div id="where-now-list" className="space-y-3.5">
        {filteredList.map((student) => {
          return (
            <div
              key={student.id}
              onClick={() => onInspectClassmate(student)}
              className="group bg-slate-900/60 border border-slate-800/30 p-4 rounded-2xl hover:border-blue-500/30 hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                {/* Micro Avatar */}
                <div className={`w-10 h-10 rounded-full bg-linear-to-tr ${student.avatarGradient} flex items-center justify-center text-xl shrink-0 border border-slate-800/40`}>
                  {student.avatarEmoji}
                </div>
                
                {/* Details */}
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                      {student.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 font-semibold">{student.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    {student.role}
                  </p>
                </div>
              </div>

              {/* Company / Univ Details */}
              <div className="flex flex-col sm:items-end text-left sm:text-right">
                <span className="text-xs font-semibold text-white flex items-center sm:justify-end gap-1.5">
                  {student.category === 'study' ? (
                    <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  ) : student.category === 'work' ? (
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Rocket className="w-3.5 h-3.5 text-purple-400" />
                  )}
                  {student.details}
                </span>
                
                <span className="text-[11px] text-slate-500 flex items-center sm:justify-end gap-1 font-mono mt-0.5 font-medium">
                  <MapPin className="w-3 h-3 text-red-500/70" />
                  {student.location}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
