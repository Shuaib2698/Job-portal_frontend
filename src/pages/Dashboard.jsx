import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate("/login");

    const fetchData = async () => {
      try {
        if (user.role === "recruiter") {
          const { data } = await API.get("/jobs/recruiter/me");
          setJobs(data);
        } else {
          const { data } = await API.get("/applications/me");
          setApplications(data);
          const jobsRes = await API.get("/jobs");
          setJobs(jobsRes.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-6 px-10">
        <h1 className="text-3xl font-bold">
          Welcome {user?.name || "User"}!
        </h1>
        <p className="text-sm mt-1">
          {user?.role === "recruiter" 
            ? "Manage your job postings and applications" 
            : "Find the best job opportunities tailored for you"}
        </p>
      </header>

      <div className="flex">
        <aside className="w-64 p-6 bg-white border-r hidden lg:block">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <ul className="space-y-2">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/post-job" className="text-blue-600 hover:underline">
                    Post New Job
                  </Link>
                </li>
                <li>
                  <Link to="/recruiter/jobs" className="text-blue-600 hover:underline">
                    My Job Postings
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/joblistings" className="text-blue-600 hover:underline">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/applications/me" className="text-blue-600 hover:underline">
                    My Applications
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>

        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.role === "recruiter" ? "Your Job Postings" : "Recommended Jobs"}
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl border p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-500">
                      {job.recruiter?.companyName || "Company"} · {job.location}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{job.jobType}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">{job.category}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end mt-4 sm:mt-0">
                    <span className="text-blue-600 font-semibold text-sm mb-1">
                      ₹{job.salary.toLocaleString()} / month
                    </span>
                    <Link
                      to={`/jobs/${job._id}/apply`}
                      className="bg-black text-white px-4 py-1.5 rounded-md text-sm mt-2"
                    >
                      {user?.role === "recruiter" ? "View Applications" : "Apply now"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;