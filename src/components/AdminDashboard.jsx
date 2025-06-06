import { useEffect, useState } from 'react';
import API from '../utils/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    applications: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Jobs</h3>
          <p className="text-2xl font-bold">{stats.jobs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-gray-500">Total Applications</h3>
          <p className="text-2xl font-bold">{stats.applications}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Manage Users
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            View All Jobs
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;