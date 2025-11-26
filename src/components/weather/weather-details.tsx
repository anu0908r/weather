import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CurrentWeather } from '@/lib/types';
import {
  Droplets,
  Wind,
  Gauge,
  Sunrise,
  Sunset,
  Cloud,
} from 'lucide-react';
import { format } from 'date-fns';

interface WeatherDetailsProps {
  data: CurrentWeather;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.humidity}%`,
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${data.wind_speed.toFixed(1)} m/s`,
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
    },
    {
      icon: Cloud,
      label: 'Cloudiness',
      value: `${data.clouds}%`,
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: format(new Date(data.sunrise * 1000), 'HH:mm'),
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: format(new Date(data.sunset * 1000), 'HH:mm'),
    },
  ];

  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Current Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {details.map((detail) => (
            <div key={detail.label} className="flex items-center gap-3">
              <detail.icon className="w-6 h-6 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">{detail.label}</p>
                <p className="font-semibold">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
