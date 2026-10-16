import { useEffect, useState } from 'react';

const ENDPOINTS = ['/api/osm/query', '/api/osm/fallback'];

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

export default function useNearbyRestaurants(location, radiusMeters = 3000) {
  const lat = location?.lat;
  const lon = location?.lon;
  const [restaurants, setRestaurants] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      setRestaurants(null);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        setRestaurants(null);
        const query = `
          [out:json][timeout:20];
          nwr["amenity"="restaurant"](around:${radiusMeters},${lat},${lon});
          out center tags 100;
        `;
        const data = await queryOverpass(query, controller.signal);

        setRestaurants(
          data.elements.map((el) => ({
            id: `${el.type}/${el.id}`,
            name: el.tags?.name ?? 'Unnamed restaurant',
            cuisine: el.tags?.cuisine ?? null,
            street: el.tags?.['addr:street'] ?? null,
            phone: el.tags?.phone ?? null,
            lat: el.lat ?? el.center?.lat,
            lon: el.lon ?? el.center?.lon,
          })),
        );
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [lat, lon, radiusMeters]);

  return { restaurants, error, loading };
}
