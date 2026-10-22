import { useEffect, useState } from 'react';

const ENDPOINTS = ['/api/osm/query', '/api/osm/fallback'];
const CACHE_KEY = 'rajpuraRestaurantListings';
const SUGGESTED_RESTAURANTS = ['Greggs', 'McNeuros', 'McCrelly', "Vedal's rum factory"];

function makeSuggestions() {
  return SUGGESTED_RESTAURANTS.map((name) => ({
    id: `suggestion/${name.toLowerCase().replaceAll(' ', '-')}`,
    name,
    cuisine: null,
    street: null,
    lat: null,
    lon: null,
    source: 'suggestion',
  }));
}

function readCachedRestaurants() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (Array.isArray(cached)) {
      return cached.filter(
        (restaurant) =>
          restaurant &&
          typeof restaurant.id === 'string' &&
          typeof restaurant.name === 'string' &&
          restaurant.source === 'openstreetmap',
      );
    }
  } catch {
    // Continue with the predefined suggestions when storage is unavailable.
  }
  return [];
}

function shuffleRestaurants(restaurants) {
  const shuffled = [...restaurants];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

async function queryOverpass(query, signal) {
  let lastError;
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(`${url}?data=${encodeURIComponent(query)}`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
      return await res.json();
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      lastError = err;
    }
  }
  throw lastError;
}

export default function useRajpuraRestaurants() {
  const [restaurants, setRestaurants] = useState(makeSuggestions);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const cachedRestaurants = readCachedRestaurants();
    if (cachedRestaurants.length > 0) {
      setRestaurants(shuffleRestaurants([...cachedRestaurants, ...makeSuggestions()]));
    }

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const query = `
          [out:json][timeout:20];
          area["name"="Rajpura"]["boundary"="administrative"]->.rajpura;
          nwr["amenity"="restaurant"](area.rajpura);
          out center tags;
        `;
        const data = await queryOverpass(query, controller.signal);

        const mappedRestaurants = (data.elements || []).map((el) => ({
          id: `${el.type}/${el.id}`,
          name: el.tags?.name ?? 'Unnamed restaurant',
          cuisine: el.tags?.cuisine ?? null,
          street: el.tags?.['addr:street'] ?? null,
          phone: el.tags?.phone ?? null,
          lat: el.lat ?? el.center?.lat,
          lon: el.lon ?? el.center?.lon,
          source: 'openstreetmap',
        }));
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(mappedRestaurants));
        } catch {
          // The current results remain usable when storage is unavailable.
        }

        setRestaurants(shuffleRestaurants([...mappedRestaurants, ...makeSuggestions()]));
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { restaurants, error, loading };
}
