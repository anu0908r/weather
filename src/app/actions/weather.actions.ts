
'use server';

import type { WeatherData } from '@/lib/types';
import { generateWeatherBackground as generateWeatherBackgroundFlow } from '@/ai/flows/generate-weather-background';
import { mockWeatherData } from '@/lib/mock-data';

export async function getWeatherForCity(
  city: string
): Promise<{ data?: WeatherData; error?: string }> {
  // This simulates an API call delay.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const normalizedCity = city.toLowerCase();
  const data = mockWeatherData[normalizedCity];

  if (data) {
    // In a real app, you would save this search to the user's history in Firestore.
    return { data };
  } else {
    return {
      error: `Could not find weather data for "${city}". Please try one of the available cities.`,
    };
  }
}

export async function generateAIBackground(weatherCondition: string) {
  try {
    const result = await generateWeatherBackgroundFlow({ weatherCondition });
    return { data: result.backgroundImageUrl };
  } catch (error) {
    console.error('AI background generation failed:', error);
    // Return a default gradient or image on failure
    return { error: 'Failed to generate background.' };
  }
}
