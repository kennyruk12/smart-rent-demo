import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, role?: 'tenant' | 'landlord' | 'admin', name?: string) => Promise<UserProfile>;
  signup: (userData: { name: string; email: string; phone: string; role: 'tenant' | 'landlord'; password?: string }) => Promise<UserProfile>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('smartrent_auth_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading auth user:', e);
    }
    return null;
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('smartrent_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('smartrent_auth_user');
      }
    } catch (e) {
      console.error('Error saving auth user:', e);
    }
  }, [currentUser]);

  const login = async (email: string, preferredRole?: 'tenant' | 'landlord' | 'admin', name?: string): Promise<UserProfile> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if known demo user matches email
    let matchedUser: UserProfile | null = null;
    if (cleanEmail === DEMO_USERS.admin.email.toLowerCase() || preferredRole === 'admin') {
      matchedUser = { ...DEMO_USERS.admin };
    } else if (cleanEmail === DEMO_USERS.landlord.email.toLowerCase() || preferredRole === 'landlord') {
      matchedUser = { ...DEMO_USERS.landlord };
    } else if (cleanEmail === DEMO_USERS.tenant.email.toLowerCase() || preferredRole === 'tenant') {
      matchedUser = { ...DEMO_USERS.tenant };
    } else {
      // Check stored custom registered users
      const storedCustomUsers = JSON.parse(localStorage.getItem('smartrent_registered_users') || '[]');
      const found = storedCustomUsers.find((u: UserProfile) => u.email.toLowerCase() === cleanEmail);
      if (found) {
        matchedUser = found;
      }
    }

    if (!matchedUser) {
      const role = preferredRole || 'tenant';
      matchedUser = {
        id: `usr-${Date.now()}`,
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        phone: '+250 788 000 000',
        role: role,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
        verified: true
      };
    }

    setCurrentUser(matchedUser);
    return matchedUser;
  };

  const signup = async (userData: { name: string; email: string; phone: string; role: 'tenant' | 'landlord'; password?: string }): Promise<UserProfile> => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone,
      role: userData.role,
      avatar: userData.role === 'landlord' 
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true
    };

    // Store in registered users array
    try {
      const storedCustomUsers = JSON.parse(localStorage.getItem('smartrent_registered_users') || '[]');
      storedCustomUsers.push(newUser);
      localStorage.setItem('smartrent_registered_users', JSON.stringify(storedCustomUsers));
    } catch (e) {
      console.error('Error saving new registered user:', e);
    }

    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('smartrent_auth_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        signup,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
