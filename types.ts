export interface User {
  id: string;
  name: string;
  avatar: string;
  isOpenForWork: boolean;
  rating?: number;
}

export interface Mentor {
  id: string;
  name: string;
  avatar: string;
  tags: string[];
  bio: string;
  rating: number;
  answerCount: number;
}

export type MentorRequestType = 'portfolio_review' | 'quote_consulting';

export interface MentorRequest {
  id: string;
  student: User;
  type: MentorRequestType;
  content: string;
  time: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: User;
  likes: number;
  tags: string[];
  aspectRatio: 'aspect-[3/4]' | 'aspect-[1/1]' | 'aspect-[4/3]' | 'aspect-[9/16]'; // Helper for masonry layout simulation
}

export interface Job {
  id: string;
  title: string;
  description: string;
  client: User;
  budget: string;
  deadline: string;
  tags: string[];
  matchRate: number;
  category: string;
  isUrgent?: boolean;
  postedAt: string;
}

export interface Talent {
  id: string;
  user: User;
  title: string;
  bio: string;
  skills: string[];
  rate: string;
  category: string;
  completedCases: number;
  responseRate: number;
}

export interface Product {
  id: string;
  title: string;
  coverUrl: string;
  price: number;
  originalPrice?: number;
  sales: number;
  rating: number;
  author: User;
  category: string;
  isBestSeller?: boolean;
}

export type ChatStatus = 'active' | 'pending_review' | 'completed' | 'none';

export interface ChatSession {
  id: string;
  partner: User;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  status: ChatStatus;
  jobTitle?: string;
  jobProgress?: number; // 0-100
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

export interface Notification {
  id: string;
  type: 'system' | 'like' | 'follow' | 'job' | 'payment';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

export interface Review {
  id: string;
  reviewer: User;
  rating: number;
  content: string;
  date: string;
  projectName?: string;
}

export enum TabName {
  EXPLORE = 'Explore',
  JOBS = 'Jobs',
  MARKET = 'Market',
  INBOX = 'Inbox',
  PROFILE = 'Profile'
}

export enum ExploreCategory {
  FOLLOWING = '關注',
  TALENTS = '找人才',
  JOBS = '找工作',
  ROOKIE = '新手村'
}