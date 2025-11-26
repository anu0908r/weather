import type { DailyForecast } from '@/lib/types';
import { format } from 'date-fns';
import { WeatherIcon } from './weather-icon';

interface ForecastCardProps {
  day: DailyForecast;
}

export function ForecastCard({ day }: ForecastCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-background/50">
      <p className="text-sm font-semibold">
        {format(new Date(day.dt * 1000), 'eee')}
      </p>
      <WeatherIcon
        iconCode={day.weather[0].icon}
        className="w-10 h-10 text-primary"
      />
      <div className="flex gap-2 text-sm">
        <span className="font-medium">{Math.round(day.temp.max)}°</span>
        <span className="text-muted-foreground">
          {Math.round(day.temp.min)}°
        </span>
      </div>
    </div>
  );
}
