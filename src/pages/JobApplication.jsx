import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const JobApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    resume: "",
    coverLetter: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setApplication({
      ...application,
      [e.target.name]: e.target.value
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await API.post(`/applications/jobs/${jobId}/apply`, application);
      setStatus("Application submitted successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setStatus(err.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="container mx-auto p-5 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
      <form onSubmit={handleApply} className="space-y-4">
        <input
          name="resume"
          type="text"
          placeholder="Resume URL"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          rows="5"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Submit Application
        </button>
        {status && (
          <p className={`mt-2 ${status.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default JobApplication;