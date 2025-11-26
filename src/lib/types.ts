
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

// OpenWeatherMap API Response Types
export interface GeoCodeResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

export interface OpenWeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
  };
  daily: {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      }
    ];
    clouds: number;
    pop: number;
    uvi: number;
    rain?: number;
  }[];
}
