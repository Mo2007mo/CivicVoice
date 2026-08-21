export interface Grievance {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: 'pothole' | 'broken_light' | 'garbage' | 'water_leak' | 'downed_tree' | 'other';
  status: 'In Progress' | 'Under Review' | 'Resolved' | 'Dispatched';
  department: string;
  location: string;
  landmark: string;
  lat: number;
  lng: number;
  reportedDate: string;
  verifiedReal: boolean;
  imageUrl?: string;
  upvotes: number;
  hasUpvoted?: boolean;
}

export interface Initiative {
  id: string;
  title: string;
  description: string;
  category: string;
  votesCount: number;
  targetVotes: number;
  daysLeft: number;
  author: string;
  hasVoted?: boolean;
  status: 'Active Voting' | 'Under Review' | 'Approved' | 'Implemented';
}

export interface UserProfile {
  name: string;
  ward: string;
  city: string;
  email: string;
  phone: string;
  aadhaarNumber: string;
  isVerified: boolean;
  avatarUrl: string;
  notificationSettings: {
    sms: boolean;
    email: boolean;
    push: boolean;
    emergencyAlerts: boolean;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'proposals' | 'voting' | 'townhall' | 'privacy' | 'reporting';
}
