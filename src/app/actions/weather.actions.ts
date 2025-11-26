'use server';

import type { WeatherData } from '@/lib/types';
import { addDays, getUnixTime } from 'date-fns';
import { generateWeatherBackground as generateWeatherBackgroundFlow } from '@/ai/flows/generate-weather-background';

// In a real app, you'd fetch from an API and cache in Firestore.
// For this demo, we are returning mock data.

const mockWeatherData: Record<string, WeatherData> = {
  london: {
    city: 'London',
    current: {
      temp: 15,
      feels_like: 14,
      humidity: 82,
      pressure: 1012,
      wind_speed: 4.6,
      sunrise: getUnixTime(new Date()),
      sunset: getUnixTime(addDays(new Date(), 0.4)),
      main: 'Clouds',
      description: 'overcast clouds',
      icon: '04d',
      clouds: 100,
    },
    daily: Array.from({ length: 5 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i + 1)),
      temp: { day: 16 - i, min: 10, max: 20 },
      weather: [
        {
          main: i % 2 === 0 ? 'Rain' : 'Clouds',
          description: i % 2 === 0 ? 'light rain' : 'scattered clouds',
          icon: i % 2 === 0 ? '10d' : '03d',
        },
      ],
    })),
  },
  'new york': {
    city: 'New York',
    current: {
      temp: 22,
      feels_like: 22,
      humidity: 60,
      pressure: 1015,
      wind_speed: 3.1,
      sunrise: getUnixTime(new Date()),
      sunset: getUnixTime(addDays(new Date(), 0.5)),
      main: 'Clear',
      description: 'clear sky',
      icon: '01d',
      clouds: 0,
    },
    daily: Array.from({ length: 5 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i + 1)),
      temp: { day: 24 - i, min: 18, max: 28 },
      weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
    })),
  },
  tokyo: {
    city: 'Tokyo',
    current: {
      temp: 28,
      feels_like: 31,
      humidity: 75,
      pressure: 1008,
      wind_speed: 2.5,
      sunrise: getUnixTime(new Date()),
      sunset: getUnixTime(addDays(new Date(), 0.45)),
      main: 'Rain',
      description: 'moderate rain',
      icon: '10d',
      clouds: 75,
    },
    daily: Array.from({ length: 5 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i + 1)),
      temp: { day: 26 - i, min: 22, max: 30 },
      weather: [{ main: 'Rain', description: 'moderate rain', icon: '10d' }],
    })),
  },
};

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
      error: `Could not find weather data for "${city}". Try "London", "New York", or "Tokyo".`,
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
