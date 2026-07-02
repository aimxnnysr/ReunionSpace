import { useState } from 'react';
import { Classmate } from '../types';
import { Shield, Cpu, RefreshCw, Key, Server, ToggleLeft, ToggleRight, Sparkles, Check } from 'lucide-react';

interface SettingsViewProps {
  user: Classmate;
  onLogout: () => void;
}

export default function SettingsView({ user, onLogout }: SettingsViewProps) {
  const [useHologramEffects, setUseHologramEffects] = useState(true);
  const [ambientGlow, setAmbientGlow] = useState(true);
  const [lowDataMode, setLowDataMode] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(user.id);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleClearCache = () => {
    localStorage.clear();
    alert('Local Yearbooks Cache successfully purged. Logging out...');
    onLogout();
  };

  return (
    <div id="settings-view" className="space-y-8 animate-fadeIn max-w-3xl">
      <div className="border-b border-slate-800/40 pb-4">
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <Shield className="w-6 h-6 text-blue-400" />
          ReunionSpace Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage system preferences, clear local browser buffers, and configure interface parameters.
        </p>
      </div>

      {/* Account Info */}
      <div className="bg-slate-950/60 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Key className="w-3.5 h-3.5 text-blue-400" />
          Current Identity Authorization
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/30">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-linear-to-tr ${user.avatarGradient} flex items-center justify-center text-xl shrink-0`}>
              {user.avatarEmoji}
            </div>
            <div>
              <p className="text-xs font-bold text-white">{user.name}</p>
              <p className="text-[10px] text-slate-500 font-mono mt-0.5">Authorization Key: <span className="text-blue-400 font-bold">{user.id}</span></p>
            </div>
          </div>
          <button 
            onClick={handleCopyKey}
            className="text-[10px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg hover:bg-blue-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            {copiedKey ? <Check className="w-3 h-3 text-emerald-400" /> : <Sparkles className="w-3 h-3" />}
            {copiedKey ? 'Copied Access ID!' : 'Copy Access ID'}
          </button>
        </div>
      </div>

      {/* Interactive Options */}
      <div className="bg-slate-950/60 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-xl space-y-5">
        <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          Interface Render Tuning
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-900/20 transition-all border border-transparent hover:border-slate-800/30">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Interactive Glassmorphism Effects</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Applies premium frosted layout blurring on menus.</p>
            </div>
            <button onClick={() => setUseHologramEffects(!useHologramEffects)} className="cursor-pointer text-blue-400">
              {useHologramEffects ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-900/20 transition-all border border-transparent hover:border-slate-800/30">
            <div>
              <h4 className="text-xs font-bold text-slate-200">Ambient Background Glows</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Enables beautiful slow pulsing glowing radial backdrops.</p>
            </div>
            <button onClick={() => setAmbientGlow(!ambientGlow)} className="cursor-pointer text-blue-400">
              {ambientGlow ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-900/20 transition-all border border-transparent hover:border-slate-800/30">
            <div>
              <h4 className="text-xs font-bold text-slate-200">High Contrast Mode</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Lowers overlay levels for high visibility text reading.</p>
            </div>
            <button onClick={() => setLowDataMode(!lowDataMode)} className="cursor-pointer text-blue-400">
              {lowDataMode ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-600" />}
            </button>
          </div>
        </div>
      </div>

      {/* Diagnostics and Reset */}
      <div className="bg-slate-950/60 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-xl space-y-4">
        <h3 className="text-xs font-mono font-semibold text-red-400 uppercase tracking-widest flex items-center gap-2">
          <Server className="w-3.5 h-3.5 text-red-400" />
          Maintenance Operations
        </h3>
        
        <div className="p-4 rounded-xl bg-red-950/15 border border-red-900/30 space-y-3">
          <h4 className="text-xs font-bold text-red-200">Clear Yearbooks Offline Database Cache</h4>
          <p className="text-[10px] text-red-400/80 leading-relaxed">
            This will purge all custom edited details, timeline memories, liked history, and local message logs saved in your browser's LocalStorage, restoring the factory default Elysian K5 database. This operation is immediate and irreversible.
          </p>
          <button 
            onClick={handleClearCache}
            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-3.5 py-2 rounded-lg hover:bg-red-500/20 transition-all cursor-pointer font-bold"
          >
            <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            Purge Local Database & Logout
          </button>
        </div>
      </div>

      <div className="text-center font-mono text-[9px] text-slate-600 uppercase tracking-widest">
        REUNIONSPACE ENGINE // BUILD 4.8.2 // PLATFORM: SANDBOX CONTAINER
      </div>
    </div>
  );
}
