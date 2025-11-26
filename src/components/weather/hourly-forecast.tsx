'use client';

import type { HourlyForecast } from '@/lib/types';
import { format } from 'date-fns';
import { WeatherIcon } from './weather-icon';
import { useSettings } from '@/context/settings-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HourlyForecastProps {
  hourly: HourlyForecast[];
}

// Simplified weather code mapping for icons
function getIconForWeatherCode(code: number): string {
  if (code === 0 || code === 1) return '01d';
  if (code === 2) return '02d';
  if (code === 3) return '03d';
  if (code === 45 || code === 48) return '50d';
  if (code >= 51 && code <= 55) return '09d';
  if (code >= 61 && code <= 65) return '10d';
  if (code >= 71 && code <= 77) return '13d';
  if (code >= 80 && code <= 82) return '09d';
  if (code >= 85 && code <= 86) return '13d';
  if (code >= 95) return '11d';
  return '01d';
}

export function HourlyForecastCard({ hourly }: HourlyForecastProps) {
  const { convertTemp } = useSettings();

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Hourly Forecast (Next 24 Hours)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {hourly.map((hour, index) => (
            <div
              key={hour.dt}
              className="flex flex-col items-center gap-2 p-3 rounded-lg bg-background min-w-[80px]"
            >
              <p className="text-sm font-semibold whitespace-nowrap">
                {index === 0 ? 'Now' : format(new Date(hour.dt * 1000), 'HH:mm')}
              </p>
              <WeatherIcon
                iconCode={getIconForWeatherCode(hour.weather_code)}
                className="w-8 h-8 text-primary"
              />
              <p className="text-sm font-medium">
                {convertTemp(hour.temp)}°
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
