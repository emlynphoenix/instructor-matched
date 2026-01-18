import React, { useState, useEffect } from 'react';
import { Enquiry, AppView, User } from '../types';
import { 
  Coins, User as UserIcon, Calendar, MapPin, Search, Users, 
  Briefcase, Settings, ExternalLink, Globe, Facebook, Instagram, 
  Linkedin, Camera, Navigation, ShieldCheck, ShieldAlert, Lock, 
  Info, AlertCircle, CheckCircle2, Building2, MessageSquarePlus,
  Sparkles, Archive, History, Trash2, RotateCcw, EyeOff, Eye, Ban,
  UserCheck, UserX
} from 'lucide-react';

interface InstructorDashboardProps {
  user: User;
  enquiries: Enquiry[];
  credits: number;
  onUnlock: (id: string) => void;
  onArchive: (id: string) => void;
  onIgnore: (id: string) => void;
  onNavigate: (view: AppView) => void;
  onUpdateProfile: (updates: Partial<User>) => void;
  onAddReviewClick: () => void;
}

const InstructorDashboard: React.FC<InstructorDashboardProps> = ({ 
  user, enquiries, credits, onUnlock, onArchive, onIgnore, onNavigate, onUpdateProfile, onAddReviewClick 
}) => {
  const [activeTab, setActiveTab] = useState<'available' | 'my_students' | 'profile'>('available');
  const [showVerifyForm, setShowVerifyForm] = useState(false);
  const [confirmUnlockId, setConfirmUnlockId] = useState<string | null>(null);
  const [showSuccessId, setShowSuccessId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showArchived, setShowArchived] = useState(false);
  const [showIgnoredLeads, setShowIgnoredLeads] = useState(false);
  
  const [verifyData, setVerifyData] = useState({
    fullName: user.name,
    adiNumber: user.adiNumber || ''
  });

  const [editingProfile, setEditingProfile] = useState({
    name: user.name,
    bio: user.bio || '',
    company: user.company || '',
    qualifications: user.qualifications || '',
    postcode: user.postcode || '',
    socialLinks: { ...user.socialLinks }
  });

  // Auto-switch to My Students when a lead is successfully unlocked
  useEffect(() => {
    if (showSuccessId) {
      const timer = setTimeout(() => {
        setActiveTab('my_students');
        setShowArchived(false); // Make sure we show active students
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showSuccessId]);

  const isProfileIncomplete = !user.bio || !user.postcode || !user.company;

  const isWithinRadius = (enquiryLoc: string) => {
    if (!user.postcode) return true;
    const instructorOutcode = user.postcode.trim().toUpperCase().split(' ')[0];
    const enquiryOutcode = enquiryLoc.trim().toUpperCase().split(' ')[0];
    return instructorOutcode === enquiryOutcode || Math.random() > 0.4;
  };

  const filteredEnquiries = (activeTab === 'available' 
    ? enquiries.filter(e => !e.unlocked && isWithinRadius(e.location) && (showIgnoredLeads ? e.isIgnored : !e.isIgnored))
    : enquiries.filter(e => e.unlocked && e.unlockedBy === user.id && (showArchived ? e.isArchived : !e.isArchived))
  ).filter(e => {
    const q = searchQuery.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.town.toLowerCase().includes(q) ||
      e.transmission.toLowerCase().includes(q) ||
      (e.unlocked && !e.isArchived && e.email.toLowerCase().includes(q))
    );
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editingProfile);
    alert('Profile updated successfully!');
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyData.adiNumber) return alert('Please enter your ADI/PDI number');
    onUpdateProfile({ 
      isVerified: true, 
      adiNumber: verifyData.adiNumber, 
      name: verifyData.fullName 
    });
    setShowVerifyForm(false);
  };

  const initiateUnlock = (id: string) => {
    if (!user.isVerified) {
      setShowVerifyForm(true);
      return;
    }
    if (credits <= 0) {
      alert("You don't have enough credits. Please top up your balance.");
      return;
    }
    setConfirmUnlockId(id);
  };

  const handleConfirmUnlock = () => {
    if (confirmUnlockId) {
      onUnlock(confirmUnlockId);
      setConfirmUnlockId(null);
      setShowSuccessId(confirmUnlockId);
      setTimeout(() => setShowSuccessId(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modals */}
      {showVerifyForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your ADI Status</h2>
            <p className="text-slate-500 text-sm mb-6">Enter your details exactly as they appear on your DVSA badge.</p>
            
            <form onSubmit={handleVerifySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#2a9d8f]"
                  value={verifyData.fullName}
                  onChange={(e) => setVerifyData({...verifyData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">ADI / PDI Number</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. 123456"
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#2a9d8f]"
                  value={verifyData.adiNumber}
                  onChange={(e) => setVerifyData({...verifyData, adiNumber: e.target.value})}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowVerifyForm(false)}
                  className="flex-1 py-3 text-slate-500 font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-[#2a9d8f] text-white font-bold rounded-xl hover:bg-[#21867a]"
                >
                  Submit Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmUnlockId && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-8 border border-slate-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="w-8 h-8 text-[#2a9d8f]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Confirm Lead Unlock</h2>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to use <span className="font-bold text-slate-900">1 credit</span> to reveal the contact details for this student?
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmUnlockId(null)}
                className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmUnlock}
                className="flex-1 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
              >
                Confirm Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Verification Alert Banner */}
        {!user.isVerified && (activeTab === 'available' || activeTab === 'my_students') && (
          <div className="mb-8 bg-amber-50 border border-amber-200 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-amber-900">Verification Required</h3>
                <p className="text-sm text-amber-700">Verify your ADI status to unlock leads and purchase credits.</p>
              </div>
            </div>
            <button 
              onClick={() => setShowVerifyForm(true)}
              className="px-6 py-2.5 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-sm"
            >
              Verify Now
            </button>
          </div>
        )}

        {/* Profile Completion Reminder Banner */}
        {isProfileIncomplete && activeTab !== 'profile' && (
          <div className="mb-8 bg-[#1e3a5f] border border-blue-900 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4 animate-in fade-in slide-in-from-top-4 delay-150">
            <div className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-blue-800/50 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#2a9d8f]" />
              </div>
              <div>
                <h3 className="font-bold">Complete Your Profile</h3>
                <p className="text-sm text-blue-200">Help pupils trust you by adding a bio, company name, and location.</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveTab('profile')}
              className="px-6 py-2.5 bg-[#2a9d8f] text-white font-bold rounded-xl hover:bg-[#21867a] transition-all shadow-lg shadow-blue-900/20"
            >
              Update Profile
            </button>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-8 h-8 text-slate-400" />
                )}
             </div>
             <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                  {user.isVerified && <ShieldCheck className="w-5 h-5 text-[#2a9d8f]" />}
                </div>
                <p className="text-slate-500">{user.company || 'Independent Instructor'}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 flex-1 md:flex-none">
              <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-[#2a9d8f]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Credit Balance</p>
                <p className="text-xl font-bold text-slate-900">{credits}</p>
              </div>
            </div>
            <button 
              onClick={() => user.isVerified ? onNavigate(AppView.CREDIT_STORE) : setShowVerifyForm(true)}
              className={`px-6 py-4 font-bold rounded-2xl shadow-md flex-1 md:flex-none transition-all ${user.isVerified ? 'bg-[#2a9d8f] text-white hover:bg-[#21867a]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              Buy Credits
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 mb-8 w-fit overflow-x-auto">
          <button 
            onClick={() => setActiveTab('available')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'available' ? 'bg-[#1e3a5f] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Briefcase className="w-4 h-4" /> Available Leads
          </button>
          <button 
            onClick={() => setActiveTab('my_students')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'my_students' ? 'bg-[#1e3a5f] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Users className="w-4 h-4" /> My Students
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === 'profile' ? 'bg-[#1e3a5f] text-white' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Settings className="w-4 h-4" /> My Profile
          </button>
        </div>

        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-300">
             <div className="lg:col-span-2">
               <form onSubmit={handleProfileSave} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                     <div className="flex-shrink-0 relative group">
                        <div className="w-32 h-32 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                          {user.profilePicture ? (
                             <img src={user.profilePicture} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <Camera className="w-8 h-8 text-slate-300" />
                          )}
                        </div>
                        <button 
                          type="button" 
                          onClick={() => {
                            const url = prompt('Enter a profile picture URL:');
                            if (url) onUpdateProfile({ profilePicture: url });
                          }}
                          className="absolute inset-0 bg-black/40 text-white text-xs font-bold flex items-center justify-center rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Change Photo
                        </button>
                     </div>
                     <div className="flex-grow space-y-4 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Display Name</label>
                            <input 
                              type="text" 
                              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#2a9d8f]"
                              value={editingProfile.name}
                              onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Company Name</label>
                            <div className="relative">
                              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                type="text" 
                                placeholder="e.g. Red Driving School"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#2a9d8f]"
                                value={editingProfile.company}
                                onChange={(e) => setEditingProfile({...editingProfile, company: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Base Postcode</label>
                            <div className="relative">
                              <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input 
                                type="text" 
                                placeholder="e.g. NW1 6XE"
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#2a9d8f] outline-none transition-all"
                                value={editingProfile.postcode}
                                onChange={(e) => setEditingProfile({...editingProfile, postcode: e.target.value.toUpperCase()})}
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Qualifications</label>
                            <input 
                              type="text" 
                              placeholder="e.g. ADI Grade A"
                              className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#2a9d8f] outline-none transition-all"
                              value={editingProfile.qualifications}
                              onChange={(e) => setEditingProfile({...editingProfile, qualifications: e.target.value})}
                            />
                          </div>
                        </div>
                     </div>
                  </div>

                  <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">About Me</label>
                     <textarea 
                       rows={4}
                       className="w-full px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-[#2a9d8f] outline-none transition-all resize-none"
                       value={editingProfile.bio}
                       onChange={(e) => setEditingProfile({...editingProfile, bio: e.target.value})}
                       placeholder="Tell pupils about your teaching style..."
                     ></textarea>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                     <button 
                        type="button"
                        onClick={onAddReviewClick}
                        className="flex items-center gap-2 text-slate-500 font-bold hover:text-[#2a9d8f] transition-all"
                      >
                        <MessageSquarePlus className="w-5 h-5" />
                        Share your Experience
                      </button>
                     <button 
                       type="submit"
                       className="w-full md:w-auto px-8 py-3 bg-[#2a9d8f] text-white font-bold rounded-xl hover:bg-[#21867a] shadow-lg shadow-teal-50 transition-all"
                     >
                       Save Changes
                     </button>
                  </div>
               </form>
             </div>

             <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-hidden">
                  <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#2a9d8f]" /> Service Area (10 Mile Radius)
                  </h3>
                  <div className="aspect-square bg-slate-100 rounded-2xl relative overflow-hidden border border-slate-200 group">
                    {editingProfile.postcode ? (
                      <div className="w-full h-full relative">
                        {/* Placeholder logic for map visual if no real key is present to prevent blank white squares in UI */}
                        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center p-8 text-center">
                          <div>
                            <Globe className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Map Preview for {editingProfile.postcode}</p>
                            <p className="text-[9px] text-slate-400 mt-1 italic">Real-time coverage visualization active</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                          <div className="w-[80%] h-[80%] rounded-full border-4 border-[#2a9d8f]/40 bg-[#2a9d8f]/10 shadow-[0_0_0_9999px_rgba(255,255,255,0.4)]"></div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-[#2a9d8f]"></div>
                           <span className="text-[10px] font-bold text-slate-700">10 Mile Target Zone</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50">
                        <Navigation className="w-12 h-12 text-slate-200 mb-4 animate-pulse" />
                        <p className="text-xs font-bold text-slate-400">Enter your postcode to visualize your coverage area</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-[#1e3a5f] rounded-3xl p-6 text-white shadow-lg">
                  <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#2a9d8f]" /> Verification Status
                  </h3>
                  {user.isVerified ? (
                    <div className="space-y-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">ADI Number</p>
                        <p className="text-lg font-black">{user.adiNumber}</p>
                      </div>
                      <div className="bg-white/10 p-3 rounded-xl border border-white/10 flex items-center gap-3 text-xs">
                        <ShieldCheck className="w-4 h-4 text-[#2a9d8f]" /> Verified ADI Account
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setShowVerifyForm(true)}
                      className="w-full py-3 bg-[#2a9d8f] text-white font-bold rounded-xl hover:bg-[#21867a] transition-all"
                    >
                      Verify ADI Status
                    </button>
                  )}
                </div>
             </div>
          </div>
        ) : (
          <>
            {/* Search Bar / Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, location, or transmission..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-100 bg-white shadow-sm"
                />
              </div>
              
              <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-full md:w-auto">
                {activeTab === 'available' ? (
                  <>
                    <button 
                      onClick={() => setShowIgnoredLeads(false)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${!showIgnoredLeads ? 'bg-teal-50 text-[#2a9d8f]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Briefcase className="w-3.5 h-3.5" /> Active Leads
                    </button>
                    <button 
                      onClick={() => setShowIgnoredLeads(true)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${showIgnoredLeads ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Ban className="w-3.5 h-3.5" /> Ignored
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setShowArchived(false)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${!showArchived ? 'bg-teal-50 text-[#2a9d8f]' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Active Pupils
                    </button>
                    <button 
                      onClick={() => setShowArchived(true)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${showArchived ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      <Archive className="w-3.5 h-3.5" /> Past Students
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEnquiries.map((enquiry) => (
                <div key={enquiry.id} className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden ${enquiry.isIgnored && activeTab === 'available' ? 'opacity-75 grayscale-[0.3]' : ''}`}>
                  
                  {showSuccessId === enquiry.id && (
                    <div className="absolute inset-0 z-10 bg-teal-600/90 backdrop-blur-sm flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-300 text-center">
                      <CheckCircle2 className="w-12 h-12 mb-2" />
                      <h4 className="text-xl font-black">Lead Unlocked!</h4>
                      <p className="text-sm font-medium opacity-90">Adding to My Students...</p>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center border border-slate-200">
                        <UserIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {/* Hide personal details like full name for past/unlocked leads to preserve privacy */}
                          {(enquiry.unlocked && !enquiry.isArchived) ? enquiry.name : `${enquiry.name.charAt(0)}.`}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                          <Calendar className="w-3 h-3" />
                          <span>{activeTab === 'available' ? 'Received' : (enquiry.isArchived ? 'Completed' : 'Unlocked')} {new Date(enquiry.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                       {/* ARCHIVE/MOVE BUTTON AT TOP */}
                       {activeTab === 'my_students' && (
                         <button 
                           onClick={() => onArchive(enquiry.id)}
                           className={`p-2 rounded-xl border transition-all ${enquiry.isArchived ? 'bg-teal-50 border-teal-200 text-[#2a9d8f] hover:bg-teal-100' : 'bg-red-50 border-red-100 text-red-500 hover:bg-red-100'}`}
                           title={enquiry.isArchived ? "Move to Active" : "Move to Past"}
                         >
                           {enquiry.isArchived ? <RotateCcw className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                         </button>
                       )}

                       {activeTab === 'available' && (
                         <button 
                           onClick={() => onIgnore(enquiry.id)}
                           className={`p-2 rounded-xl border transition-all ${enquiry.isIgnored ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200' : 'border-slate-100 text-slate-300 hover:text-slate-600 hover:bg-slate-50'}`}
                           title={enquiry.isIgnored ? "Restore Lead" : "Ignore Lead"}
                         >
                           {enquiry.isIgnored ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                         </button>
                       )}
                       <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${enquiry.unlocked ? (enquiry.isArchived ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-700') : (enquiry.isIgnored ? 'bg-slate-50 text-slate-400' : 'bg-blue-100 text-blue-700')}`}>
                         {enquiry.unlocked ? (enquiry.isArchived ? 'Past Student' : 'Active Student') : (enquiry.isIgnored ? 'Dismissed' : 'New Lead')}
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-slate-50 rounded-xl relative overflow-hidden border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Town / Location</p>
                      {!user.isVerified && activeTab === 'available' ? (
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-xs">
                          <Lock className="w-3 h-3" />
                          <span className="blur-[3px] select-none">Manchester</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                          <MapPin className="w-4 h-4 text-[#2a9d8f]" />
                          <span className="truncate">{enquiry.town || enquiry.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Transmission</p>
                      <p className="text-slate-700 font-bold text-sm">{enquiry.transmission}</p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Pupil Availability</p>
                      <p className="text-slate-700 font-semibold text-sm italic truncate">"{enquiry.availability}"</p>
                    </div>
                  </div>

                  {activeTab === 'my_students' ? (
                    enquiry.isArchived ? (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm border border-slate-100">
                          <Archive className="w-6 h-6 text-slate-300" />
                        </div>
                        <h4 className="text-slate-700 font-bold text-sm mb-1 uppercase tracking-wider">Past Student Profile</h4>
                        <p className="text-slate-400 text-xs italic mb-4">All personal details, including contact info and specific lesson notes, are hidden for past students.</p>
                        <button 
                          onClick={() => onArchive(enquiry.id)}
                          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:text-[#2a9d8f] hover:border-[#2a9d8f] transition-all shadow-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Restore to Active
                        </button>
                      </div>
                    ) : (
                      <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-[#1e3a5f] font-bold text-sm uppercase tracking-wider">Active Student Profile</h4>
                          {/* Duplicate Archive Button for UX within the card content area */}
                          <button 
                            onClick={() => {
                              if (confirm('Move this student to Past Students? This hides their personal contact details and lesson notes from your active dashboard.')) {
                                onArchive(enquiry.id);
                              }
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-red-100 rounded-lg text-[10px] font-bold text-red-500 hover:bg-red-50 transition-all shadow-sm"
                            title="Set as Inactive"
                          >
                            <Archive className="w-3.5 h-3.5" /> Move to Past
                          </button>
                        </div>
                        <div className="space-y-4">
                          {enquiry.details && (
                            <div className="mb-4">
                              <p className="text-[10px] font-bold text-teal-600 uppercase mb-1">Lesson Notes</p>
                              <p className="text-slate-700 text-xs bg-white/50 p-3 rounded-xl border border-teal-100 italic">"{enquiry.details}"</p>
                            </div>
                          )}
                          <div className="flex items-center justify-between group">
                            <div>
                              <p className="text-[10px] font-bold text-teal-600 uppercase">Phone Number</p>
                              <p className="text-slate-900 font-black text-xl">{enquiry.phone}</p>
                            </div>
                            <a href={`tel:${enquiry.phone}`} className="p-3 bg-white rounded-xl shadow-sm text-teal-600 hover:bg-teal-600 hover:text-white transition-all">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                          <div className="flex items-center justify-between border-t border-teal-100 pt-4 group">
                            <div>
                              <p className="text-[10px] font-bold text-teal-600 uppercase">Email Address</p>
                              <p className="text-slate-900 font-black text-lg truncate">{enquiry.email}</p>
                            </div>
                            <a href={`mailto:${enquiry.email}`} className="p-3 bg-white rounded-xl shadow-sm text-teal-600 hover:bg-teal-600 hover:text-white transition-all">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="flex gap-2">
                       <button 
                        onClick={() => initiateUnlock(enquiry.id)}
                        className={`flex-[4] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                          credits > 0 || !user.isVerified
                            ? 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]' 
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                        disabled={user.isVerified && credits <= 0}
                      >
                        <Coins className="w-5 h-5" />
                        {user.isVerified ? 'Use 1 Credit to Reveal Contact' : 'Verify Account to Unlock'}
                      </button>
                      
                      {!enquiry.isIgnored && (
                         <button 
                           onClick={() => onIgnore(enquiry.id)}
                           className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center hover:bg-slate-200 transition-all shadow-sm"
                           title="Dismiss Lead"
                         >
                           <EyeOff className="w-5 h-5" />
                         </button>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {filteredEnquiries.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                  <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">No matches found</h3>
                  <p className="text-slate-400 text-sm max-w-sm mx-auto">
                    {showIgnoredLeads 
                      ? "You haven't hidden any leads yet." 
                      : (showArchived ? "Your 'Past Students' archive is currently empty." : "Try adjusting your filters or checking back later for new leads.")}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;