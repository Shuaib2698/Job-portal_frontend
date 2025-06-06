import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await API.get("/jobs");
        setJobs(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center py-10">Loading jobs...</div>;
  if (error) return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center">
        Discover Jobs You'll Love
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200 relative"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-800">
                {job.title?.charAt(0)}
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-1">
              {job.recruiter?.companyName || "Company"} · {new Date(job.createdAt).toLocaleDateString()}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">{job.title}</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {job.jobType}
              </span>
              <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                {job.category}
              </span>
            </div>

            <div className="text-sm text-gray-800 font-semibold mb-1">
              ₹{job.salary.toLocaleString()} / month
            </div>
            <p className="text-xs text-gray-500 mb-4">{job.location}</p>

            <Link 
              to={`/jobs/${job._id}/apply`}
              className="absolute bottom-6 right-6 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-900 transition-all"
            >
              Apply now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;