import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Tornado,
  CloudFog,
  CloudDrizzle,
  type LucideProps,
} from 'lucide-react';

interface WeatherIconProps extends LucideProps {
  iconCode: string;
}

export function WeatherIcon({ iconCode, ...props }: WeatherIconProps) {
  const iconMapping: { [key: string]: React.ElementType } = {
    '01': Sun, // clear sky
    '02': Cloud, // few clouds
    '03': Cloud, // scattered clouds
    '04': Cloud, // broken clouds
    '09': CloudDrizzle, // shower rain
    '10': CloudRain, // rain
    '11': CloudLightning, // thunderstorm
    '13': CloudSnow, // snow
    '50': CloudFog, // mist
  };

  const IconComponent = iconMapping[iconCode.slice(0, 2)] || Wind;

  return <IconComponent {...props} />;
}
