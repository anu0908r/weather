import { Card, CardContent } from '@/components/ui/card';
import type { WeatherData } from '@/lib/types';
import { WeatherIcon } from './weather-icon';

interface CurrentWeatherProps {
  data: WeatherData;
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <Card className="flex flex-col items-center justify-center text-center p-6 bg-card/80 backdrop-blur-sm h-full">
      <CardContent className="flex flex-col items-center justify-center p-0">
        <h2 className="text-3xl font-bold">{data.city}</h2>
        <WeatherIcon
          iconCode={data.current.icon}
          className="w-32 h-32 my-4 text-primary drop-shadow-lg"
        />
        <p className="text-7xl font-bold">{Math.round(data.current.temp)}°</p>
        <p className="text-lg text-muted-foreground capitalize">
          {data.current.description}
        </p>
        <p className="text-sm text-muted-foreground">
          Feels like {Math.round(data.current.feels_like)}°
        </p>
      </CardContent>
    </Card>
  );
}
