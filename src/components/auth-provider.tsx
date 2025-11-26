'use client';

import type { User } from '@/lib/types';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import Cookies from 'js-cookie';
import { Skeleton } from './ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock user. In a real app, this would come from Firebase Auth.
const MOCK_USER: User = {
  uid: '12345',
  email: 'user@example.com',
  displayName: 'Demo User',
  photoURL: 'https://picsum.photos/seed/avatar/100/100',
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = Cookies.get(AUTH_COOKIE_NAME);
    if (session) {
      try {
        const sessionUser = JSON.parse(session);
        setUser(sessionUser);
      } catch (error) {
        setUser(null);
        Cookies.remove(AUTH_COOKIE_NAME);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [pathname]);

  const value = useMemo(() => ({ user, loading }), [user, loading]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-24 w-24 rounded-full" />
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
