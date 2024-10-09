import React from 'react'
import Spinner from './Spinner';
import JobListing from './JobListing'
import { useState, useEffect } from 'react';

const JobListings = ({ isHome = false }) => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {

            const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';

            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setJobs(data);
            } catch (error) {
                console.log('Error Fetching Data', error);
            } finally {
                setLoading(false);
            }


        }

        fetchJobs();

    }, [])

    return (
        <>
            <section className="bg-blue-50 px-4 py-10">
                <div className="container-xl lg:container m-auto">
                    <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                        {isHome ? 'Recent Jobs' : 'Browse Jobs'}
                    </h2>


                    {loading ? (
                        <>
                            <Spinner loading={loading} />
                        </>
                        // <h2>Loading...</h2>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {jobs.map((job) => (
                                    <JobListing key={job.id} job={job} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* {jobs.jobs.map((job) => (
                            <JobListing key={job.id} job = {job}/>
                        ))} */}


                </div>
            </section>
        </>
    )
}

export default JobListings