import { Classmate, Announcement, Memory, Shoutout } from './types';

export const PREDEFINED_CLASSMATES: Classmate[] = [
  // --- MALE CLASSMATES ---
  {
    id: 'A000',
    name: 'Nitis',
    role: 'Class President',
    currentStatus: 'Corporate Strategy Consultant',
    location: 'Kuala Lumpur, Malaysia',
    email: 'nitis@reunionspace.com',
    category: 'work',
    details: 'McKinsey & Company',
    bio: 'It was an absolute honor serving as the Class President for Elysian K5! Let\'s keep the spirit of 2020–2024 alive and build a grand legacy together.',
    hobbies: ['Leadership Consulting', 'Golfing', 'Public Speaking'],
    avatarGradient: 'from-blue-600 to-cyan-500',
    avatarEmoji: '🦁'
  },
  {
    id: 'A001',
    name: 'Airell Ikhwan',
    role: 'Tech & AI Specialist',
    currentStatus: 'Lead AI Engineer',
    location: 'Singapore',
    email: 'airell.ikhwan@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Synthetix AI Solutions',
    bio: 'From playing hidden LAN games under our desks to writing neural networks. K5 was the compile step of my life!',
    hobbies: ['Cybersecurity', 'Anime', 'Mechanical Keyboards'],
    avatarGradient: 'from-indigo-600 to-purple-500',
    avatarEmoji: '💻'
  },
  {
    id: 'A002',
    name: 'Aiman Amsyar',
    role: 'Football Captain',
    currentStatus: 'Sports Coach',
    location: 'UKM, Malaysia',
    email: 'huliars07@gmail.com',
    category: 'work',
    details: 'Football Academy UKM',
    bio: 'Winning sports meets for Elysian K5 was the absolute peak. Now helping athletes reach their prime. Stay active and stay hungry!',
    hobbies: ['Football', 'Weightlifting'],
    avatarGradient: 'from-amber-500 to-orange-600',
    avatarEmoji: '🏀'
  },
  {
    id: 'A004',
    name: 'Aniq Haziq',
    role: 'Art Director',
    currentStatus: 'Creative Studio Founder',
    location: 'Tokyo, Japan',
    email: 'aniq.haziq@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Monolith Visual Agency',
    bio: 'Scribbling on Elysian\'s classroom whiteboards was just the beta test. Today, Tokyo is my canvas. Welcome to our digital gallery!',
    hobbies: ['Digital Art', 'Street Photography', 'Indie Cinema'],
    avatarGradient: 'from-pink-500 to-rose-600',
    avatarEmoji: '🎨'
  },
  {
    id: 'A005',
    name: 'Amar Amali',
    role: 'Class Humorist',
    currentStatus: 'Stand-up Comedian & Producer',
    location: 'Kuala Lumpur, Malaysia',
    email: 'amar.amali@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Laugh Box Media',
    bio: 'I only cracked jokes to distract our teachers from pop quizzes. Glad to see you all succeeded while I turned sarcasm into a registered business!',
    hobbies: ['Stand-up Comedy', 'Retro Consoles', 'Podcasting'],
    avatarGradient: 'from-yellow-400 to-amber-600',
    avatarEmoji: '🃏'
  },
  {
    id: 'A006',
    name: 'Chuah Zhe Ern',
    role: 'Academic Whiz',
    currentStatus: 'Biomedical Researcher',
    location: 'London, UK',
    email: 'chuah.zheern@reunionspace.com',
    category: 'study',
    details: 'Imperial College London',
    bio: 'Spent high school studying, and honestly, nothing has changed! Working on advanced therapeutics. Let\'s decode the formula of life.',
    hobbies: ['Violin', 'Chess', 'Hard Sci-Fi Novels'],
    avatarGradient: 'from-emerald-400 to-teal-600',
    avatarEmoji: '🔬'
  },
  {
    id: 'A007',
    name: 'Reez Qusyairi',
    role: 'Music Producer & DJ',
    currentStatus: 'Audio Engineer',
    location: 'Berlin, Germany',
    email: 'reez.qusyairi@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Elysian Sound Labs',
    bio: 'Creating loops and analog textures since high school. If you need a premium soundtrack for our Elysian reunion, ping my timeline!',
    hobbies: ['Synth DIY', 'Record Collecting', 'Techno Culture'],
    avatarGradient: 'from-purple-500 to-fuchsia-600',
    avatarEmoji: '🎧'
  },
  {
    id: 'A008',
    name: 'Azlan Marzuki',
    role: 'Debate Champion',
    currentStatus: 'Corporate Litigation Lawyer',
    location: 'New York, NY',
    email: 'azlan.marzuki@reunionspace.com',
    category: 'work',
    details: 'White & Case LLP',
    bio: 'K5 debates taught me to speak quickly and think faster. Still arguing for a living, but now wearing corporate suits in NYC.',
    hobbies: ['Constitutional History', 'Espresso Brewing', 'Urban Architecture'],
    avatarGradient: 'from-slate-600 to-slate-800',
    avatarEmoji: '⚖️'
  },
  {
    id: 'A009',
    name: 'Aqiel Hilmi',
    role: 'Quiet Genius',
    currentStatus: 'Quantum Computing Researcher',
    location: 'Zurich, Switzerland',
    email: 'aqiel.hilmi@reunionspace.com',
    category: 'study',
    details: 'ETH Zurich Postdoc',
    bio: 'I might have sat quietly in the back row, but I was simulating the cosmos. Zurich is crisp, quiet, and absolutely beautiful for physics.',
    hobbies: ['Astrophotography', 'Alpine Hiking', 'Model Rockets'],
    avatarGradient: 'from-cyan-500 to-blue-700',
    avatarEmoji: '🌌'
  },
  {
    id: 'A010',
    name: 'Faessyafiq Adhry',
    role: 'Venture Builder',
    currentStatus: 'Managing Venture Partner',
    location: 'Dubai, UAE',
    email: 'faessyafiq.adhry@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Apex Frontier Capital',
    bio: 'Fusing capital and deep innovation. Let\'s co-invest in the incredible talent of our Elysian K5 alumni network!',
    hobbies: ['Deep-sea Diving', 'Yacht Racing', 'Global Networking'],
    avatarGradient: 'from-indigo-400 to-blue-600',
    avatarEmoji: '👔'
  },

  // --- FEMALE CLASSMATES ---
  {
    id: 'A011',
    name: 'Nurul Iman',
    role: 'Environmentalist',
    currentStatus: 'Climate Sustainability Consultant',
    location: 'Kuala Lumpur, Malaysia',
    email: 'nurul.iman@reunionspace.com',
    category: 'work',
    details: 'EcoHorizon Consultancy',
    bio: 'Remember when our compost project flooded the school foyer? It was worth it—now I design large-scale net-zero plans worldwide!',
    hobbies: ['Organic Gardening', 'Mountaineering', 'Ceramic Pottery'],
    avatarGradient: 'from-green-400 to-emerald-600',
    avatarEmoji: '🌱'
  },
  {
    id: 'A012',
    name: 'Irdina Batrisya',
    role: 'Aesthetic Architect',
    currentStatus: 'Fashion Designer & Stylist',
    location: 'Paris, France',
    email: 'irdina.batrisya@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Batrisya Couture Studio',
    bio: 'Drafting modern designs inspired by Elysian K5 nostalgic gradients. Paris is magical, but our high school hallway gossip was better!',
    hobbies: ['Textile Design', 'Fine Arts', 'Historical Costumes'],
    avatarGradient: 'from-rose-400 to-pink-500',
    avatarEmoji: '✨'
  },
  {
    id: 'A013',
    name: 'Balqis',
    role: 'Literary Advocate',
    currentStatus: 'Senior Editorial Coordinator',
    location: 'London, UK',
    email: 'balqis@reunionspace.com',
    category: 'work',
    details: 'Penguin Books UK',
    bio: 'Our high school newsletters were my earliest editorial challenges. Now editing award-winning novels. Keep writing your chapters, K5!',
    hobbies: ['Creative Prose', 'Vintage Book Restoration', 'Herbal Tea Blends'],
    avatarGradient: 'from-amber-400 to-yellow-500',
    avatarEmoji: '📚'
  },
  {
    id: 'A014',
    name: 'Ariana Oninyechukwu',
    role: 'Drama & Arts Lead',
    currentStatus: 'Independent Film Director',
    location: 'Los Angeles, CA',
    email: 'ariana.oninye@reunionspace.com',
    category: 'work',
    details: 'A24 Labs & Studios',
    bio: 'Elysian K5\'s high school banter was better written than any Hollywood screenplay. Directing features now, with characters heavily inspired by you guys!',
    hobbies: ['Method Acting', 'French New Wave', 'Improvisational Theater'],
    avatarGradient: 'from-violet-500 to-fuchsia-600',
    avatarEmoji: '🎭'
  },
  {
    id: 'A015',
    name: 'Aleesa Sofea',
    role: 'Data Scientist',
    currentStatus: 'AI Data Research Scientist',
    location: 'Seattle, WA',
    email: 'aleesa.sofea@reunionspace.com',
    category: 'study',
    details: 'Microsoft Research Labs',
    bio: 'Calculating high-dimensional embeddings of K5 memories. Statistically, we are the most legendary batch of 2020–2024!',
    hobbies: ['Data Visualizations', 'Analytical Board Games', 'Matcha Latte Art'],
    avatarGradient: 'from-teal-400 to-cyan-500',
    avatarEmoji: '📊'
  },
  {
    id: 'A016',
    name: 'Dalili Syahmina',
    role: 'Medical Pioneer',
    currentStatus: 'Cardiology Medical Resident',
    location: 'Boston, MA',
    email: 'dalili.syahmina@reunionspace.com',
    category: 'study',
    details: 'Harvard Medical School',
    bio: 'Studying hearts to keep everyone in Elysian healthy. Remember our deep biology talks in K5? Stay happy and heartbeat strong!',
    hobbies: ['Marathon Running', 'Classical Violin', 'Healthy Baking'],
    avatarGradient: 'from-rose-500 to-red-600',
    avatarEmoji: '❤️'
  },
  {
    id: 'A017',
    name: 'Aliah Safiyyah',
    role: 'Strategic Investor',
    currentStatus: 'Venture Capital Associate',
    location: 'Singapore',
    email: 'aliah.safiyyah@reunionspace.com',
    category: 'entrepreneurship',
    details: 'Elysian Capital Alliance',
    bio: 'Backing brilliant innovators globally. High school taught me that deep trust is the absolute best collateral. Let\'s co-fund the future!',
    hobbies: ['Tech Podcasts', 'Pilates', 'Gourmet Cooking'],
    avatarGradient: 'from-sky-400 to-blue-500',
    avatarEmoji: '💎'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '📢 K5 Class Buzz!',
    content: 'Eh dengar cerita K5 tengah ada aktiviti menarik! Nitis akan buat briefing Jumaat depan di private channel. Kalau rasa nak terlibat, boleh terus join dan update dengan kawan-kawan. Klik "Browse Memories" atau tengok profil siapa yang active 👀',
    date: '2026-07-02',
    category: 'Event',
    author: 'Aqiel Hilmi (Class President)'
  },
  {
    id: 'ann-2',
    title: '📍Profile Information Update Required',
    content: 'Untuk pastikan semua data dalam sistem K5 sentiasa tepat, sila semak semula maklumat profil anda seperti status semasa, lokasi terkini, dan bidang (Belajar, Bekerja atau Bisnes). Ini penting untuk kemudahan update class directory kita.',
    date: '2026-07-02',
    category: 'Urgent',
    author: 'Nurul Iman (Vice President)'
  },
  {
    id: 'ann-3',
    title: '📚 Class Archive Available',
    content: 'Arkib digital K5 kini dah boleh diakses! Anda boleh semak semula senarai rakan sekelas, guru, dan juga rekod perjalanan kelas kita sepanjang tahun. Jom sama-sama imbas kembali kenangan lama dalam satu tempat.',
    date: '2026-07-02',
    category: 'General',
    author: 'Amar Amali (Editorial Head)'
  }
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: 'mem-1',
    classmateId: 'A002',
    classmateName: 'Aiman Amsyar',
    avatarGradient: 'black-500',
    avatarEmoji: '',
    imageType: 'gradient',
    imageValue: 'black-500',
    caption: 'Baju masing-masing memang dah tak boleh diselamatkan — ada yang jadi abstrak, ada yang jadi macam peta dunia tak rasmi.',
    date: '2026-07-2',
    likes: 0,
    comments: [
      {
        id: 'c-1',
        classmateId: 'A007',
        classmateName: 'Reez Qusyairi',
        classmateAvatarColor: 'from-purple-500 to-fuchsia-600',
        content: 'IYOOOO!',
        date: '2026-07-02'
      },
    ],
    likedBy: []
  },
];

