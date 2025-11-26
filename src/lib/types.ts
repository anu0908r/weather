export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  sunrise: number;
  sunset: number;
  main: string;
  description: string;
  icon: string;
  clouds: number;
}

export interface DailyForecast {
  dt: number;
  temp: {
    day: number;
    min: number;
    max: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
}

export interface WeatherData {
  city: string;
  current: CurrentWeather;
  daily: DailyForecast[];
}

export interface SearchHistory {
  id: string;
  userId: string;
  city: string;
  searchedAt: Date;
}
