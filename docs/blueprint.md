# **App Name**: WeatherWise

## Core Features:

- User Authentication: Secure email/password and Google Sign-In with Firebase Authentication. User profiles stored in Firestore.
- Weather Data Fetching: Secure Firebase Cloud Function to fetch weather data from OpenWeatherMap API.
- Realtime Weather Dashboard: Display current weather conditions for searched city (temperature, humidity, wind speed, pressure, sunrise, sunset, cloudiness) with dynamic backgrounds.
- Weather Forecast: Show 5-day weather forecast using interactive charts and cards.
- Data Caching: Cache weather API responses in Firestore to reduce API calls and improve performance.
- Location History: Save the locations the user searched for.
- AI Background selector: An AI tool to dynamically adjusts the background based on weather conditions using generative AI. Weather patterns and keywords will influence the selection.

## Style Guidelines:

- Primary color: Sky blue (#63B5FF) to evoke a sense of openness and clarity, reflective of the sky.
- Background color: Very light blue (#EAF4FC), almost white, to maintain a clean and airy feel, aligning with the light scheme.
- Accent color: Soft teal (#46B1BF) to highlight interactive elements and calls to action, providing a harmonious contrast.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern and neutral look.
- Use a set of animated, weather-themed icons.
- Card-based layout for a clean and organized presentation.
- Subtle fade and slide transitions when updating weather data.