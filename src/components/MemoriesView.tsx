import { useState, FormEvent } from 'react';
import { Memory, Classmate } from '../types';
import { Heart, MessageCircle, Send, Sparkles, Plus, Calendar } from 'lucide-react';

interface MemoriesViewProps {
  memories: Memory[];
  currentUser: Classmate;
  onAddMemory: (caption: string, gradientValue: string) => void;
  onToggleLike: (memoryId: string) => void;
  onAddComment: (memoryId: string, text: string) => void;
}

const MEMORY_GRADIENT_PRESETS = [
  { name: 'Cosmic Slate', value: 'linear-gradient(135deg, #1e1b4b 0%, #311042 100%)' },
  { name: 'Cyber Dawn', value: 'linear-gradient(135deg, #0f172a 0%, #0369a1 100%)' },
  { name: 'Neon Forest', value: 'linear-gradient(135deg, #064e3b 0%, #115e59 100%)' },
  { name: 'Sunset Aura', value: 'linear-gradient(135deg, #701a75 0%, #be185d 100%)' },
  { name: 'Tokyo Glow', value: 'linear-gradient(135deg, #312e81 0%, #4338ca 100%)' },
];

export default function MemoriesView({
  memories,
  currentUser,
  onAddMemory,
  onToggleLike,
  onAddComment,
}: MemoriesViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(MEMORY_GRADIENT_PRESETS[0].value);
  const [commentInputs, setCommentInputs] = useState<{ [memoryId: string]: string }>({});

  const handlePostMemory = (e: FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    onAddMemory(newCaption, selectedGradient);
    setNewCaption('');
    setShowAddForm(false);
  };

  const handleCommentSubmit = (memoryId: string, e: FormEvent) => {
    e.preventDefault();
    const text = commentInputs[memoryId];
    if (!text || !text.trim()) return;

    onAddComment(memoryId, text);
    setCommentInputs({ ...commentInputs, [memoryId]: '' });
  };

  return (
    <div id="memories-view" className="space-y-8 animate-fadeIn">
      {/* Header section with Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">Timeline Memories</h2>
          <p className="text-xs text-gray-400">Capture, like, and coordinate digital yearbook moments</p>
        </div>

        <button
          id="btn-trigger-add-memory"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2.5 bg-linear-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-display text-xs font-semibold rounded-xl transition-all shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Broadcast New Memory</span>
        </button>
      </div>

      {/* Expandable Memory Broadcast Form */}
      {showAddForm && (
        <div id="add-memory-form" className="bg-slate-950/60 border border-slate-800/50 p-6 rounded-3xl max-w-2xl mx-auto space-y-5 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.1)]">
          <div className="flex items-center gap-2 border-b border-slate-800/40 pb-3">
            <Sparkles className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="font-bold text-sm text-white">Formulate Your School Memory</h3>
          </div>

          <form onSubmit={handlePostMemory} className="space-y-4">
            {/* Caption Input */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                Memory Description & Nostalgia
              </label>
              <textarea
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                placeholder="What school moments or throwback thoughts are you feeling nostalgic about? (e.g. TBT to Chemistry Lab mishaps, senior trips...)"
                rows={3}
                className="w-full bg-slate-900/40 border border-slate-800/50 rounded-xl p-3.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            {/* Gradient Selector (Nostalgia visualizer) */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2">
                Select Memory Canvas Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {MEMORY_GRADIENT_PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setSelectedGradient(preset.value)}
                    className={`h-14 rounded-xl relative overflow-hidden transition-all border ${
                      selectedGradient === preset.value
                        ? 'border-white scale-102 ring-2 ring-blue-500/50 shadow-md'
                        : 'border-slate-800/50 hover:border-slate-700'
                    }`}
                    style={{ background: preset.value }}
                  >
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[10px] font-sans font-semibold text-white tracking-tight">{preset.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:border-slate-600 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-linear-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-display text-xs font-semibold rounded-xl transition-all shadow-[0_4px_12px_rgba(59,130,246,0.3)] cursor-pointer"
              >
                Publish Broadcast
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Memories Timeline Row */}
      <div id="memories-timeline" className="max-w-2xl mx-auto space-y-8 relative">
        {/* Timeline center rail */}
        <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-linear-to-b from-blue-500/20 via-emerald-500/20 to-transparent pointer-events-none hidden sm:block"></div>

        {memories.map((mem) => {
          const hasLiked = mem.likedBy.includes(currentUser.id);
          return (
            <div key={mem.id} id={`memory-card-${mem.id}`} className="relative flex flex-col sm:flex-row gap-6 animate-fadeIn">
              
              {/* Timeline bubble bullet */}
              <div className="absolute left-6 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500/50 glow-blue shrink-0 z-10 hidden sm:block mt-1.5"></div>

              {/* Memory content Box */}
              <div className="flex-1 bg-slate-950/60 border border-slate-800/50 backdrop-blur-xl p-5 md:p-6 rounded-3xl space-y-4">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-linear-to-tr ${mem.avatarGradient} flex items-center justify-center text-xl shadow border border-slate-800/40`}>
                      {mem.avatarEmoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white leading-tight">{mem.classmateName}</h4>
                      <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5 mt-0.5 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {mem.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Canvas visual image (using futuristic gradient presets) */}
                <div
                  className="w-full h-44 rounded-xl border border-slate-800/50 relative overflow-hidden flex items-center justify-center p-6 text-center shadow-inner group"
                  style={{ background: mem.imageValue }}
                >
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-black/35 transition-all"></div>
                  <div className="z-10 space-y-2">
                    <span className="text-4xl block animate-pulse">{mem.avatarEmoji}</span>
                    <span className="font-extrabold text-base text-white tracking-wide block">{mem.classmateName}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-gray-300 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded-full border border-slate-800/40">
                      Alumni Shot
                    </span>
                  </div>
                </div>

                {/* Caption text */}
                <p className="text-xs text-slate-200 italic leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/40">
                  "{mem.caption}"
                </p>

                {/* Like & Comment Buttons */}
                <div className="flex items-center gap-5 pt-1.5 border-t border-slate-800/40">
                  <button
                    id={`btn-like-${mem.id}`}
                    onClick={() => onToggleLike(mem.id)}
                    className={`flex items-center gap-2.5 text-xs font-mono transition-all cursor-pointer ${
                      hasLiked ? 'text-rose-400 font-semibold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 transition-transform ${hasLiked ? 'fill-rose-400 scale-110 text-rose-400' : ''}`} />
                    <span>{mem.likes} Likes</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{mem.comments.length} Comments</span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-3.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/40">
                  <div className="space-y-3">
                    {mem.comments.map((comment) => (
                      <div key={comment.id} className="text-xs flex gap-3 pb-3 border-b border-slate-800/40 last:border-b-0 last:pb-0">
                        <div className={`w-7.5 h-7.5 rounded-full bg-linear-to-tr ${comment.classmateAvatarColor} flex items-center justify-center text-sm shrink-0 font-bold border border-slate-800/40`}>
                          💬
                        </div>
                        <div className="space-y-0.5 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-200">{comment.classmateName}</span>
                            <span className="text-[9px] font-mono text-slate-500">{comment.date}</span>
                          </div>
                          <p className="text-slate-300 text-xs leading-relaxed">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comment Input */}
                  <form onSubmit={(e) => handleCommentSubmit(mem.id, e)} className="flex gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Contribute throwing back comments..."
                      value={commentInputs[mem.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [mem.id]: e.target.value })
                      }
                      className="flex-1 bg-slate-950/60 border border-slate-800/50 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="p-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all cursor-pointer flex items-center justify-center"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
