'use client';

import { useState, useEffect, useTransition } from 'react';
import type { WeatherData } from '@/lib/types';
import {
  getWeatherForCity,
  generateAIBackground,
} from '@/app/actions/weather.actions';
import { saveSearchHistory } from '@/app/actions/user.actions';
import { useToast } from '@/hooks/use-toast';
import { CurrentWeather } from '@/components/weather/current-weather';
import { ForecastCard } from '@/components/weather/forecast-card';
import { WeatherDetails } from '@/components/weather/weather-details';
import { HourlyForecastCard } from '@/components/weather/hourly-forecast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Logo } from '@/components/icons';
import { APP_NAME } from '@/lib/constants';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { OtherCities } from '@/components/weather/other-cities';
import { useBackground } from '@/context/background-context';

export default function DashboardPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, startSearchTransition] = useTransition();
  const { toast } = useToast();
  const { setBackgroundImage, setIsBgLoading } = useBackground();

  const handleSearch = (city: string) => {
    setError(null);
    setWeatherData(null);
    setBackgroundImage('');

    startSearchTransition(async () => {
      const result = await getWeatherForCity(city);
      if (result.error) {
        setError(result.error);
        toast({
          variant: 'destructive',
          title: 'Search Failed',
          description: result.error,
        });
      } else if (result.data) {
        setWeatherData(result.data);
        
        // Save search to history
        await saveSearchHistory(city);
        
        // AI background disabled (requires billing)
        // setIsBgLoading(true);
        // const bgResult = await generateAIBackground(
        //   result.data.current.description
        // );
        // if (bgResult.data) {
        //   setBackgroundImage(bgResult.data);
        // }
        // setIsBgLoading(false);
      }
    });
  };

  useEffect(() => {
    // Load default weather on initial load
    handleSearch('New York');

    // Listen for search events from the header
    const handleWeatherSearch = (event: CustomEvent<{ city: string }>) => {
      handleSearch(event.detail.city);
    };

    window.addEventListener('weatherSearch', handleWeatherSearch as EventListener);
    
    return () => {
      window.removeEventListener('weatherSearch', handleWeatherSearch as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-8">
      {isSearching && !weatherData && <DashboardSkeleton />}

      {error && !isSearching && (
        <Alert variant="destructive" className="max-w-xl mx-auto bg-card/80">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Search Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isSearching && weatherData && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="grid gap-6 xl:col-span-2">
            <CurrentWeather data={weatherData} onSearch={handleSearch} />
            {weatherData.hourly && weatherData.hourly.length > 0 && (
              <HourlyForecastCard hourly={weatherData.hourly} />
            )}
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>7-Day Forecast</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-7">
                {weatherData.daily.slice(0, 7).map((day) => (
                  <ForecastCard key={day.dt} day={day} />
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 xl:col-span-1">
            <WeatherDetails data={weatherData.current} />
            <OtherCities onCityClick={handleSearch} />
          </div>
        </div>
      )}

      {!isSearching && !weatherData && !error && (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground pt-16">
          <Logo className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold">Welcome to {APP_NAME}</h2>
          <p>Search for a city to get the latest weather updates.</p>
        </div>
      )}
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="grid gap-6 xl:col-span-2">
        <Skeleton className="h-[260px] w-full" />
        <Skeleton className="h-[180px] w-full" />
      </div>
      <div className="grid gap-6 xl:col-span-1">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[140px] w-full" />
      </div>
    </div>
  );
}
