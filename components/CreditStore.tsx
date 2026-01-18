
import React from 'react';
import { CREDIT_PACKAGES } from '../constants';
import { AppView } from '../types';
import { Coins, Check } from 'lucide-react';

interface CreditStoreProps {
  onPurchase: (amount: number) => void;
  onNavigate: (view: AppView) => void;
}

const CreditStore: React.FC<CreditStoreProps> = ({ onPurchase, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Choose Your Credit Package</h2>
          <p className="text-slate-500 mt-2">Scale your business on your terms. No monthly fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CREDIT_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`bg-white rounded-3xl p-6 border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col ${
                pkg.id === 'p2' ? 'border-[#2a9d8f] ring-4 ring-teal-50' : 'border-slate-100'
              }`}
            >
              {pkg.id === 'p2' && (
                <div className="bg-[#2a9d8f] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4 mx-auto">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4 justify-center">
                <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-[#2a9d8f]" />
                </div>
                <span className="text-xl font-bold text-slate-900">{pkg.credits} Credit{pkg.credits > 1 ? 's' : ''}</span>
              </div>
              
              <div className="mb-6 text-center">
                <span className="text-4xl font-extrabold text-slate-900">£{pkg.price}</span>
                <span className="text-slate-400 ml-1 text-sm font-medium">one-time</span>
              </div>

              <p className="text-slate-500 text-sm mb-6 text-center leading-relaxed h-10">{pkg.description}</p>

              <ul className="space-y-3 mb-8 flex-grow">
                {['Instant access', 'No expiry date', 'Verified leads'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <Check className="w-3.5 h-3.5 text-[#2a9d8f]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onPurchase(pkg.credits)}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  pkg.id === 'p2' 
                    ? 'bg-[#2a9d8f] text-white hover:bg-[#21867a]' 
                    : 'bg-[#1e3a5f] text-white hover:bg-[#152a45]'
                }`}
              >
                Buy Package
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigate(AppView.INSTRUCTOR_DASHBOARD)}
            className="text-slate-500 hover:text-[#2a9d8f] font-medium underline underline-offset-4"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditStore;
