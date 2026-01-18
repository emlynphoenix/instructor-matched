
import React, { useState } from 'react';
import { Enquiry, AppView, User } from '../types';

interface LearnerFormProps {
  onAddEnquiry: (enquiry: Enquiry) => void;
  onNavigate: (view: AppView) => void;
  currentUser: User | null;
}

const LearnerForm: React.FC<LearnerFormProps> = ({ onAddEnquiry, onNavigate, currentUser }) => {
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    location: '',
    town: '',
    transmission: 'Automatic' as 'Automatic' | 'Manual',
    availability: 'Flexible',
    details: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onNavigate(AppView.AUTH);
      return;
    }
    
    const newEnquiry: Enquiry = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      learnerId: currentUser.id,
      timestamp: new Date(),
      unlocked: false
    };
    onAddEnquiry(newEnquiry);
    alert('Request submitted! Instructors will contact you soon.');
    onNavigate(AppView.LEARNER_DASHBOARD);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Get Matched with Local Instructors</h2>
          <p className="text-slate-600 mt-2">Your lesson preferences help us find the perfect match.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="space-y-6">
            {!currentUser && (
               <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl text-amber-800 text-sm mb-4">
                Please <button type="button" onClick={() => onNavigate(AppView.AUTH)} className="underline font-bold">login or create an account</button> to post a lesson request.
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input
                required
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="07700 000000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Town / City / Village</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Camden, Manchester"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  value={formData.town}
                  onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Postcode Area</label>
                <input
                  required
                  type="text"
                  placeholder="e.g., NW1, M15"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value.toUpperCase() })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Transmission Type</label>
              <select
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none bg-white"
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value as 'Automatic' | 'Manual' })}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Availability</label>
              <input
                type="text"
                placeholder="e.g., Weekends, Evenings, etc."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Lesson Details (Optional)</label>
              <textarea
                rows={3}
                placeholder="Any specific requests or previous experience?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all outline-none resize-none"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              ></textarea>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate(AppView.LANDING)}
                className="flex-1 py-4 px-6 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-4 px-6 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all active:scale-[0.98]"
              >
                Send Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LearnerForm;
