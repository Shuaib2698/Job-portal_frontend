import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalJobs: 0,
    applications: 0,
    activeJobs: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await API.get('/jobs/recruiter/me');
        setJobs(jobsRes.data.slice(0, 3));
        
        const statsRes = await API.get('/applications/recruiter/stats');
        setStats(statsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Jobs</h3>
          <p className="text-2xl font-bold">{stats.totalJobs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Active Jobs</h3>
          <p className="text-2xl font-bold">{stats.activeJobs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Applications</h3>
          <p className="text-2xl font-bold">{stats.applications}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Job Postings</h2>
          <Link to="/post-job" className="text-blue-600 hover:underline">Post New Job</Link>
        </div>
        
        {jobs.length > 0 ? (
          <div className="space-y-3">
            {jobs.map(job => (
              <div key={job._id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between">
                  <h3 className="font-medium">{job.title}</h3>
                  <span className="text-sm text-gray-500">{job.applications} applications</span>
                </div>
                <p className="text-sm text-gray-500">{job.location} • ₹{job.salary}/month</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven't posted any jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecruiterDashboard;