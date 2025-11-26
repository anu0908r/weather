import { Card, CardContent } from '@/components/ui/card';
import type { WeatherData } from '@/lib/types';
import { WeatherIcon } from './weather-icon';
import { Button } from '../ui/button';
import { format } from 'date-fns';
import { MapPin, Cloud } from 'lucide-react';

interface CurrentWeatherProps {
  data: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <Card className="bg-card p-6">
      <CardContent className="p-0">
        <div className="flex justify-between items-start">
            <div>
                 <Button variant="secondary" size="sm" className="bg-primary/20 text-primary hover:bg-primary/30">
                    <MapPin className="mr-2 h-4 w-4" />
                    {data.city}
                 </Button>
                 <p className="text-lg mt-4">{format(new Date(), 'eeee')}</p>
                 <p className="text-sm text-muted-foreground">{format(new Date(), 'd MMM, yyyy')}</p>
                 <p className="text-5xl font-bold mt-4">{Math.round(data.current.temp)}°C</p>
                 <p className="text-sm text-muted-foreground">High: {Math.round(data.daily[0].temp.max)}° Low: {Math.round(data.daily[0].temp.min)}°</p>

            </div>
            <div className="flex flex-col items-center">
                 <WeatherIcon
                    iconCode={data.current.icon}
                    className="w-32 h-32 text-primary drop-shadow-lg"
                    />
                <p className="text-lg font-semibold capitalize">{data.current.description}</p>
                <p className="text-sm text-muted-foreground">Feels Like {Math.round(data.current.feels_like)}°</p>
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
