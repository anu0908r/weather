import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import AppLayoutClient from '@/components/layout/app-layout-client';
import { BackgroundProvider } from '@/context/background-context';
import { SettingsProvider } from '@/context/settings-context';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);

  if (!session) {
    redirect('/login');
  }

  const user = JSON.parse(session.value);

  return (
    <SettingsProvider>
      <BackgroundProvider>
        <AppLayoutClient user={user}>{children}</AppLayoutClient>
      </BackgroundProvider>
    </SettingsProvider>
  );
}
