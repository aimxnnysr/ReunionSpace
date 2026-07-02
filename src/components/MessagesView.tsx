import { useState, FormEvent, useRef, useEffect } from 'react';
import { Shoutout, Classmate } from '../types';
import { Send, MessageSquare, Flame, Clock } from 'lucide-react';

interface MessagesViewProps {
  shoutouts: Shoutout[];
  currentUser: Classmate;
  onPostShoutout: (text: string) => void;
}

export default function MessagesView({ shoutouts, currentUser, onPostShoutout }: MessagesViewProps) {
  const [newShoutoutText, setNewShoutoutText] = useState('');
  const feedEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newShoutoutText.trim()) return;

    onPostShoutout(newShoutoutText.trim());
    setNewShoutoutText('');
  };

  // Scroll to bottom of message board on load / updates
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [shoutouts]);

  // Format timestamp nicely
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div id="messages-view" className="space-y-6 flex flex-col h-[calc(100vh-170px)] md:h-[calc(100vh-120px)] animate-fadeIn">
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between pb-4 border-b border-slate-800/40">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Class Message Board</h2>
          <p className="text-xs text-slate-400">Broadcast updates, jokes, and check-ins in the alumni chat lounge</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full text-[10px] font-mono font-semibold">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
          <span>LIVE FEEDS</span>
        </div>
      </div>

      {/* Message Chat Feed Scroller */}
      <div id="chat-scroller" className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-62.5">
        {shoutouts.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">No messages yet. Be the first to shoutout!</p>
          </div>
        ) : (
          shoutouts.map((sh) => {
            const isMe = sh.senderId === currentUser.id;
            return (
              <div
                key={sh.id}
                className={`flex gap-3.5 p-4 rounded-2xl border transition-all max-w-[85%] ${
                  isMe
                    ? 'bg-blue-500/10 border-blue-500/20 ml-auto'
                    : 'bg-slate-900/60 border border-slate-800/40'
                }`}
              >
                {/* Sender Avatar */}
                <div className={`w-9.5 h-9.5 rounded-full bg-linear-to-tr ${sh.avatarGradient} flex items-center justify-center text-lg shrink-0 border border-slate-800/40`}>
                  {sh.avatarEmoji}
                </div>

                {/* Message Body */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-xs text-white leading-tight">
                      {sh.senderName}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-950/80 px-1.5 py-0.5 rounded border border-slate-800/40 font-semibold">
                      {sh.senderId}
                    </span>
                    {isMe && (
                      <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                        (You)
                      </span>
                    )}
                  </div>
                  <p className="text-slate-200 text-xs leading-relaxed wrap-break-words">{sh.content}</p>
                  <div className="text-[9px] font-mono text-slate-500 flex items-center gap-1 mt-1 font-medium">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(sh.date)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={feedEndRef} />
      </div>

      {/* Shoutout input form bottom bar */}
      <form onSubmit={handleSubmit} className="shrink-0 pt-4 border-t border-slate-800/40 flex gap-3">
        <div className="relative flex-1">
          <input
            id="shoutout-input"
            type="text"
            maxLength={350}
            placeholder={`Say something nostalgic or update the board, ${currentUser.name.split(' ')[0]}...`}
            value={newShoutoutText}
            onChange={(e) => setNewShoutoutText(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800/50 rounded-xl py-3 pl-4 pr-12 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
            required
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-gray-500">
            {newShoutoutText.length}/350
          </div>
        </div>

        <button
          id="shoutout-send-btn"
          type="submit"
          className="bg-linear-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white p-3 rounded-xl transition-all shadow-[0_4px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer flex items-center justify-center shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
