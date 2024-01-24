import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          Your Website
        </Link>
        <div className="space-x-4">
          <Link to="/register" className="text-white hover:text-gray-300">
            Register
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
