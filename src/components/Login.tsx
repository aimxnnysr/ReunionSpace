import { useState, FormEvent } from 'react';
import { PREDEFINED_CLASSMATES } from '../data';
import { Classmate } from '../types';
import { Sparkles, Key, AlertTriangle, HelpCircle } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: Classmate) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [classmateId, setClassmateId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showHelper, setShowHelper] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const cleanId = classmateId.trim().toUpperCase();

    const matchedUser = PREDEFINED_CLASSMATES.find(c => c.id === cleanId);

    if (matchedUser) {
      setError(null);
      onLoginSuccess(matchedUser);
    } else {
      setError('Access Denied: Member not found in ReunionSpace Class List');
      setIsShaking(true);
      // Reset shaking after animation completes
      setTimeout(() => {
        setIsShaking(false);
      }, 5000);
    }
  };

  const selectIdHelper = (id: string) => {
    setClassmateId(id);
    setError(null);
  };

  return (
    <div id="login-container" className="min-h-screen flex flex-col items-center justify-center bg-slate-950 relative px-4 overflow-hidden py-12">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="z-10 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-4 text-glow-blue tracking-wider font-semibold">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          K5 REUNION PORTAL
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
          Reunion<span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400">Space</span>
        </h1>
        <p className="text-slate-400 max-w-sm mx-auto text-sm">
          A futuristic digital yearbook and class dashboard hybrid.
        </p>
      </div>

      {/* Main Glass Card */}
      <div
        id="login-card"
        className={`w-full max-w-md bg-slate-950/60 border border-slate-800/50 rounded-3xl p-8 backdrop-blur-xl relative z-10 ${
          isShaking ? 'animate-shake border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.25)]' : ''
        }`}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">Welcome to ReunionSpace</h2>
          <p className="text-slate-400 text-xs mt-1">Authenticate using your unique Classmate ID</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="classmate-id" className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 font-semibold">
              Classmate Access Key
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <Key className="w-4 h-4 text-blue-400" />
              </span>
              <input
                id="classmate-id"
                type="text"
                placeholder="e.g. A001, A002..."
                value={classmateId}
                onChange={(e) => {
                  setClassmateId(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 text-center font-mono tracking-widest text-lg transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div id="login-error" className="p-3.5 bg-red-950/50 border border-red-500/30 text-red-300 text-xs rounded-xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            id="login-btn"
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-98 cursor-pointer text-center"
          >
            Access Portal
          </button>
        </form>

        {/* Quick Demo Assist Banner */}
        <div className="mt-8 pt-6 border-t border-slate-800/40 text-center">
          <button
            type="button"
            onClick={() => setShowHelper(!showHelper)}
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 hover:bg-blue-500/15 border border-blue-500/20 px-3 py-1.5 rounded-lg"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            {showHelper ? 'Hide Classmate Directory' : 'View Classmate ID Directory'}
          </button>

          {showHelper && (
            <div className="mt-4 text-left bg-slate-900/40 p-4 rounded-xl border border-slate-800/40 max-h-40 overflow-y-auto space-y-2">
              <p className="text-slate-400 text-[11px] mb-2 font-mono">
                Click any profile ID below to auto-fill:
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {PREDEFINED_CLASSMATES.map((student) => (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => selectIdHelper(student.id)}
                    className="p-1.5 text-left rounded bg-slate-950/60 hover:bg-blue-500/10 border border-slate-800/50 hover:border-blue-500/30 text-[11px] font-mono transition-all text-slate-300 hover:text-white flex items-center justify-between cursor-pointer"
                  >
                    <span>{student.name}</span>
                    <span className="text-blue-400 font-bold">{student.id}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 text-center text-slate-600 font-mono text-[10px] tracking-widest z-10 uppercase">
        © 2026 ReunionSpace | Owned by Aiman Amsyar
      </div>
    </div>
  );
}
