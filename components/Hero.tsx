
import React from 'react';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  onNavigate: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-24 sm:pt-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Find the Right <span className="text-teal-600">Driving Instructor</span> Near You – <span className="text-teal-500">Fast & Easy</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
            Submit your lesson request, compare local instructors, and start learning in minutes. The effortless way to grow your driving school business.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => onNavigate(AppView.LEARNER_FORM)}
              className="px-8 py-4 bg-teal-600 text-white font-bold rounded-xl shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Get Quotes Now <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate(AppView.INSTRUCTOR_DASHBOARD)}
              className="px-8 py-4 bg-white text-slate-700 font-bold rounded-xl border-2 border-slate-200 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2"
            >
              I'm an Instructor
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
          <div className="relative z-10">
            {/* Visual illustration mimicking the design */}
            <div className="relative bg-teal-50 rounded-3xl p-8 overflow-hidden border border-teal-100 shadow-2xl">
              <div className="flex justify-between items-start mb-12">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 animate-bounce delay-100">
                  <MapPin className="w-8 h-8 text-teal-600" />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 animate-bounce">
                  <Navigation className="w-8 h-8 text-teal-500" />
                </div>
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 animate-bounce delay-200">
                  <MapPin className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex items-center gap-4 max-w-xs mx-auto mb-8">
                <img src="https://picsum.photos/seed/instructor/64/64" alt="Instructor" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="h-2 w-24 bg-slate-200 rounded mb-2"></div>
                  <div className="h-2 w-16 bg-slate-100 rounded"></div>
                </div>
                <div className="ml-auto bg-teal-500 h-8 w-8 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 text-white">✓</div>
                </div>
              </div>

              <div className="h-48 w-full bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-slate-400 italic">Matching nearby pupils...</span>
                </div>
              </div>
            </div>
            
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
