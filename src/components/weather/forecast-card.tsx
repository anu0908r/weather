import type { DailyForecast } from '@/lib/types';
import { format } from 'date-fns';
import { WeatherIcon } from './weather-icon';
import { useSettings } from '@/context/settings-context';

interface ForecastCardProps {
  day: DailyForecast;
}

export function ForecastCard({ day }: ForecastCardProps) {
  const { convertTemp } = useSettings();
  
  return (
    <div className="flex flex-col items-center gap-2 p-2 rounded-lg bg-background">
      <p className="text-sm font-semibold">
        {format(new Date(day.dt * 1000), 'ha')}
      </p>
      <WeatherIcon
        iconCode={day.weather[0].icon}
        className="w-10 h-10 text-primary"
      />
      <div className="text-sm">
        <span className="font-medium">{convertTemp(day.temp.max)}°</span>
      </div>
    </div>
  );
}
