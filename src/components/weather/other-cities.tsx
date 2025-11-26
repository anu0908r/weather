import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { WeatherIcon } from './weather-icon';

const otherCitiesData = [
  { city: 'USA', temp: 14, high: 23, low: 10, icon: '02d' },
  { city: 'Dubai - UAE', temp: 27, high: 23, low: 10, icon: '01d' },
  { city: 'China Nuevo', temp: 16, high: 23, low: 10, icon: '01d' },
  { city: 'Canada', temp: 26, high: 23, low: 10, icon: '02d' },
];

export function OtherCities() {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Other Cities</CardTitle>
        <Button variant="link" className="pr-0">Show All</Button>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {otherCitiesData.map((cityData) => (
          <div key={cityData.city} className="flex items-center justify-between p-2 bg-background rounded-lg">
            <div>
              <p className="font-semibold">{cityData.temp}°</p>
              <p className="text-xs text-muted-foreground">H:{cityData.high}° L:{cityData.low}°</p>
              <p className="text-sm">{cityData.city}</p>
            </div>
            <WeatherIcon iconCode={cityData.icon} className="w-10 h-10 text-primary" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
