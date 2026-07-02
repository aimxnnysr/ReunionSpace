import { useState } from 'react';
import { Classmate } from '../types';
import { Search, MapPin, Mail, Award, X, Smile } from 'lucide-react';

interface ClassmatesViewProps {
  classmates: Classmate[];
  currentUser: Classmate;
  onSendSalute: (senderName: string, recipientName: string) => void;
}

export default function ClassmatesView({ classmates, currentUser, onSendSalute }: ClassmatesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [selectedClassmate, setSelectedClassmate] = useState<Classmate | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter classmates based on search and selected role filter
  const filteredClassmates = classmates.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.currentStatus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedRoleFilter === 'all') return matchesSearch;
    return matchesSearch && c.category === selectedRoleFilter;
  });

  const handleSaluteSubmit = (recipient: Classmate) => {
    onSendSalute(currentUser.name, recipient.name);
    setToastMessage(`Salute broadcasted successfully for ${recipient.name}!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div id="classmates-view" className="space-y-6 animate-fadeIn">
      {/* Header and Filter block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">Classmate Directory</h2>
          <p className="text-xs text-gray-400">Scan and connect with the predefined alumni of Batch 2018</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, role, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-950/60 border border-slate-800/50 rounded-xl py-2 pl-10 pr-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-full sm:w-64 transition-all"
            />
          </div>

          <div className="flex bg-slate-950/60 rounded-xl p-1 border border-slate-800/50">
            <button
              onClick={() => setSelectedRoleFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedRoleFilter === 'all'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedRoleFilter('work')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedRoleFilter === 'work'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Work
            </button>
            <button
              onClick={() => setSelectedRoleFilter('study')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedRoleFilter === 'study'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Study
            </button>
            <button
              onClick={() => setSelectedRoleFilter('entrepreneurship')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedRoleFilter === 'entrepreneurship'
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Startup
            </button>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-900/90 text-emerald-100 border border-emerald-500/30 py-3 px-5 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] animate-bounce text-xs font-semibold flex items-center gap-2">
          <Smile className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Grid */}
      <div id="classmates-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredClassmates.length === 0 ? (
          <div className="col-span-full py-16 text-center">
            <p className="text-gray-400 text-sm">No classmate matched your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRoleFilter('all');
              }}
              className="mt-3 text-xs text-blue-400 underline hover:text-blue-300"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredClassmates.map((student) => {
            const isMe = student.id === currentUser.id;
            return (
              <div
                key={student.id}
                id={`classmate-card-${student.id}`}
                onClick={() => setSelectedClassmate(student)}
                className="group bg-slate-900/60 border border-slate-800/30 p-4 rounded-2xl hover:border-blue-500/30 hover:-translate-y-0.5 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                {/* Glow effect on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-tr from-transparent to-blue-500/5 group-hover:to-blue-500/10 transition-all rounded-full blur-xl"></div>

                <div className="space-y-4">
                  {/* Avatar & ID */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-tr ${student.avatarGradient} flex items-center justify-center text-2xl shadow-md border border-slate-800/40 group-hover:scale-105 transition-transform duration-300`}>
                      {student.avatarEmoji}
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-bold text-blue-400 tracking-wider block">{student.id}</span>
                      {isMe && (
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
                          YOU
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Profile info */}
                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                      {student.name}
                    </h3>
                    <p className="text-xs font-mono text-gray-500 mt-0.5">{student.role}</p>
                    <p className="text-xs text-gray-300 mt-2.5 font-medium line-clamp-1">{student.currentStatus}</p>
                    <p className="text-[11px] text-gray-400 line-clamp-1 font-mono">{student.details}</p>
                  </div>
                </div>

                {/* Footer details */}
                <div className="mt-5 pt-3.5 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {student.location}
                  </span>
                  <span className="text-[10px] text-blue-400 hover:underline">Inspect Profile →</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {selectedClassmate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-slate-950/90 border border-slate-800/50 backdrop-blur-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl animate-scaleIn">
            {/* Ambient background blur */}
            <div className={`absolute -top-16 -right-16 w-40 h-40 bg-linear-to-tr ${selectedClassmate.avatarGradient} opacity-25 rounded-full blur-3xl pointer-events-none`}></div>

            {/* Close button */}
            <button
              onClick={() => setSelectedClassmate(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900/50 border border-slate-800/50 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Header */}
            <div className="flex items-start gap-4.5 mb-6">
              <div className={`w-16 h-16 rounded-2xl bg-linear-to-tr ${selectedClassmate.avatarGradient} flex items-center justify-center text-4xl shadow-lg border border-slate-800/40 shrink-0`}>
                {selectedClassmate.avatarEmoji}
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl text-white">{selectedClassmate.name}</h3>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/20">{selectedClassmate.id}</span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
                  <span className="text-blue-300">{selectedClassmate.role}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    {selectedClassmate.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Body */}
            <div className="space-y-5 border-t border-slate-800/40 pt-5 mb-6 text-xs text-slate-300 leading-relaxed">
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-[10px]">What they are doing now</h4>
                <p className="font-semibold text-white text-sm">{selectedClassmate.currentStatus}</p>
                <p className="text-slate-400 font-mono">{selectedClassmate.details}</p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-[10px]">Yearbook Nostalgia Quote</h4>
                <blockquote className="bg-slate-900/40 border border-slate-800/40 border-l-2 border-l-emerald-500 p-4 rounded-2xl italic text-slate-200">
                  "{selectedClassmate.bio}"
                </blockquote>
              </div>

              {/* Hobbies list */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-[10px]">Interests / Hobbies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedClassmate.hobbies.map((hob, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900/50 border border-slate-700/30 text-[10px] text-slate-300 font-mono">
                      #{hob}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact info */}
              <div className="flex items-center gap-2.5 text-[11px] text-gray-400 font-mono">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{selectedClassmate.email}</span>
              </div>
            </div>

            {/* Quick action: Salute classmate */}
            <div className="border-t border-slate-800/40 pt-5 flex items-center justify-between gap-4">
              <div className="text-[10px] font-mono text-gray-500 max-w-50">
                Send a quick system-wide salute to celebrate their progress!
              </div>
              <button
                onClick={() => {
                  handleSaluteSubmit(selectedClassmate);
                  setSelectedClassmate(null);
                }}
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-display text-xs font-semibold rounded-xl transition-all shadow-[0_4px_12px_rgba(59,130,246,0.2)] flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Toast {selectedClassmate.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
