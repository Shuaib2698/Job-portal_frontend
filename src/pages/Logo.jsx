import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="text-3xl font-extrabold text-gray-900 flex items-center space-x-1">
      <span>JobPortal</span>
      <sup className="text-blue-600 font-semibold text-sm -ml-1">AI</sup>
    </Link>
  );
};

export default Logo;
