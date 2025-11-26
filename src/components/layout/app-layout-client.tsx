'use client';

import type { User } from '@/lib/types';
import AppSidebar from './app-sidebar';
import AppHeader from './app-header';
import { SidebarProvider } from '../ui/sidebar';

export default function AppLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full bg-background">
        <AppSidebar user={user} />
        <div className="flex flex-col flex-1">
          <AppHeader user={user} />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
