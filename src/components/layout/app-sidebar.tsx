'use client';

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { APP_NAME } from '@/lib/constants';
import type { User } from '@/lib/types';
import {
  LayoutDashboard,
  History,
  User as UserIcon,
  Settings,
  LogOut,
} from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { signOut } from '@/app/actions/auth.actions';
import { useTransition } from 'react';
import { Button } from '../ui/button';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/history', label: 'History', icon: History },
  { href: '/profile', label: 'Profile', icon: UserIcon },
];

const bottomMenuItems = [{ href: '#', label: 'Settings', icon: Settings }];

export default function AppSidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = async () => {
    startTransition(() => {
      signOut();
    });
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b-0 justify-center">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold">{APP_NAME}</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                variant="ghost"
                className="justify-center"
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <a href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t-0 p-2">
        <SidebarMenu>
          {bottomMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                variant="ghost"
                className="justify-center"
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <a href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <Button
              variant="ghost"
              className="w-full justify-center"
              disabled={isPending}
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign Out</span>
            </Button>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <div className="flex justify-center">
               <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
