import useFetchGithubJobs from '../hooks/jobs';

export default function Jobs(){

    const jobs = useFetchGithubJobs();
    console.log(jobs);

    return(
        <div>{jobs && jobs.map(job => {
            <p>{job.title}</p>
            console.log(job.title);
        })}</div>
    )
}