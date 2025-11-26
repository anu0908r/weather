import { Card, CardContent } from '@/components/ui/card';
import type { WeatherData } from '@/lib/types';
import { WeatherIcon } from './weather-icon';
import { Button } from '../ui/button';
import { format, formatDistanceToNow } from 'date-fns';
import { MapPin, Cloud, Clock } from 'lucide-react';
import { useSettings } from '@/context/settings-context';

interface CurrentWeatherProps {
  data: WeatherData;
  onSearch: (city: string) => void;
}

export function CurrentWeather({ data, onSearch }: CurrentWeatherProps) {
  const { convertTemp, getUnitSymbol } = useSettings();

  return (
    <Card className="bg-card/80 backdrop-blur-sm p-6">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
          <div>
            <Button
              variant="secondary"
              size="sm"
              className="bg-primary/20 text-primary hover:bg-primary/30"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {data.city}
            </Button>
            <p className="text-lg mt-4">{format(new Date(), 'eeee')}</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(), 'd MMM, yyyy')}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3" />
              <span>Updated {formatDistanceToNow(data.lastUpdated, { addSuffix: true })}</span>
            </div>
            <p className="text-5xl font-bold mt-4">
              {convertTemp(data.current.temp)}{getUnitSymbol()}
            </p>
            <p className="text-sm text-muted-foreground">
              High: {convertTemp(data.daily[0].temp.max)}° Low:{' '}
              {convertTemp(data.daily[0].temp.min)}°
            </p>
          </div>
          <div className="flex flex-col items-center">
            <WeatherIcon
              iconCode={data.current.icon}
              className="w-32 h-32 text-primary drop-shadow-lg"
            />
            <p className="text-lg font-semibold capitalize">
              {data.current.description}
            </p>
            <p className="text-sm text-muted-foreground">
              Feels Like {convertTemp(data.current.feels_like)}°
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <Cloud className="h-4 w-4" />
          <span>Cloudiness: {data.current.clouds}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
