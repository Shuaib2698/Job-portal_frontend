import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../utils/api';

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await API.get('/applications/me');
        setApplications(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Job Applications</h1>
      
      {applications.length === 0 ? (
        <p className="text-gray-500">You haven't applied to any jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">{app.job?.title}</h3>
                  <p className="text-sm text-gray-500">
                    {app.job?.recruiter?.companyName} • {app.job?.location}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
              </div>
              <p className="mt-2 text-sm">Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;