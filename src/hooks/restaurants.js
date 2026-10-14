import { useEffect, useState } from "react";

const ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

async function queryOverpass(query, signal) {
  let lastError;
  for (const url of ENDPOINTS) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "data=" + encodeURIComponent(query),
        signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
      return await res.json();
    } catch (err) {
      if (err.name === "AbortError") throw err;
      lastError = err;
    }
  }
  throw lastError;
}

export default function useNearbyRestaurants(lat, lon, radiusMeters = 1500) {
  const [restaurants, setRestaurants] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const controller = new AbortController();

    async function load() {
      try {
        setError(null);
        const query = `
          [out:json][timeout:25];
          nwr["amenity"="restaurant"](around:${radiusMeters},${lat},${lon});
          out center tags;
        `;
        const data = await queryOverpass(query, controller.signal);

        setRestaurants(
          data.elements.map((el) => ({
            id: `${el.type}/${el.id}`,
            name: el.tags?.name ?? "Unnamed restaurant",
            cuisine: el.tags?.cuisine ?? null,
            street: el.tags?.["addr:street"] ?? null,
            phone: el.tags?.phone ?? null,
            lat: el.lat ?? el.center?.lat,
            lon: el.lon ?? el.center?.lon,
          }))
        );
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    }

    load();
    return () => controller.abort();
  }, [lat, lon, radiusMeters]);

  return { restaurants, error };
}