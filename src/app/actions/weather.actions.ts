
'use server';

import type { WeatherData, OpenWeatherApiResponse, GeoCodeResponse } from '@/lib/types';
import { generateWeatherBackground as generateWeatherBackgroundFlow } from '@/ai/flows/generate-weather-background';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const GEOCODE_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_URL = 'https://api.openweathermap.org/data/3.0/onecall';

async function getCoordsForCity(city: string): Promise<{ lat: number; lon: number; name: string } | null> {
  if (!API_KEY) {
    console.error('OpenWeatherMap API key is missing.');
    return null;
  }
  const response = await fetch(`${GEOCODE_URL}?q=${city}&limit=1&appid=${API_KEY}`);
  if (!response.ok) {
    return null;
  }
  const data = (await response.json()) as GeoCodeResponse[];
  if (data.length === 0) {
    return null;
  }
  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
}


function transformWeatherData(apiResponse: OpenWeatherApiResponse, cityName: string): WeatherData {
    return {
        city: cityName,
        current: {
            temp: apiResponse.current.temp,
            feels_like: apiResponse.current.feels_like,
            humidity: apiResponse.current.humidity,
            pressure: apiResponse.current.pressure,
            wind_speed: apiResponse.current.wind_speed,
            sunrise: apiResponse.current.sunrise,
            sunset: apiResponse.current.sunset,
            main: apiResponse.current.weather[0].main,
            description: apiResponse.current.weather[0].description,
            icon: apiResponse.current.weather[0].icon,
            clouds: apiResponse.current.clouds,
        },
        daily: apiResponse.daily.map(day => ({
            dt: day.dt,
            temp: {
                day: day.temp.day,
                min: day.temp.min,
                max: day.temp.max,
            },
            weather: [{
                main: day.weather[0].main,
                description: day.weather[0].description,
                icon: day.weather[0].icon,
            }],
        })),
    };
}


export async function getWeatherForCity(
  city: string
): Promise<{ data?: WeatherData; error?: string }> {
  if (!API_KEY) {
    return { error: "Weather service is unavailable. API key not configured." }
  }

  const coords = await getCoordsForCity(city);

  if (!coords) {
    return {
      error: `Could not find location data for "${city}". Please try a different city.`,
    };
  }

  try {
    const response = await fetch(
      `${WEATHER_URL}?lat=${coords.lat}&lon=${coords.lon}&units=metric&exclude=minutely,hourly,alerts&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return { error: `Failed to fetch weather data: ${errorData.message}` };
    }

    const apiData: OpenWeatherApiResponse = await response.json();
    const data = transformWeatherData(apiData, coords.name);
    
    // In a real app, you would save this search to the user's history in Firestore.
    return { data };

  } catch (err) {
    console.error(err);
    return { error: 'An unexpected error occurred while fetching weather data.' };
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
