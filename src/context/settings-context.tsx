'use client';

import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit';

interface SettingsContextType {
  temperatureUnit: TemperatureUnit;
  toggleTemperatureUnit: () => void;
  convertTemp: (temp: number) => number;
  getUnitSymbol: () => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('temperatureUnit');
    if (saved === 'fahrenheit' || saved === 'celsius') {
      setTemperatureUnit(saved);
    }
  }, []);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => {
      const newUnit = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      localStorage.setItem('temperatureUnit', newUnit);
      return newUnit;
    });
  };

  const convertTemp = (temp: number) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  const getUnitSymbol = () => {
    return temperatureUnit === 'celsius' ? '°C' : '°F';
  };

  const value = useMemo(
    () => ({
      temperatureUnit,
      toggleTemperatureUnit,
      convertTemp,
      getUnitSymbol,
    }),
    [temperatureUnit]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
