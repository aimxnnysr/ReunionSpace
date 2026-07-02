export type ClassmateCategory = 'study' | 'work' | 'entrepreneurship';

export interface Classmate {
  id: string; // A001 - A015
  name: string;
  role: string; // High school role / archetype
  currentStatus: string; // What they are doing now
  location: string;
  email: string;
  category: ClassmateCategory;
  details: string; // university, company, or startup name
  bio: string; // nostalgic memory or fun quote
  hobbies: string[];
  avatarGradient: string; // CSS gradient classes
  avatarEmoji: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Urgent' | 'Event' | 'Academic' | 'General';
  author: string;
}

export interface Comment {
  id: string;
  classmateId: string;
  classmateName: string;
  classmateAvatarColor: string;
  content: string;
  date: string;
}

export interface Memory {
  id: string;
  classmateId: string;
  classmateName: string;
  avatarGradient: string;
  avatarEmoji: string;
  imageType: 'gradient' | 'url';
  imageValue: string; // Gradient style or absolute image URL
  caption: string;
  date: string;
  likes: number;
  comments: Comment[];
  likedBy: string[]; // List of Classmate IDs who liked this
}

export interface Shoutout {
  id: string;
  senderId: string;
  senderName: string;
  avatarGradient: string;
  avatarEmoji: string;
  content: string;
  date: string;
}
