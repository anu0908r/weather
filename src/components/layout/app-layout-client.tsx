'use client';

import type { User } from '@/lib/types';
import AppSidebar from './app-sidebar';
import AppHeader from './app-header';
import { SidebarProvider } from '../ui/sidebar';
import { useBackground } from '@/context/background-context';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AppLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { backgroundImage, isBgLoading } = useBackground();
  const pathname = usePathname();

  // This is a placeholder for a real search handler
  const handleSearch = (city: string) => {
    // In a real app, this would likely trigger a navigation
    // or update a global state. For now, we'll just log it.
    console.log('Searching for:', city);
  };
  
  // This is a placeholder for a real search loading state
  const isSearching = false;

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <SidebarProvider>
      <div
        className={cn(
          'relative flex min-h-screen w-full bg-background transition-all duration-1000',
          isDashboard && 'bg-cover bg-center'
        )}
        style={
          isDashboard && backgroundImage
            ? { backgroundImage: `url(${backgroundImage})` }
            : {}
        }
      >
        {isDashboard && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        )}
        {isBgLoading && isDashboard && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
            <div className="flex flex-col items-center gap-2 text-white">
              <Loader2 className="w-8 h-8 animate-spin" />
              <p className="text-lg">Generating background...</p>
            </div>
          </div>
        )}

        <AppSidebar user={user} />
        <div className="flex flex-col flex-1 z-10">
          <AppHeader user={user} onSearch={handleSearch} isSearching={isSearching} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
