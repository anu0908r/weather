'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, comparePassword, generateToken } from '@/lib/auth-utils';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
});

export async function signInWithEmail(
  values: z.infer<typeof loginSchema>
): Promise<{ error?: string; success?: boolean }> {
  try {
    const result = loginSchema.safeParse(values);

    if (!result.success) {
      return { error: 'Invalid email or password format.' };
    }

    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        return { error: 'Database not configured. Follow MONGODB_SETUP.md to enable authentication.' };
      }
      throw error;
    }

    // Find user by email
    const user = await User.findOne({ email: result.data.email });

    if (!user) {
      return { error: 'Invalid email or password.' };
    }

    // Verify password
    const isPasswordValid = await comparePassword(result.data.password, user.password);

    if (!isPasswordValid) {
      return { error: 'Invalid email or password.' };
    }

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Create session data
    const sessionData = {
      uid: user._id.toString(),
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    cookieStore.set('auth_token', token, {
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
    console.error('Sign in error:', error);
    return { error: 'An error occurred during sign in.' };
  }
}

export async function signUpWithEmail(
  values: z.infer<typeof registerSchema>
): Promise<{ error?: string; success?: boolean }> {
  try {
    const result = registerSchema.safeParse(values);

    if (!result.success) {
      return { error: 'Invalid form data.' };
    }

    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        return { error: 'Database not configured. Follow MONGODB_SETUP.md to enable authentication.' };
      }
      throw error;
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: result.data.email });

    if (existingUser) {
      return { error: 'Email already registered.' };
    }

    // Hash password
    const hashedPassword = await hashPassword(result.data.password);

    // Create new user
    const newUser = await User.create({
      email: result.data.email,
      password: hashedPassword,
      displayName: result.data.displayName,
      photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(result.data.displayName)}&background=random`,
    });

    // Generate JWT token
    const token = generateToken(newUser._id.toString());

    // Create session data
    const sessionData = {
      uid: newUser._id.toString(),
      email: newUser.email,
      displayName: newUser.displayName,
      photoURL: newUser.photoURL,
    };

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // Redirect after successful registration
    redirect('/dashboard');
  } catch (error) {
    // Let redirect errors propagate
    if (error instanceof Error && (error.message === 'NEXT_REDIRECT' || error.digest?.startsWith('NEXT_REDIRECT'))) {
      throw error;
    }
    console.error('Sign up error details:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration.';
    return { error: errorMessage };
  }
}

export async function signInWithGoogle(): Promise<{ error?: string; success?: boolean }> {
  // TODO: Implement Google OAuth flow with MongoDB
  // For now, return a message
  return { error: 'Google Sign-In coming soon! Please use email/password.' };
}

export async function signOut(): Promise<{ error?: string }> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
    cookieStore.delete('auth_token');
  } catch (error) {
    if (error instanceof Error) return { error: error.message };
    return { error: 'An unknown error occurred during sign out' };
  }
  redirect('/login');
}
