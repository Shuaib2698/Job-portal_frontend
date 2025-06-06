import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const PostJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobType: "full-time",
    category: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await API.post("/jobs", job);
      alert("Job posted successfully!");
      navigate("/joblistings");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Job Title"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          name="salary"
          type="number"
          placeholder="Salary"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <select
          name="jobType"
          className="w-full p-2 border rounded"
          value={job.jobType}
          onChange={handleChange}
          required
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
        <input
          name="category"
          type="text"
          placeholder="Category (e.g., Software Development)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;