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
  email: 'ananyau392@gmail.com',
  displayName: 'Ananya',
  photoURL: 'https://picsum.photos/seed/avatar/100/100',
};

export async function signInWithEmail(
  values: z.infer<typeof loginSchema>
): Promise<{ error?: string; success?: boolean }> {
  try {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      return { error: 'Invalid email or password format.' };
    }

    // In a real app, you would verify credentials with Firebase Auth
    if (
      result.data.email === MOCK_USER.email &&
      result.data.password === 'anu@2005'
    ) {
      const cookieStore = await cookies();
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
  } catch (error) {
    // If redirect throws, let it propagate
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Sign in error:', error);
    return { error: 'An error occurred during sign in.' };
  }
}

export async function signInWithGoogle(): Promise<{ error?: string; success?: boolean }> {
  // In a real app, this would handle the Google Sign-In redirect flow
  try {
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(MOCK_USER), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    redirect('/dashboard');
  } catch (error) {
    // If redirect throws, let it propagate
    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error('Google sign in error:', error);
    return { error: 'An error occurred during Google sign in.' };
  }
}

export async function signOut(): Promise<{ error?: string }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'An unknown error occurred during sign out' };
  }
  redirect('/login');
}
