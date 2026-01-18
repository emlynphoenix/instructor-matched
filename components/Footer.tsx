
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-100 pb-12 mb-8">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
                  <path d="M50 5C30.67 5 15 20.67 15 40C15 66.25 50 95 50 95C50 95 85 66.25 85 40C85 20.67 69.33 5 50 5Z" fill="#1e3a5f"/>
                  <path d="M50 18C38.4 18 29 27.4 29 39C29 54.75 50 72 50 72C50 72 71 54.75 71 39C71 27.4 61.6 18 50 18Z" fill="#2a9d8f"/>
               </svg>
            </div>
            <div className="flex leading-none gap-1">
              <span className="text-md font-bold text-[#1e3a5f]">Instructor</span>
              <span className="text-md font-bold text-[#2a9d8f]">Matched</span>
            </div>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-[#2a9d8f]">Home</a>
            <a href="#" className="hover:text-[#2a9d8f]">How It Works</a>
            <a href="#" className="hover:text-[#2a9d8f]">FAQ</a>
            <a href="#" className="hover:text-[#2a9d8f]">Pricing</a>
            <a href="#" className="hover:text-[#2a9d8f]">Contact</a>
          </nav>
          
          <div className="flex gap-4">
            <Facebook className="w-5 h-5 text-slate-400 hover:text-[#1e3a5f] cursor-pointer" />
            <Twitter className="w-5 h-5 text-slate-400 hover:text-[#1e3a5f] cursor-pointer" />
            <Instagram className="w-5 h-5 text-slate-400 hover:text-[#2a9d8f] cursor-pointer" />
            <Linkedin className="w-5 h-5 text-slate-400 hover:text-[#1e3a5f] cursor-pointer" />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium uppercase tracking-wider">
          <p>© 2024 Instructor Matched. Driving your business forward.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
