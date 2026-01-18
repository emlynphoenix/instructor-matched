
import React, { useState } from 'react';
import { Star, X, Shield } from 'lucide-react';
import { User } from '../types';

interface AddReviewModalProps {
  currentUser: User | null;
  onClose: () => void;
  onSubmit: (review: { rating: number; content: string; isAnonymous: boolean }) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ currentUser, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.length < 5) {
      alert('Please write a slightly longer review.');
      return;
    }
    onSubmit({ rating, content, isAnonymous });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-slate-100 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Leave a Review</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-3 text-center">Your Rating</label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-8 h-8 ${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Review Content</label>
            <textarea
              required
              rows={4}
              placeholder="What was your experience like with Instructor Matched?"
              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#2a9d8f] resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <Shield className={`w-5 h-5 ${isAnonymous ? 'text-[#2a9d8f]' : 'text-slate-400'}`} />
              <div>
                <p className="text-sm font-bold text-slate-700">Post Anonymously</p>
                <p className="text-[10px] text-slate-500 font-medium">Your identity will be hidden from the public</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative ${isAnonymous ? 'bg-[#2a9d8f]' : 'bg-slate-300'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isAnonymous ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-4 bg-[#2a9d8f] text-white font-bold rounded-xl hover:bg-[#21867a] shadow-lg shadow-teal-50 transition-all"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
