import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import JobListings from "./pages/JobListings";
import JobApplication from "./pages/JobApplication";
import PostJob from "./pages/PostJob";
import AppliedJobs from "./components/AppliedJobs";
import RecruiterDashboard from "./components/RecruiterDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        
        <Route path="/recruiter/dashboard" element={
          <PrivateRoute allowedRoles={['recruiter']}>
            <RecruiterDashboard />
          </PrivateRoute>
        } />
        
        <Route path="/joblistings" element={
          <PrivateRoute>
            <JobListings />
          </PrivateRoute>
        } />
        
        <Route path="/post-job" element={
          <PrivateRoute allowedRoles={['recruiter']}>
            <PostJob />
          </PrivateRoute>
        } />
        
        <Route path="/jobs/:jobId/apply" element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <JobApplication />
          </PrivateRoute>
        } />
        
        <Route path="/applied-jobs" element={
          <PrivateRoute allowedRoles={['jobseeker']}>
            <AppliedJobs />
          </PrivateRoute>
        } />

        <Route path="/admin/dashboard" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        
    
      </Routes>
    </Router>
  );
}

export default App;