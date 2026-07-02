import { useState, FormEvent } from 'react';
import { Classmate, ClassmateCategory } from '../types';
import { Save, CheckCircle2 } from 'lucide-react';

interface MyProfileViewProps {
  user: Classmate;
  onUpdateProfile: (updatedUser: Classmate) => void;
}

const PROFILE_AVATAR_EMOJIS = ['🎓', '💻', '🏃‍♂️', '🎨', '🎭', '🩺', '🎧', '⚖️', '🌌', '🦋', '🌱', '🎬', '✍️', '🧮', '✨', '🚀', '🌟', '👾', '🍕', '☕'];

export default function MyProfileView({ user, onUpdateProfile }: MyProfileViewProps) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState(user.email);
  const [currentStatus, setCurrentStatus] = useState(user.currentStatus);
  const [details, setDetails] = useState(user.details);
  const [category, setCategory] = useState<ClassmateCategory>(user.category);
  const [bio, setBio] = useState(user.bio);
  const [hobbiesString, setHobbiesString] = useState(user.hobbies.join(', '));
  const [selectedEmoji, setSelectedEmoji] = useState(user.avatarEmoji);
  
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    const parsedHobbies = hobbiesString
      .split(',')
      .map(h => h.trim())
      .filter(h => h.length > 0);

    const updatedUser: Classmate = {
      ...user,
      name,
      role,
      location,
      email,
      currentStatus,
      details,
      category,
      bio,
      hobbies: parsedHobbies,
      avatarEmoji: selectedEmoji,
    };

    onUpdateProfile(updatedUser);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div id="my-profile-view" className="space-y-6 max-w-2xl mx-auto animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">Your Yearbook Profile Card</h2>
        <p className="text-xs text-gray-400">Calibrate your alumni credentials and live tracking parameters</p>
      </div>

      {saveSuccess && (
        <div id="save-success-banner" className="p-4 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>Profile cards updated and synced with Classmate Directory directory successful!</span>
        </div>
      )}

      {/* Main editor form */}
      <div className="bg-slate-950/60 border border-slate-800/50 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Avatar selector section */}
          <div>
            <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2.5 font-semibold">
              Choose Digital Identity Badge
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800/40">
              {/* Preview */}
              <div className={`w-14 h-14 rounded-full bg-linear-to-tr ${user.avatarGradient} flex items-center justify-center text-4xl shadow-md border border-slate-800/40 shrink-0`}>
                {selectedEmoji}
              </div>
              
              {/* Emoji grid */}
              <div className="flex-1">
                <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
                  {PROFILE_AVATAR_EMOJIS.map(em => (
                    <button
                      key={em}
                      type="button"
                      onClick={() => setSelectedEmoji(em)}
                      className={`w-8 h-8 rounded-lg text-lg flex items-center justify-center hover:bg-blue-500/10 transition-colors border cursor-pointer ${
                        selectedEmoji === em ? 'border-blue-500 bg-blue-500/10' : 'border-transparent'
                      }`}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text grid inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* High School Persona / Role */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                High School Persona / Role
              </label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Base Coordinates (Location) */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Current City, Country
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Life Vector Category */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Alumni Core Vector (Category)
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as ClassmateCategory)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="work">Work (Professional/Employment)</option>
                <option value="study">Study (Academic/Education)</option>
                <option value="entrepreneurship">Entrepreneurship (Startup/Founder)</option>
              </select>
            </div>

            {/* Specific Field or Place (Vercel, Oxford, etc) */}
            <div>
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Organization / Institution Name
              </label>
              <input
                type="text"
                value={details}
                onChange={e => setDetails(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. Vercel Dev Experience, Oxford PhD"
                required
              />
            </div>

            {/* Current Status Headline */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Current Status Title (Short Bio Headline)
              </label>
              <input
                type="text"
                value={currentStatus}
                onChange={e => setCurrentStatus(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. Senior Software Architect"
                required
              />
            </div>

            {/* Hobbies (Comma separated) */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Hobbies & Interests (Comma Separated)
              </label>
              <input
                type="text"
                value={hobbiesString}
                onChange={e => setHobbiesString(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="e.g. Chess, Cycling, Synth DIY"
                required
              />
            </div>

            {/* Throwback yearbook nostalgic bio */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-semibold">
                Yearbook Nostalgic Bio (Throwbacks & Memories)
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                className="w-full bg-slate-950/60 border border-slate-800/50 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all"
                placeholder="Write a warm, nostalgic quote about high school days..."
                required
              />
            </div>

          </div>

          {/* Action trigger */}
          <div className="pt-4 border-t border-slate-800/40 flex justify-end">
            <button
              id="btn-save-profile"
              type="submit"
              className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white font-display text-xs font-semibold rounded-xl transition-all shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Synchronize Changes</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
