

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { mockWeatherData } from '@/lib/mock-data';

const otherCitiesData = Object.values(mockWeatherData).slice(0, 4);

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
              <p className="font-semibold">{Math.round(cityData.current.temp)}°</p>
              <p className="text-xs text-muted-foreground">H:{Math.round(cityData.daily[0].temp.max)}° L:{Math.round(cityData.daily[0].temp.min)}°</p>
              <p className="text-sm">{cityData.city}</p>
            </div>
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
