import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { WeatherIcon } from './weather-icon';

const otherCitiesData = [
  { city: 'London', temp: 14, high: 23, low: 10, icon: '02d' },
  { city: 'Tokyo', temp: 27, high: 32, low: 24, icon: '01d' },
  { city: 'New York', temp: 16, high: 21, low: 12, icon: '01d' },
  { city: 'Paris', temp: 26, high: 29, low: 18, icon: '02d' },
];

interface OtherCitiesProps {
    onCityClick: (city: string) => void;
}

export function OtherCities({ onCityClick }: OtherCitiesProps) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Other Cities</CardTitle>
        <Button variant="link" className="pr-0">Show All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {otherCitiesData.map((cityData) => (
          <button 
            key={cityData.city} 
            className="flex items-center justify-between p-2 bg-background/50 rounded-lg text-left hover:bg-background/80 transition-colors"
            onClick={() => onCityClick(cityData.city)}
          >
            <div>
              <p className="font-semibold">{cityData.temp}°</p>
              <p className="text-xs text-muted-foreground">H:{cityData.high}° L:{cityData.low}°</p>
              <p className="text-sm">{cityData.city}</p>
            </div>
            <WeatherIcon iconCode={cityData.icon} className="w-10 h-10 text-primary" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
