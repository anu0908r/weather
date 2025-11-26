'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import type { User } from '@/lib/types';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const MOCK_USER: User = {
  uid: '12345',
  email: 'user@example.com',
  displayName: 'Demo User',
  photoURL: 'https://picsum.photos/seed/avatar/100/100',
};

export async function signInWithEmail(
  values: z.infer<typeof loginSchema>
): Promise<{ error?: string }> {
  const result = loginSchema.safeParse(values);

  if (!result.success) {
    return { error: 'Invalid email or password format.' };
  }

  // In a real app, you would verify credentials with Firebase Auth
  if (
    result.data.email === MOCK_USER.email
  ) {
    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(MOCK_USER), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/dashboard');
  } else {
    return { error: 'Invalid email or password.' };
  }
}

export async function signInWithGoogle(): Promise<{ error?: string }> {
  // In a real app, this would handle the Google Sign-In redirect flow
  try {
    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(MOCK_USER), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'An unknown error occurred' };
  }
  redirect('/dashboard');
}

export async function signOut(): Promise<{ error?: string }> {
  try {
    const cookieStore = cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'An unknown error occurred during sign out' };
  }
  redirect('/login');
}
