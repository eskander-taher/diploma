import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Website</h1>
        <p className="text-gray-600 mb-8">
          Start your journey with us. Sign up for an account or log in if you already have one.
        </p>
        <div className="flex space-x-4">
          <Link
            to="/register"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-800"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
