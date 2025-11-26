'use client';

import type { User } from '@/lib/types';
import AppSidebar from './app-sidebar';
import AppHeader from './app-header';
import { SidebarProvider } from '../ui/sidebar';
import { useBackground } from '@/context/background-context';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState, createContext, useContext } from 'react';

interface SearchContextType {
  searchCity: (city: string) => void;
  isSearching: boolean;
}

const SearchContext = createContext<SearchContextType>({
  searchCity: () => {},
  isSearching: false,
});

export const useSearch = () => useContext(SearchContext);

export default function AppLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { backgroundImage, isBgLoading } = useBackground();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (city: string) => {
    setSearchQuery(city);
    setIsSearching(true);
    // Navigate to dashboard if not already there
    if (!pathname.startsWith('/dashboard')) {
      router.push('/dashboard');
    }
    // Dispatch custom event that the dashboard page can listen to
    window.dispatchEvent(new CustomEvent('weatherSearch', { detail: { city } }));
    setTimeout(() => setIsSearching(false), 500);
  };

  const isDashboard = pathname.startsWith('/dashboard');

  const searchContextValue = {
    searchCity: handleSearch,
    isSearching,
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
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
    </SearchContext.Provider>
  );
}
