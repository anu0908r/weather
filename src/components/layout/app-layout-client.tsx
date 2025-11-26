'use client';

import { useBackground } from '@/context/background-context';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';
import AppSidebar from './app-sidebar';
import { Skeleton } from '../ui/skeleton';

export default function AppLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { backgroundImage, isBgLoading } = useBackground();

  return (
    <div
      className="relative flex min-h-screen w-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 z-0 bg-background/50 backdrop-blur-sm transition-all duration-1000" />
      
      {isBgLoading && (
        <div className="absolute inset-0 z-10 transition-opacity duration-500">
           <Skeleton className="h-full w-full" />
        </div>
      )}

      <div className="relative z-20 flex w-full">
        <AppSidebar user={user} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
