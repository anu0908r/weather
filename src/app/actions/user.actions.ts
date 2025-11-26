'use server';

import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import SearchHistory from '@/models/SearchHistory';
import User from '@/models/User';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

export async function saveSearchHistory(city: string, country?: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!session) {
      // Silently skip if not authenticated
      return { success: true };
    }

    const userData = JSON.parse(session.value);
    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        // Silently skip if MongoDB not configured
        return { success: true };
      }
      throw error;
    }

    // Save search history
    await SearchHistory.create({
      userId: userData.uid,
      city,
      country,
      searchedAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving search history:', error);
    return { success: false, error: 'Failed to save search history' };
  }
}

export async function getSearchHistory(limit: number = 10): Promise<{ data?: any[]; error?: string }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!session) {
      // Return empty history if not authenticated
      return { data: [] };
    }

    const userData = JSON.parse(session.value);
    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        // Return empty history if MongoDB not configured
        return { data: [] };
      }
      throw error;
    }

    const history = await SearchHistory.find({ userId: userData.uid })
      .sort({ searchedAt: -1 })
      .limit(limit)
      .lean();

    return { data: history };
  } catch (error) {
    console.error('Error fetching search history:', error);
    return { error: 'Failed to fetch search history' };
  }
}

export async function addFavoriteCity(city: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    const userData = JSON.parse(session.value);
    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        return { success: false, error: 'Database not configured' };
      }
      throw error;
    }

    const user = await User.findById(userData.uid);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    if (!user.favoriteCities.includes(city)) {
      user.favoriteCities.push(city);
      await user.save();
    }

    return { success: true };
  } catch (error) {
    console.error('Error adding favorite city:', error);
    return { success: false, error: 'Failed to add favorite city' };
  }
}

export async function removeFavoriteCity(city: string): Promise<{ success: boolean; error?: string }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    const userData = JSON.parse(session.value);
    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        return { success: false, error: 'Database not configured' };
      }
      throw error;
    }

    const user = await User.findById(userData.uid);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    user.favoriteCities = user.favoriteCities.filter((c: string) => c !== city);
    await user.save();

    return { success: true };
  } catch (error) {
    console.error('Error removing favorite city:', error);
    return { success: false, error: 'Failed to remove favorite city' };
  }
}

export async function getFavoriteCities(): Promise<{ data?: string[]; error?: string }> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    
    if (!session) {
      return { data: [] };
    }

    const userData = JSON.parse(session.value);
    try {
      await connectDB();
    } catch (error: any) {
      if (error.message === 'MONGODB_NOT_CONFIGURED') {
        return { data: [] };
      }
      throw error;
    }

    const user = await User.findById(userData.uid).select('favoriteCities').lean();
    
    if (!user) {
      return { error: 'User not found' };
    }

    return { data: user.favoriteCities || [] };
  } catch (error) {
    console.error('Error fetching favorite cities:', error);
    return { error: 'Failed to fetch favorite cities' };
  }
}
