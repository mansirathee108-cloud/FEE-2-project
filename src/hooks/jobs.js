import { useEffect, useState } from 'react';

export default function useFetchJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getJobs() {
      try {
        const response = await fetch('https://remotive.com/api/remote-jobs', {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setJobs(Array.isArray(data.jobs) ? data.jobs : []);
      } catch (error) {
        if (error.name !== 'AbortError') setError(error.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    getJobs();
    return () => controller.abort();
  }, []);

  return { jobs, loading, error };
}
