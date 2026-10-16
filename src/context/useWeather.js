import { useContext } from 'react';
import { WeatherContext } from './weatherContext.js';

export default function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used inside WeatherProvider.');
  return context;
}
