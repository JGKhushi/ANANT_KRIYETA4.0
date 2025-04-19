import ZeroBiteLogo from "../shared/ZeroBiteLogo";
import { Link } from "react-router";


export default function Navbar() {
  const isLoggedIn = localStorage.getItem("token") !== null;
  const user = JSON.parse(localStorage.getItem("user"));

  return <header className="flex items-center max-w-7xl mx-auto justify-between py-4 px-4 md:px-8 shadow-[0_6px_3px_-3px_rgba(0,0,0,0.1)]">

    <ZeroBiteLogo />

    <nav className="hidden md:flex items-center space-x-8">
      <a href="/" className="text-[#FF5733] font-lg">
        Home
      </a>
      <a href="#about" className="text-gray-600 font-lg">
        About Us
      </a>
      <a href="#features" className="text-gray-600 font-lg">
        Features
      </a>
      <a href="#guide" className="text-gray-600 font-lg">
        Guide
      </a>

      <a href="#faqs" className="text-gray-600 font-lg">
        FAQs
      </a>
    </nav>

    {isLoggedIn ? (
      <Link to={user.role === "NGO" ? "/ngodashboard" : "/dashboard"}>
        <button className="px-4 py-2 rounded-full bg-orange-500 text-white cursor-pointer">Dashboard</button>
      </Link>
    ) : (
      <Link to="/login">
        <button className="px-8 py-2 rounded-full bg-orange-500 text-white cursor-pointer">Login</button>
      </Link>
    )}
  </header>
}