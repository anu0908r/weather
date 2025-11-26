'use client';

import React, { createContext, useState, useContext, useMemo } from 'react';

interface BackgroundContextType {
  backgroundImage: string;
  setBackgroundImage: (url: string) => void;
  isBgLoading: boolean;
  setIsBgLoading: (loading: boolean) => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined
);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isBgLoading, setIsBgLoading] = useState(false);

  const value = useMemo(
    () => ({
      backgroundImage,
      setBackgroundImage,
      isBgLoading,
      setIsBgLoading,
    }),
    [backgroundImage, isBgLoading]
  );

  return (
    <BackgroundContext.Provider value={value}>
      {children}
    </BackgroundContext.Provider>
  );
}

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};
