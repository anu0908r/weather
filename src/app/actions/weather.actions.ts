
'use server';

import type { WeatherData } from '@/lib/types';
import { generateWeatherBackground as generateWeatherBackgroundFlow } from '@/ai/flows/generate-weather-background';
import { getUnixTime } from 'date-fns';

// Using Open-Meteo API (completely free, no API key required)
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

async function getCoordsForCity(city: string): Promise<{ lat: number; lon: number; name: string } | null> {
  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
      console.log(`Fetching geocoding data for: ${city} (attempt ${attempt + 1})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(url, { 
        cache: 'no-store',
        signal: controller.signal,
        headers: { 'User-Agent': 'WeatherApp/1.0' }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error('Geocoding response not ok:', response.status, response.statusText);
        if (attempt < maxRetries) continue;
        return null;
      }
      
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        console.log('No geocoding results found for:', city);
        return null;
      }
      
      const result: GeocodingResult = data.results[0];
      console.log('Found coordinates:', result.name, result.latitude, result.longitude);
      return { 
        lat: result.latitude, 
        lon: result.longitude, 
        name: result.name 
      };
    } catch (error) {
      console.error(`Geocoding error (attempt ${attempt + 1}):`, error);
      if (attempt === maxRetries) return null;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return null;
}

// Map WMO weather codes to weather conditions
function getWeatherCondition(code: number): { main: string; description: string; icon: string } {
  const weatherMap: Record<number, { main: string; description: string; icon: string }> = {
    0: { main: 'Clear', description: 'clear sky', icon: '01d' },
    1: { main: 'Clear', description: 'mainly clear', icon: '01d' },
    2: { main: 'Clouds', description: 'partly cloudy', icon: '02d' },
    3: { main: 'Clouds', description: 'overcast', icon: '03d' },
    45: { main: 'Fog', description: 'fog', icon: '50d' },
    48: { main: 'Fog', description: 'depositing rime fog', icon: '50d' },
    51: { main: 'Drizzle', description: 'light drizzle', icon: '09d' },
    53: { main: 'Drizzle', description: 'moderate drizzle', icon: '09d' },
    55: { main: 'Drizzle', description: 'dense drizzle', icon: '09d' },
    61: { main: 'Rain', description: 'slight rain', icon: '10d' },
    63: { main: 'Rain', description: 'moderate rain', icon: '10d' },
    65: { main: 'Rain', description: 'heavy rain', icon: '10d' },
    71: { main: 'Snow', description: 'slight snow', icon: '13d' },
    73: { main: 'Snow', description: 'moderate snow', icon: '13d' },
    75: { main: 'Snow', description: 'heavy snow', icon: '13d' },
    77: { main: 'Snow', description: 'snow grains', icon: '13d' },
    80: { main: 'Rain', description: 'slight rain showers', icon: '09d' },
    81: { main: 'Rain', description: 'moderate rain showers', icon: '09d' },
    82: { main: 'Rain', description: 'violent rain showers', icon: '09d' },
    85: { main: 'Snow', description: 'slight snow showers', icon: '13d' },
    86: { main: 'Snow', description: 'heavy snow showers', icon: '13d' },
    95: { main: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
    96: { main: 'Thunderstorm', description: 'thunderstorm with slight hail', icon: '11d' },
    99: { main: 'Thunderstorm', description: 'thunderstorm with heavy hail', icon: '11d' },
  };
  
  return weatherMap[code] || { main: 'Unknown', description: 'unknown', icon: '01d' };
}

export async function getWeatherForCity(
  city: string
): Promise<{ data?: WeatherData; error?: string }> {
  const coords = await getCoordsForCity(city);

  if (!coords) {
    return {
      error: `Could not find location data for "${city}". Please try a different city.`,
    };
  }

  const maxRetries = 2;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const weatherUrl = `${WEATHER_URL}?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,pressure_msl,wind_speed_10m,cloud_cover&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&forecast_days=7&forecast_hours=24`;
      console.log(`Fetching weather data for: ${coords.name} (attempt ${attempt + 1})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const weatherResponse = await fetch(weatherUrl, { 
        cache: 'no-store',
        signal: controller.signal,
        headers: { 'User-Agent': 'WeatherApp/1.0' }
      });
      
      clearTimeout(timeoutId);

      if (!weatherResponse.ok) {
        console.error('Weather response not ok:', weatherResponse.status, weatherResponse.statusText);
        if (attempt < maxRetries) continue;
        return { error: 'Failed to fetch weather data.' };
      }

      const weatherData = await weatherResponse.json();
      console.log('Weather data received successfully');
    
    const currentWeather = getWeatherCondition(weatherData.current.weather_code);
    const currentDate = new Date();
    const sunrise = new Date(weatherData.daily.sunrise[0]);
    const sunset = new Date(weatherData.daily.sunset[0]);

      const data: WeatherData = {
      city: coords.name,
      lastUpdated: Date.now(),
      current: {
        temp: Math.round(weatherData.current.temperature_2m),
        feels_like: Math.round(weatherData.current.apparent_temperature),
        humidity: weatherData.current.relative_humidity_2m,
        pressure: Math.round(weatherData.current.pressure_msl),
        wind_speed: weatherData.current.wind_speed_10m,
        sunrise: getUnixTime(sunrise),
        sunset: getUnixTime(sunset),
        main: currentWeather.main,
        description: currentWeather.description,
        icon: currentWeather.icon,
        clouds: weatherData.current.cloud_cover,
      },
      hourly: weatherData.hourly.time.slice(0, 24).map((time: string, index: number) => ({
        dt: getUnixTime(new Date(time)),
        temp: Math.round(weatherData.hourly.temperature_2m[index]),
        weather_code: weatherData.hourly.weather_code[index],
      })),
      daily: weatherData.daily.time.map((date: string, index: number) => {
        const dayWeather = getWeatherCondition(weatherData.daily.weather_code[index]);
        return {
          dt: getUnixTime(new Date(date)),
          temp: {
            day: Math.round((weatherData.daily.temperature_2m_max[index] + weatherData.daily.temperature_2m_min[index]) / 2),
            min: Math.round(weatherData.daily.temperature_2m_min[index]),
            max: Math.round(weatherData.daily.temperature_2m_max[index]),
          },
          weather: [{
            main: dayWeather.main,
            description: dayWeather.description,
            icon: dayWeather.icon,
          }],
        };
      }),
    };      return { data };

    } catch (err) {
      console.error(`Weather fetch error (attempt ${attempt + 1}):`, err);
      if (attempt === maxRetries) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        return { error: `Unable to fetch weather data. Please try again.` };
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  return { error: 'Unable to fetch weather data after multiple attempts.' };
}

export async function searchCities(query: string): Promise<{ data?: Array<{ name: string; country: string; lat: number; lon: number }>; error?: string }> {
  if (!query || query.length < 2) {
    return { data: [] };
  }

  try {
    const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(url, { 
      cache: 'no-store',
      signal: controller.signal,
      headers: { 'User-Agent': 'WeatherApp/1.0' }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return { data: [] };
    }
    
    const data = await response.json();
    
    if (!data.results || data.results.length === 0) {
      return { data: [] };
    }
    
    const cities = data.results.map((result: GeocodingResult) => ({
      name: result.name,
      country: result.country,
      lat: result.latitude,
      lon: result.longitude,
    }));
    
    return { data: cities };
  } catch (error) {
    console.error('City search error:', error);
    return { data: [] };
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
