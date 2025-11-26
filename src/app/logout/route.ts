import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  
  // Delete all auth-related cookies
  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete('auth_token');
  cookieStore.delete('auth-token');
  
  // Also set expired cookies to ensure they're cleared
  cookieStore.set(AUTH_COOKIE_NAME, '', { maxAge: 0, path: '/' });
  cookieStore.set('auth_token', '', { maxAge: 0, path: '/' });
  cookieStore.set('auth-token', '', { maxAge: 0, path: '/' });
  
  redirect('/register');
}