export const INITIAL_SHOUTOUTS: Shoutout[] = [
  {
    id: 'sh-1',
    senderId: 'A005',
    senderName: 'Amar Amali',
    avatarGradient: 'from-yellow-400 to-amber-600',
    avatarEmoji: '🃏',
    content: 'Okay, I officially confess to the great hallway balloon prank. I was trying to make neon-green glowing bubbles to surprise everyone, but it triggered the fire sprinkler. Worth it!',
    date: '2026-07-01T08:02:00Z'
  },
  {
    id: 'sh-2',
    senderId: 'A001',
    senderName: 'Airell Ikhwan',
    avatarGradient: 'from-indigo-600 to-purple-500',
    avatarEmoji: '💻',
    content: '@Amar Amali We all knew it was you! But honestly, watching you slide down the hallway trying to mop it up was the best part. 😂',
    date: '2026-07-01T08:15:00Z'
  },
  {
    id: 'sh-3',
    senderId: 'A017',
    senderName: 'Aliah Safiyyah',
    avatarGradient: 'from-sky-400 to-blue-500',
    avatarEmoji: '💎',
    content: 'Welcome everyone to Elysian K5 space! I am hosting a dinner in Singapore next month. Anyone passing through, let\'s catch up!',
    date: '2026-07-01T08:20:00Z'
  }
];
