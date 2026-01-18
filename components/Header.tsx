
import React from 'react';
import { User as UserIcon, LogOut, LayoutDashboard } from 'lucide-react';
import { AppView, User } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  credits: number;
  currentUser: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, credits, currentUser, onLogout }) => {
  const handleHowItWorksClick = () => {
    if (currentView !== AppView.LANDING) {
      onNavigate(AppView.LANDING);
      setTimeout(() => {
        const element = document.getElementById('how-it-works');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('how-it-works');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate(AppView.LANDING)}
          >
            {/* Highly accurate Logo SVG based on provided image */}
            <div className="relative flex items-center justify-center w-10 h-10">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                  {/* Outer Pin Shape (Navy) */}
                  <path d="M50 5C30.67 5 15 20.67 15 40C15 66.25 50 95 50 95C50 95 85 66.25 85 40C85 20.67 69.33 5 50 5Z" fill="#1e3a5f"/>
                  {/* Inner Hole / Road Shape (Teal) */}
                  <path d="M50 18C38.4 18 29 27.4 29 39C29 54.75 50 72 50 72C50 72 71 54.75 71 39C71 27.4 61.6 18 50 18Z" fill="#2a9d8f"/>
                  {/* Road Center Line (White Dashed) */}
                  <path d="M50 30V40" stroke="white" strokeWidth="4" strokeLinecap="round" />
                  <path d="M50 50V60" stroke="white" strokeWidth="4" strokeLinecap="round" />
               </svg>
            </div>
            <div className="flex flex-col leading-[0.9]">
              <span className="text-xl font-black text-[#1e3a5f] tracking-tight">Instructor</span>
              <span className="text-xl font-bold text-[#2a9d8f] tracking-tight">Matched</span>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-600">
            <button 
              onClick={() => onNavigate(AppView.LANDING)} 
              className={`hover:text-[#2a9d8f] transition-colors ${currentView === AppView.LANDING ? 'text-[#2a9d8f]' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={handleHowItWorksClick} 
              className="hover:text-[#2a9d8f] transition-colors"
            >
              How It Works
            </button>
            {currentUser?.role === 'INSTRUCTOR' && (
              <button 
                onClick={() => onNavigate(AppView.CREDIT_STORE)} 
                className={`hover:text-[#2a9d8f] transition-colors ${currentView === AppView.CREDIT_STORE ? 'text-[#2a9d8f]' : ''}`}
              >
                Pricing
              </button>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                {currentUser.role === 'INSTRUCTOR' && (
                  <div className="bg-slate-50 px-3 py-1 rounded-full border border-slate-200 hidden sm:flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1e3a5f] uppercase tracking-tighter">Credits: {credits}</span>
                    <button 
                      onClick={() => onNavigate(AppView.CREDIT_STORE)}
                      className="text-[10px] bg-[#2a9d8f] text-white px-1.5 rounded font-black hover:bg-[#21867a]"
                    >
                      +
                    </button>
                  </div>
                )}
                
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border border-slate-300 shadow-sm">
                      {currentUser.profilePicture ? (
                        <img src={currentUser.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <span className="text-sm font-bold text-slate-700 hidden sm:block">{currentUser.name}</span>
                  </button>
                  
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button 
                      onClick={() => onNavigate(currentUser.role === 'INSTRUCTOR' ? AppView.INSTRUCTOR_DASHBOARD : AppView.LEARNER_DASHBOARD)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate(AppView.AUTH)}
                  className="text-slate-600 text-sm font-semibold hover:text-[#2a9d8f] px-4 py-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => onNavigate(AppView.AUTH)}
                  className="bg-[#2a9d8f] text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-[#21867a] transition-colors shadow-sm"
                >
                  Join
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
