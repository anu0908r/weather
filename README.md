# 🌤️ Weather App - MERN Stack (MongoDB + Next.js)

A modern, full-stack weather application built with **MongoDB, Express (Next.js API), React, and Node.js**.

## 🚀 Features

### Core Functionality
- ✅ Real-time weather data from Open-Meteo API (free, no API key needed)
- ✅ 24-hour hourly forecast
- ✅ 7-day weather forecast  
- ✅ City search with autocomplete suggestions
- ✅ Geolocation support (auto-detect your location)
- ✅ Temperature unit toggle (Celsius/Fahrenheit)
- ✅ AI-generated weather backgrounds (Google Gemini)

### MERN Stack Features
- ✅ **MongoDB** - User data, search history, favorites
- ✅ **Express-like API** - Next.js Server Actions
- ✅ **React** - Modern UI with TypeScript
- ✅ **Node.js** - Server-side rendering & API

### User Features
- ✅ User registration & authentication
- ✅ Secure password hashing (bcrypt)
- ✅ JWT token-based sessions
- ✅ Search history tracking
- ✅ Favorite cities management
- ✅ User preferences storage

## 📋 Prerequisites

- **Node.js** 18+ installed
- **MongoDB Atlas** account (free tier available)
- **Google Gemini API key** (for AI backgrounds)

## 🛠️ Installation

### 1. Clone & Install

```bash
git clone https://github.com/anu0908r/weather.git
cd weather
npm install
```

### 2. Set Up MongoDB Atlas

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier)
3. Create database user (Database Access)
4. Whitelist IP (Network Access → Allow from Anywhere)
5. Get connection string (Connect → Connect your application)

### 3. Configure Environment Variables

Create `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/weather-app

# JWT Secret (32+ characters)
JWT_SECRET=your-super-secret-jwt-key-change-this

# Google Gemini API Key
GOOGLE_API_KEY=your_google_gemini_api_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002)

## 📱 Usage

1. **Register**: Go to `/register` to create account
2. **Search**: Type city name with autocomplete
3. **Location**: Click navigation icon for auto-detect
4. **Temperature**: Toggle °C/°F in header
5. **History**: View past searches in History page

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (app)/              # Protected routes
│   │   ├── dashboard/      # Weather dashboard
│   │   ├── history/        # Search history
│   │   └── profile/        # User profile
│   ├── (auth)/             # Auth routes
│   │   ├── login/          # Login
│   │   └── register/       # Registration
│   └── actions/            # Server Actions (API)
│       ├── auth.actions.ts
│       ├── user.actions.ts
│       └── weather.actions.ts
├── components/             # React components
├── lib/                    # Utilities
│   ├── mongodb.ts          # DB connection
│   └── auth-utils.ts       # Auth helpers
└── models/                 # Mongoose schemas
    ├── User.ts
    └── SearchHistory.ts
```

## 🗄️ Database Schema

### User
- email (unique)
- password (hashed)
- displayName
- favoriteCities[]
- temperatureUnit
- timestamps

### SearchHistory
- userId (ref: User)
- city
- country
- searchedAt

## 🔒 Security

- ✅ bcrypt password hashing
- ✅ JWT authentication
- ✅ HTTP-only cookies
- ✅ Server-side validation
- ✅ Protected routes

## 🧪 Tech Stack

**Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
**Backend:** Next.js Server Actions, MongoDB, Mongoose
**APIs:** Open-Meteo (weather), Google Gemini (AI backgrounds)

## 📊 API Endpoints

### Auth
- `signInWithEmail()` - Login
- `signUpWithEmail()` - Register
- `signOut()` - Logout

### Weather
- `getWeatherForCity(city)` - Get weather
- `searchCities(query)` - Autocomplete

### User
- `saveSearchHistory(city)` - Save search
- `getSearchHistory()` - Get history
- `addFavoriteCity(city)` - Add favorite
- `getFavoriteCities()` - Get favorites

## 🚀 Deployment

### Vercel
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

## 👤 Author

**Ananya** - [@anu0908r](https://github.com/anu0908r)

## 👥 Contributors


