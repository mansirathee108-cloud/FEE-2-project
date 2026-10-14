import { useEffect, useState } from "react";

export default function useFetchJobs() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function getJobs() {
      try {
        const response = await fetch("https://remotive.com/api/remote-jobs");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("API", data);
        setJobs(data.jobs);
      } catch (error) {
        console.error(error);
      }
    }

    getJobs();
  }, []);

  return jobs;
}