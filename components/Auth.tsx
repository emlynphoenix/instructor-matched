import React, { useState } from 'react';
import { UserRole, AppView } from '../types';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '../lib/firebase';


import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";

interface AuthProps {
  onNavigate: (view: AppView) => void;
}

const Auth: React.FC<AuthProps> = ({ onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>('LEARNER');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // We use a try-catch specifically for the Firestore fetch
        // In case the network is fine for Auth but blocks Firestore
        try {
          const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            onNavigate(userData.role === 'INSTRUCTOR' ? AppView.INSTRUCTOR_DASHBOARD : AppView.LEARNER_DASHBOARD);
          } else {
            // Profile document missing, maybe signup was interrupted
            onNavigate(AppView.LANDING);
          }
        } catch (dbErr: any) {
          console.error("Firestore Error during login:", dbErr);
          // If Firestore fails but Auth succeeded, we can still try to navigate to a dashboard
          // The App.tsx listener will handle the data sync once connection is restored
          onNavigate(AppView.LANDING);
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;

        // Create user profile in Firestore
        await setDoc(doc(db, "users", fbUser.uid), {
          name,
          email,
          role,
          credits: role === 'INSTRUCTOR' ? 10 : 0,
          isVerified: false,
          timestamp: Timestamp.now()
        });
        
        // Brief delay to allow Firestore cache to stabilize
        setTimeout(() => {
          onNavigate(role === 'INSTRUCTOR' ? AppView.INSTRUCTOR_DASHBOARD : AppView.LEARNER_DASHBOARD);
        }, 150);
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      let friendlyMessage = "An error occurred during authentication.";
      if (err.code === 'auth/network-request-failed') friendlyMessage = "Network error. Please check your internet connection.";
      if (err.code === 'auth/invalid-credential') friendlyMessage = "Invalid email or password.";
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-teal-600 p-8 text-white text-center">
          <h2 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-teal-100 mt-2">
            {isLogin ? 'Log in to manage your driving journey' : 'Join Instructor Matched today'}
          </p>
        </div>

        <div className="p-8">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white shadow-sm text-teal-600' : 'text-slate-500'}`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-3 rounded-xl mb-4 font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      type="button"
                      onClick={() => setRole('LEARNER')}
                      className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${role === 'LEARNER' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                    >
                      Learner
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('INSTRUCTOR')}
                      className={`py-3 rounded-xl border-2 text-sm font-bold transition-all ${role === 'INSTRUCTOR' ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                    >
                      Instructor
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    required
                    type="text" 
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-teal-500 outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="email" 
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-teal-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                required
                type="password" 
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-teal-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-100 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-b-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Login' : 'Create Account'} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => onNavigate(AppView.LANDING)}
              className="text-slate-400 text-sm hover:text-teal-600 underline"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;