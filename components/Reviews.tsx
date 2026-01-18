
import React from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  onAddReviewClick: () => void;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, onAddReviewClick }) => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">What Our Users Say</h2>
          <p className="text-slate-500 mt-4 max-w-2xl mx-auto mb-8">
            Join thousands of learners and instructors finding success on Instructor Matched.
          </p>
          <button 
            onClick={onAddReviewClick}
            className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-2xl border border-slate-200 text-[#1e3a5f] font-bold shadow-sm hover:shadow-md hover:border-[#2a9d8f] transition-all"
          >
            <MessageSquarePlus className="w-5 h-5 text-[#2a9d8f]" />
            Leave a Review
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                  />
                ))}
              </div>
              <p className="text-slate-600 italic mb-8 leading-relaxed">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full border-2 border-slate-50"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                  <p className="text-slate-400 text-xs font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
