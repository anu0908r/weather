'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear all client-side storage
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear cookies via fetch to logout route
    fetch('/logout')
      .then(() => {
        // Force reload to clear any cached state
        window.location.href = '/register';
      })
      .catch(() => {
        // Fallback: just redirect
        window.location.href = '/register';
      });
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Logging out...</h1>
        <p className="text-muted-foreground">Please wait</p>
      </div>
    </div>
  );
}
