import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";
import API from "../utils/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", formData);
      dispatch(loginSuccess(data));
      
      if (data.user.role === "admin") navigate("/admin/dashboard");
      else if (data.user.role === "recruiter") navigate("/recruiter/dashboard");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    // In your handleLogin function:
    if (data.user.role === "admin") {
      navigate("/admin/dashboard");
      }else if (data.user.role === "recruiter") {
        navigate("/recruiter/dashboard"); 
      } else {
        navigate("/dashboard");
      }


  };

  return (
    <div className="flex h-screen bg-blue-50">
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-3xl font-bold mb-6">JobPortal<sup>AI</sup></h1>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-4">
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
          <button className="w-full bg-black text-white p-2 rounded">Login</button>
        </form>
        
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">Register here</Link>
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

export default Login;