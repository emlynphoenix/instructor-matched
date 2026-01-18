
import React from 'react';
import { Enquiry, CreditPackage } from './types';
import { Clock, MapPin, ShieldCheck, Star } from 'lucide-react';

export const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: '1',
    learnerId: 'demo-learner-1',
    name: 'Sarah K.',
    email: 'sara***@example.com',
    phone: '07700 *** ***',
    location: 'NW1',
    town: 'Camden, London',
    transmission: 'Automatic',
    availability: 'Evenings and Weekends',
    details: 'Complete beginner, looking to start as soon as possible.',
    timestamp: new Date(),
    unlocked: false
  },
  {
    id: '2',
    learnerId: 'demo-learner-2',
    name: 'James W.',
    email: 'jam***@test.com',
    phone: '07800 *** ***',
    location: 'M15',
    town: 'Hulme, Manchester',
    transmission: 'Manual',
    availability: 'Weekday Mornings',
    details: 'Had 10 hours previously, looking for a new instructor.',
    timestamp: new Date(Date.now() - 86400000),
    unlocked: false
  },
  {
    id: '3',
    learnerId: 'demo-learner-3',
    name: 'Emma T.',
    email: 'emm***@mail.com',
    phone: '07900 *** ***',
    location: 'B5',
    town: 'Digbeth, Birmingham',
    transmission: 'Automatic',
    availability: 'Flexible',
    details: 'Needs to pass quickly for work.',
    timestamp: new Date(Date.now() - 172800000),
    unlocked: false
  }
];

export const CREDIT_PACKAGES: CreditPackage[] = [
  { id: 'p0', credits: 1, price: 4, description: 'Quick unlock for a single pupil' },
  { id: 'p1', credits: 5, price: 15, description: 'Unlock up to 5 pupils' },
  { id: 'p2', credits: 12, price: 30, description: 'Our most popular choice' },
  { id: 'p3', credits: 25, price: 50, description: 'Best value for growing businesses' }
];

export const REVIEWS = [
  {
    id: 'r1',
    name: 'Chloe Miller',
    role: 'Learner Driver',
    content: 'Found my instructor within 2 hours of posting my request. The process was so much easier than calling around local driving schools.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=chloe'
  },
  {
    id: 'r2',
    name: 'David Thompson',
    role: 'Instructor',
    content: 'Instructor Matched has completely changed how I find new students. I only pay for the leads I want, which has saved me a fortune in marketing.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: 'r3',
    name: 'Liam Foster',
    role: 'Learner Driver',
    content: 'Excellent service. I needed an automatic instructor urgently and found 3 available ones in my area immediately.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=liam'
  }
];

export const BENEFITS = [
  {
    icon: <Clock className="w-6 h-6 text-teal-600" />,
    title: 'Save Time',
    description: 'Compare multiple instructors in minutes without making dozens of calls.'
  },
  {
    icon: <MapPin className="w-6 h-6 text-teal-600" />,
    title: 'Local Instructors',
    description: 'Choose the best qualified instructors near your postcode.'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-teal-600" />,
    title: 'Trusted & Verified',
    description: 'All instructors on our platform are checked and fully qualified.'
  }
];
