'use client';

import { SearchForm } from '../weather/search-form';
import type { User } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { signOut } from '@/app/actions/auth.actions';
import { LogOut, User as UserIcon, History, Thermometer } from 'lucide-react';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/context/settings-context';

export default function AppHeader({
  user,
  onSearch,
  isSearching,
}: {
  user: User;
  onSearch: (city: string) => void;
  isSearching: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { temperatureUnit, toggleTemperatureUnit, getUnitSymbol } = useSettings();

  const handleSignOut = async () => {
    startTransition(() => {
      signOut();
    });
  };

  const handleGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding to get city name
          fetch(`https://geocoding-api.open-meteo.com/v1/search?latitude=${latitude}&longitude=${longitude}&count=1`)
            .then(res => res.json())
            .then(data => {
              if (data.results && data.results[0]) {
                onSearch(data.results[0].name);
              }
            })
            .catch(err => console.error('Reverse geocoding failed:', err));
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/50 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-10">
      <div className="flex-1">
        <SearchForm onSearch={onSearch} isSearching={isSearching} onUseLocation={handleGeolocation} />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTemperatureUnit}
        className="hidden sm:flex gap-1"
        title="Toggle temperature unit"
      >
        <Thermometer className="h-4 w-4" />
        <span className="font-medium">{getUnitSymbol()}</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.photoURL ?? undefined}
                alt={user.displayName ?? ''}
              />
              <AvatarFallback>
                {user.displayName?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline text-sm font-medium">
              {user.displayName}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/history')}>
            <History className="mr-2 h-4 w-4" />
            <span>History</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} disabled={isPending}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
