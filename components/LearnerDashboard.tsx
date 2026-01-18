
import React from 'react';
import { Enquiry, AppView, User } from '../types';
import { PlusCircle, Search, MessageSquare, Clock, MapPin, MessageSquarePlus } from 'lucide-react';

interface LearnerDashboardProps {
  user: User;
  enquiries: Enquiry[];
  onNavigate: (view: AppView) => void;
  onAddReviewClick: () => void;
}

const LearnerDashboard: React.FC<LearnerDashboardProps> = ({ user, enquiries, onNavigate, onAddReviewClick }) => {
  const myEnquiries = enquiries.filter(e => e.learnerId === user.id);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
            <p className="text-slate-500">Track your driving lesson requests and matches</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
              onClick={onAddReviewClick}
              className="flex items-center gap-2 bg-white text-slate-600 px-6 py-3 rounded-2xl border border-slate-200 font-bold hover:shadow-md transition-all"
            >
              <MessageSquarePlus className="w-5 h-5 text-[#2a9d8f]" /> Leave a Review
            </button>
            <button 
              onClick={() => onNavigate(AppView.LEARNER_FORM)}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all"
            >
              <PlusCircle className="w-5 h-5" /> New Request
            </button>
          </div>
        </div>

        <div className="grid gap-8">
          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" /> My Active Requests
            </h2>
            
            <div className="grid gap-4">
              {myEnquiries.length > 0 ? (
                myEnquiries.map(enquiry => (
                  <div key={enquiry.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full">
                          {enquiry.transmission}
                        </span>
                        <span className="text-xs text-slate-400">
                          Posted on {new Date(enquiry.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" /> {enquiry.town || enquiry.location}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{enquiry.details || 'No additional details provided.'}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="flex-1 md:flex-none text-center px-4 py-2 bg-slate-50 rounded-xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Instructors</p>
                        <p className="text-lg font-bold text-slate-900">{enquiry.unlocked ? '1' : '0'}</p>
                      </div>
                      <button className="flex-1 md:flex-none bg-white border border-slate-200 px-6 py-2 rounded-xl text-sm font-bold text-slate-600 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" /> View Responses
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">No requests yet</h3>
                  <p className="text-slate-500 text-sm mb-6">Tell instructors what you're looking for to get started.</p>
                  <button 
                    onClick={() => onNavigate(AppView.LEARNER_FORM)}
                    className="text-teal-600 font-bold hover:underline"
                  >
                    Post your first request
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LearnerDashboard;
