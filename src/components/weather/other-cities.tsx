'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { getWeatherForCity } from '@/app/actions/weather.actions';
import type { WeatherData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const FEATURED_CITIES = ['London', 'Tokyo', 'Paris', 'Sydney'];

interface OtherCitiesProps {
    onCityClick: (city: string) => void;
}

export function OtherCities({ onCityClick }: OtherCitiesProps) {
  const [citiesData, setCitiesData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCities() {
      setIsLoading(true);
      const results = await Promise.all(
        FEATURED_CITIES.map(city => getWeatherForCity(city))
      );
      
      const validData = results
        .filter(result => result.data)
        .map(result => result.data!);
      
      setCitiesData(validData);
      setIsLoading(false);
    }
    
    loadCities();
  }, []);

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Other Cities</CardTitle>
        <Button variant="link" className="pr-0">Show All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {isLoading ? (
          <>
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </>
        ) : (
          citiesData.map((cityData) => (
            <button 
              key={cityData.city} 
              className="flex items-center justify-between p-2 bg-background/50 rounded-lg text-left hover:bg-background/80 transition-colors"
              onClick={() => onCityClick(cityData.city)}
            >
              <div>
                <p className="font-semibold">{Math.round(cityData.current.temp)}°</p>
                <p className="text-xs text-muted-foreground">H:{Math.round(cityData.daily[0].temp.max)}° L:{Math.round(cityData.daily[0].temp.min)}°</p>
                <p className="text-sm">{cityData.city}</p>
              </div>
            </button>
          ))
        )}
      </CardContent>
    </Card>
  );
}
