import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

export default async function RootPage() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);

    if (session) {
      redirect('/dashboard');
    } else {
      redirect('/register');
    }
  } catch (error) {
    console.error('Root page error:', error);
    // Fallback: redirect to register on any error
    redirect('/register');
  }
}
