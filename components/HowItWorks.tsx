
import React from 'react';
import { AppView } from '../types';

interface HowItWorksProps {
  onNavigate: (view: AppView) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      number: '1',
      title: 'Submit Your Request',
      description: 'Tell us your location, availability, and lesson preferences in seconds.'
    },
    {
      number: '2',
      title: 'Instructors Respond',
      description: 'Local instructors receive your request and reply with competitive quotes.'
    },
    {
      number: '3',
      title: 'Choose & Learn',
      description: 'Pick the instructor that fits your schedule and budget, and start lessons.'
    }
  ];

  return (
    <section id="how-it-works" className="bg-slate-50 py-24 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-teal-200 border-4 border-white">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed px-4">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            onClick={() => onNavigate(AppView.LEARNER_FORM)}
            className="px-10 py-3.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-md"
          >
            Submit Your Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
