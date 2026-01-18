import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import LearnerForm from './components/LearnerForm';
import InstructorDashboard from './components/InstructorDashboard';
import LearnerDashboard from './components/LearnerDashboard';
import CreditStore from './components/CreditStore';
import Auth from './components/Auth';
import AddReviewModal from './components/AddReviewModal';
import { AppView, Enquiry, User, Review } from './types';
import { auth, db } from './lib/firebase';
import { 
  onAuthStateChanged, 
  signOut 
} from "firebase/auth";
import { 
  doc, 
  updateDoc, 
  onSnapshot, 
  collection, 
  addDoc, 
  runTransaction,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubProfile: (() => void) | undefined;
    const loadingTimeout = setTimeout(() => setIsLoading(false), 5000);

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const userRef = doc(db, "users", fbUser.uid);
        unsubProfile = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setCurrentUser({ id: fbUser.uid, ...docSnap.data() } as User);
          } else {
            setCurrentUser(null);
          }
          setIsLoading(false);
          clearTimeout(loadingTimeout);
        }, (error) => {
          console.error("Profile snapshot error:", error);
          setIsLoading(false);
          clearTimeout(loadingTimeout);
        });
      } else {
        if (unsubProfile) unsubProfile();
        setCurrentUser(null);
        setIsLoading(false);
        clearTimeout(loadingTimeout);
      }
    });

    return () => {
      unsubscribe();
      if (unsubProfile) unsubProfile();
      clearTimeout(loadingTimeout);
    };
  }, []);

  useEffect(() => {
    const q = query(collection(db, "enquiries"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const enquiryList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          timestamp: data.timestamp ? (data.timestamp as Timestamp).toDate() : new Date()
        } as Enquiry;
      });
      setEnquiries(enquiryList);
    }, (error) => console.error("Enquiries error:", error));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reviewList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(reviewList);
    }, (error) => console.error("Reviews error:", error));
    return () => unsubscribe();
  }, []);

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogout = async () => {
    await signOut(auth);
    handleNavigate(AppView.LANDING);
  };

  const addEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'timestamp'>) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "enquiries"), {
        ...enquiry,
        learnerId: currentUser.id,
        timestamp: Timestamp.now(),
        unlocked: false,
        isArchived: false,
        isIgnored: false
      });
      alert('Request submitted!');
      handleNavigate(AppView.LEARNER_DASHBOARD);
    } catch (error) {
      console.error("Add error:", error);
    }
  };

  const unlockEnquiry = async (id: string) => {
    if (!currentUser || currentUser.role !== 'INSTRUCTOR') return;
    const instructorRef = doc(db, "users", currentUser.id);
    const enquiryRef = doc(db, "enquiries", id);
    try {
      await runTransaction(db, async (transaction) => {
        const instDoc = await transaction.get(instructorRef);
        const currentCredits = instDoc.data()?.credits || 0;
        if (currentCredits <= 0) throw "No credits!";
        transaction.update(instructorRef, { credits: currentCredits - 1 });
        transaction.update(enquiryRef, { unlocked: true, unlockedBy: currentUser.id, isIgnored: false });
      });
    } catch (e) {
      console.error("Unlock failed:", e);
    }
  };

  const archiveEnquiry = async (id: string) => {
    const enq = enquiries.find(e => e.id === id);
    if (enq) await updateDoc(doc(db, "enquiries", id), { isArchived: !enq.isArchived });
  };

  const ignoreEnquiry = async (id: string) => {
    const enq = enquiries.find(e => e.id === id);
    if (enq) await updateDoc(doc(db, "enquiries", id), { isIgnored: !enq.isIgnored });
  };

  const purchaseCredits = async (amount: number) => {
    if (!currentUser) return;
    await updateDoc(doc(db, "users", currentUser.id), { credits: (currentUser.credits || 0) + amount });
    handleNavigate(AppView.INSTRUCTOR_DASHBOARD);
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (currentUser) await updateDoc(doc(db, "users", currentUser.id), updates);
  };

  const handleAddReview = async (reviewData: { rating: number; content: string; isAnonymous: boolean }) => {
    if (!currentUser) return;
    try {
      await addDoc(collection(db, "reviews"), {
        name: reviewData.isAnonymous ? 'Anonymous' : currentUser.name,
        role: currentUser.role === 'INSTRUCTOR' ? 'Instructor' : 'Learner Driver',
        content: reviewData.content,
        rating: reviewData.rating,
        avatar: reviewData.isAnonymous ? `https://i.pravatar.cc/150?u=anon-${Math.random()}` : (currentUser.profilePicture || `https://i.pravatar.cc/150?u=${currentUser.id}`),
        timestamp: Timestamp.now()
      });
      setShowReviewModal(false);
      handleNavigate(AppView.LANDING);
    } catch (error) {
      console.error("Review error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p className="text-slate-400 text-sm font-medium animate-pulse">Initializing...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case AppView.LANDING:
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <HowItWorks onNavigate={handleNavigate} />
            <Benefits />
            <Reviews reviews={reviews} onAddReviewClick={() => (currentUser ? setShowReviewModal(true) : handleNavigate(AppView.AUTH))} />
          </>
        );
      case AppView.AUTH:
        return <Auth onNavigate={handleNavigate} />;
      case AppView.LEARNER_FORM:
        return <LearnerForm onAddEnquiry={addEnquiry} onNavigate={handleNavigate} currentUser={currentUser} />;
      case AppView.LEARNER_DASHBOARD:
        return currentUser?.role === 'LEARNER' ? <LearnerDashboard user={currentUser} enquiries={enquiries} onNavigate={handleNavigate} onAddReviewClick={() => setShowReviewModal(true)} /> : null;
      case AppView.INSTRUCTOR_DASHBOARD:
        return currentUser?.role === 'INSTRUCTOR' ? <InstructorDashboard user={currentUser} enquiries={enquiries} credits={currentUser.credits || 0} onUnlock={unlockEnquiry} onArchive={archiveEnquiry} onIgnore={ignoreEnquiry} onNavigate={handleNavigate} onUpdateProfile={updateProfile} onAddReviewClick={() => setShowReviewModal(true)} /> : null;
      case AppView.CREDIT_STORE:
        return <CreditStore onPurchase={purchaseCredits} onNavigate={handleNavigate} />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentView={currentView} onNavigate={handleNavigate} credits={currentUser?.credits || 0} currentUser={currentUser} onLogout={handleLogout} />
      <main className="flex-grow">{renderContent()}</main>
      <Footer />
      {showReviewModal && <AddReviewModal currentUser={currentUser} onClose={() => setShowReviewModal(false)} onSubmit={handleAddReview} />}
    </div>
  );
};

export default App;