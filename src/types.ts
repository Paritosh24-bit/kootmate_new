export type Page = 'landing' | 'login' | 'signup' | 'dashboard';

export type BoardType = 'cbse' | 'ssc';

export type CategoryType = 'mind_maps' | 'infographics' | 'audio' | 'games';

export interface Subject {
  id: string;
  name: string;
  board: BoardType;
  topicsCount: number;
}

export interface User {
  name: string;
  email: string;
  phone?: string;
  couponCode?: string;
  role?: string;
  schoolName?: string;
  dob?: string;
  isLoggedIn: boolean;
}

export interface ContentCategory {
  id: CategoryType;
  title: string;
  description: string;
  color: string;
  iconName: string;
}

export interface ContentItem {
  id: string | number;
  board: 'CBSE' | 'SSC' | string;
  subject: string;
  chapter: string;
  title: string;
  description?: string;
  content_type: 'mindmap' | 'pdf' | 'audio' | 'game' | string;
  resource_url: string;
  thumbnail_url?: string;
  created_at?: string;
}

