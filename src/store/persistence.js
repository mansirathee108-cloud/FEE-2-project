const STORAGE_KEY = 'cityData';

export function loadCityData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      submissions: Array.isArray(stored.submissions) ? stored.submissions : [],
      panicActive: Boolean(stored.panicActive),
    };
  } catch {
    return { submissions: [], panicActive: false };
  }
}

export function persistCityData(cityData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cityData));
  } catch {
    // Keep the in-memory Redux state usable when browser storage is unavailable.
  }
}
