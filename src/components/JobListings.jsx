import React from "react";
import JobListing from "./JobListing";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://backend-4gjj.onrender.com";

  useEffect(() => {
    const fetchJobs = async () => {
      const api_url = isHome
        ? `${API_URL}/api/jobs?_limit=3`
        : `${API_URL}/api/jobs`;
      try {
        const res = await fetch(api_url);
        const data = await res.json();
        console.log("Fetched data:", data); // Debugging log

        // Ensure data.jobs is an array before calling map
        if (data && Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          console.error("Data is not in expected format", data);
          setJobs([]); // Set jobs to an empty array to avoid map error
        }
      } catch (error) {
        console.log("Error fetching data", error);
        setJobs([]); // Set jobs to an empty array to avoid map error
      } finally {
        // Ensure the spinner shows for at least 1 second
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }
    };
    fetchJobs();
  }, [isHome]);

  return (
    <div>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>

          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListings;
