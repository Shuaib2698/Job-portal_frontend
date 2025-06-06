import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
    companyName: "",
    position: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === "recruiter" && {
          companyName: formData.companyName,
          position: formData.position
        })
      });

      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-3xl font-bold mb-6">JobPortal<sup>AI</sup></h1>
        <h2 className="text-xl font-semibold mb-4">Get started for free</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="w-full border p-2 rounded"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
          
          {formData.role === "recruiter" && (
            <>
              <input
                name="companyName"
                type="text"
                placeholder="Company Name"
                className="w-full border p-2 rounded"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
              <input
                name="position"
                type="text"
                placeholder="Your Position"
                className="w-full border p-2 rounded"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </>
          )}
          
          <button className="w-full bg-black text-white p-2 rounded">Create account</button>
        </form>
        
        <p className="text-xs mt-4 text-gray-500">
          By signing up, you agree to our{" "}
          <span className="underline">Terms of service</span> and{" "}
          <span className="underline">Privacy policies</span>.
        </p>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">Sign in</Link>
        </p>
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center px-16 border-l">
        <blockquote className="text-2xl italic text-gray-700 mb-6">
          "Your next job could be one email away."
        </blockquote>
        <h3 className="text-lg font-semibold mb-2">3 easy steps to get started</h3>
        <ul className="text-sm space-y-3">
          <li><strong>1.</strong> Create your free Jobportal<sup>AI</sup> account in seconds.</li>
          <li><strong>2.</strong> Choose the job roles or fields you care about.</li>
          <li><strong>3.</strong> Receive personalized job updates weekly.</li>
        </ul>
      </div>
    </div>
  );
};

export default Register;