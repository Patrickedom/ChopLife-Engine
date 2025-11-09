export interface Source {
    uri: string;
    title?: string;
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  sources?: Source[];
  quickActions?: string[];
}

export interface UserProfile {
  name: string;
  location: string;
  skills: string;
  goals: string;
}