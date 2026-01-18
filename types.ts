
export type UserRole = 'LEARNER' | 'INSTRUCTOR';

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits?: number; // Only for instructors
  bio?: string;
  company?: string; // New field for instructors
  qualifications?: string;
  profilePicture?: string;
  socialLinks?: SocialLinks;
  postcode?: string; // New field for instructors
  isVerified?: boolean; // Verification status
  adiNumber?: string; // ADI/PDI Number
}

export interface Enquiry {
  id: string;
  learnerId: string; // ID of the user who created it
  name: string;
  email: string;
  phone: string;
  location: string; // Postcode area
  town: string; // Specific town/city/village
  transmission: 'Manual' | 'Automatic';
  availability: string;
  details: string;
  timestamp: Date;
  unlocked: boolean;
  unlockedBy?: string; // ID of the instructor who unlocked it
  isArchived?: boolean; // Support for archiving students
  isIgnored?: boolean; // Support for hiding available leads
}

export enum AppView {
  LANDING = 'landing',
  LEARNER_FORM = 'learner_form',
  INSTRUCTOR_DASHBOARD = 'instructor_dashboard',
  LEARNER_DASHBOARD = 'learner_dashboard',
  CREDIT_STORE = 'credit_store',
  AUTH = 'auth'
}

export interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  description: string;
}
