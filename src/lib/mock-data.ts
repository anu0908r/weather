
import type { WeatherData } from '@/lib/types';
import { addDays, getUnixTime } from 'date-fns';

export const mockWeatherData: Record<string, WeatherData> = {
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
    daily: Array.from({ length: 7 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i)),
      temp: { day: 16 - i, min: 10, max: 20, night: 12, eve: 14, morn: 11 },
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
    daily: Array.from({ length: 7 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i)),
      temp: { day: 24 - i, min: 18, max: 28, night: 20, eve: 25, morn: 19 },
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
    daily: Array.from({ length: 7 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i)),
      temp: { day: 26 - i, min: 22, max: 30, night: 23, eve: 27, morn: 24 },
      weather: [{ main: 'Rain', description: 'moderate rain', icon: '10d' }],
    })),
  },
  paris: {
    city: 'Paris',
    current: {
      temp: 18,
      feels_like: 17,
      humidity: 70,
      pressure: 1020,
      wind_speed: 5.1,
      sunrise: getUnixTime(new Date()),
      sunset: getUnixTime(addDays(new Date(), 0.42)),
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d',
      clouds: 20,
    },
    daily: Array.from({ length: 7 }, (_, i) => ({
      dt: getUnixTime(addDays(new Date(), i)),
      temp: { day: 20 - i, min: 12, max: 22, night: 14, eve: 18, morn: 13 },
      weather: [
        {
          main: 'Clear',
          description: 'clear sky',
          icon: '01d',
        },
      ],
    })),
  },
};
