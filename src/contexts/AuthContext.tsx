import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: User | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;
    
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // First get or create the user document
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (!userDoc.exists()) {
            const isHardcodedAdmin = user.email === 'lakshya.automate@gmail.com';
            const role = isHardcodedAdmin ? 'admin' : 'user';
            
            const newUser: Omit<User, 'id'> = {
              role,
              email: user.email || '',
              name: user.displayName || 'Unknown User',
              createdAt: new Date().toISOString()
            };
            
            await setDoc(doc(db, 'users', user.uid), newUser);
          }
          
          // Now subscribe to real-time updates
          unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (snap) => {
            if (snap.exists()) {
              setUserProfile({ id: snap.id, ...snap.data() } as User);
            }
            setLoading(false);
          });
        } catch (error) {
          console.error("Error fetching/creating user profile", error);
          setLoading(false);
        }
      } else {
        if (unsubscribeProfile) unsubscribeProfile();
        setUserProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const isAdmin = userProfile?.role === 'admin' || currentUser?.email === 'lakshya.automate@gmail.com';

  return (
    <AuthContext.Provider value={{ currentUser, userProfile, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
