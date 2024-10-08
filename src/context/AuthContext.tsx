import React, { createContext, useContext, useState } from 'react';
import { auth } from '../utils/firebaseConfig'; 
import { signOut as firebaseSignOut } from 'firebase/auth';

// Define the shape of the Auth context
interface AuthContextType {
  user: any; 
  signOut: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); 

  // Function to handle user sign-out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth); // Sign out using Firebase authentication
      setUser(null); // Clear user state after signing ou
    } catch (error) {
      console.error('Sign out error', error); // Log any sign-out errors
    }
  };

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth context
export const useAuth = () => {
  const context = useContext(AuthContext); // Access the Auth context
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider'); // Error if used outside of AuthProvider
  }
  return context;
};
