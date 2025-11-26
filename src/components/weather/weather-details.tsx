import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CurrentWeather } from '@/lib/types';
import {
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  View,
} from 'lucide-react';
import { format } from 'date-fns';

interface WeatherDetailsProps {
  data: CurrentWeather;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Today Highlight</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground mb-2">UV Index</p>
            <div className="w-24 h-24 rounded-full border-8 border-primary flex items-center justify-center text-2xl font-bold mx-auto">
                UV
            </div>
        </Card>
         <Card className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground mb-2">Wind Status</p>
             <p className="text-3xl font-bold">{data.wind_speed.toFixed(1)}<span className="text-lg">m/s</span></p>
            <Wind className="w-8 h-8 text-muted-foreground mt-2" />
        </Card>
         <Card className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground mb-2">Sunrise & Sunset</p>
            <div className="flex items-center gap-2">
                <Sunrise className="w-8 h-8 text-amber-400" />
                <div>
                    <p className="font-semibold">{format(new Date(data.sunrise * 1000), 'HH:mm')}</p>
                    <p className="text-xs text-muted-foreground">Sunrise</p>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
                <Sunset className="w-8 h-8 text-amber-600" />
                <div>
                    <p className="font-semibold">{format(new Date(data.sunset * 1000), 'HH:mm')}</p>
                    <p className="text-xs text-muted-foreground">Sunset</p>
                </div>
            </div>
        </Card>
        <Card className="p-4 bg-background/50">
            <p className="text-sm text-muted-foreground mb-2">Humidity</p>
            <p className="text-3xl font-bold">{data.humidity}<span className="text-lg">%</span></p>
            <Droplets className="w-8 h-8 text-muted-foreground mt-2" />
        </Card>
      </CardContent>
    </Card>
  );
}
