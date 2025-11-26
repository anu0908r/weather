'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import type { User } from '@/lib/types';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!session) {
      return null;
    }

    const userData = JSON.parse(session.value);
    return userData;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}
