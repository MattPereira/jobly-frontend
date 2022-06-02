import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import JobCardList from "./JobCardList";
import UserContext from "../auth/UserContext";

/**Show page with all jobs user has applied to listed
 *
 * On component mount, load all jobs from API
 * and filter against the current user's job application ids.
 *
 * This is routed to path "/applications"
 *
 * Routes -> {JobCard, SearchForm}
 */

const AppliedJobList = () => {
  console.debug("AppliedJobList");

  const { currentUser } = useContext(UserContext);

  const [jobs, setJobs] = useState(null);

  /* On component mount, load all jobs from API */
  useEffect(function getJobsOnMount() {
    console.debug("JobList useEffect getJobsOnMount");
    async function fetchJobs() {
      let jobs = await JoblyApi.getJobs();

      const appliedToJobs = jobs.filter((job) =>
        currentUser.applications.includes(job.id)
      );
      setJobs(appliedToJobs);
    }

    fetchJobs();
  }, []);

  console.log("CURRENT USER APPLICATIONS", currentUser.applications);

  if (!jobs) return <LoadingSpinner />;

  return (
    <div className="row justify-content-center">
      <h3 className="text-center mb-5">
        Outstanding Job Applications for {currentUser.username}
      </h3>
      <div className="col-md-8">
        {jobs.length ? (
          <JobCardList jobs={jobs} />
        ) : (
          <p>No jobs applied to yet!</p>
        )}
      </div>
    </div>
  );
};

export default AppliedJobList;
