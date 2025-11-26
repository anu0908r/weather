import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import AppLayoutClient from '@/components/layout/app-layout-client';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);

  if (!session) {
    redirect('/login');
  }

  const user = JSON.parse(session.value);

  return <AppLayoutClient user={user}>{children}</AppLayoutClient>;
}
