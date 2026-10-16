import useFetchJobs from '../hooks/jobs.js';
import styles from './Jobs.module.css';

export default function Jobs() {
  const { jobs, loading, error } = useFetchJobs();

  return (
    <main className={styles.page}>
      <h1>Remote jobs</h1>
      {loading && <p role="status">Loading job listings...</p>}
      {error && <p role="alert">Job listings are unavailable: {error}</p>}
      {!loading && !error && jobs.length === 0 && <p>No job listings are available right now.</p>}
      <ul className={styles.list}>
        {jobs.map((job) => (
          <li className={styles.item} key={job.id ?? job.url ?? `${job.title}-${job.company_name}`}>
            <h2>
              <a href={job.url} target="_blank" rel="noreferrer">
                {job.title}
              </a>
            </h2>
            <p>{job.company_name}</p>
            {job.candidate_required_location && <p>{job.candidate_required_location}</p>}
          </li>
        ))}
      </ul>
    </main>
  );
}
