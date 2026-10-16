import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { WeatherContext } from './weatherContext.js';

const API_KEY = 'b25b86ff5f31ee72f5c323f68ffa0ac2';

export function WeatherProvider({ children }) {
  const coordinates = useSelector((state) => state.location.coordinates);
  const [weatherState, setWeatherState] = useState({ weather: null, status: 'idle', error: null });

  useEffect(() => {
    if (!coordinates) return;

    const controller = new AbortController();
    async function loadWeather() {
      setWeatherState({ weather: null, status: 'loading', error: null });
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${API_KEY}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error('Weather is currently unavailable.');

        const data = await response.json();
        if (!data.weather?.[0] || !data.main) throw new Error('Weather data was incomplete.');

        setWeatherState({
          weather: {
            city: data.name,
            condition: data.weather[0].main,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            temperatureC: Math.trunc(data.main.temp),
            humidity: data.main.humidity,
            windKph: Math.round((data.wind?.speed ?? 0) * 3.6),
            visibilityKm: data.visibility == null ? null : data.visibility / 1000,
          },
          status: 'succeeded',
          error: null,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setWeatherState({ weather: null, status: 'failed', error: error.message });
        }
      }
    }

    loadWeather();
    return () => controller.abort();
  }, [coordinates]);

  return <WeatherContext.Provider value={weatherState}>{children}</WeatherContext.Provider>;
}
