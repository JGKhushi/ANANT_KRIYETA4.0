import { useState } from "react"
import {
  LuUser,
  LuUsers,
  LuList,
  LuBell,
  LuLogOut,
  LuMenu,
  LuX,
} from "react-icons/lu"

import AccountSection from "../components/sections/ngo/AccountSection"
import DonorsSection from "../components/sections/ngo/DonorsSection"
import DonationsSection from "../components/sections/ngo/DonationsSection"
import NotificationsSection from "../components/sections/ngo/NotificationsSection"

export default function NGODashboard() {
  // Main navigation state
  const [activeSection, setActiveSection] = useState("account")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Render the appropriate section based on activeSection state
  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return <AccountSection />
      case "donors":
        return <DonorsSection />
      case "donations":
        return <DonationsSection />
      case "notifications":
        return <NotificationsSection />
      default:
        return <AccountSection />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-gray-200 rounded-md"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-20 h-screen w-64 bg-gray-200 transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-bold text-green-600">NGO Dashboard</h2>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    setActiveSection("account")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-300 transition-colors ${
                    activeSection === "account" ? "bg-green-500 text-white hover:bg-green-600" : ""
                  }`}
                >
                  <span className="mr-3">
                    <LuUser className="w-5 h-5" />
                  </span>
                  Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection("donations")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-300 transition-colors ${
                    activeSection === "donations" ? "bg-green-500 text-white hover:bg-green-600" : ""
                  }`}
                >
                  <span className="mr-3">
                    <LuList className="w-5 h-5" />
                  </span>
                  Donation List
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection("donors")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-300 transition-colors ${
                    activeSection === "donors" ? "bg-green-500 text-white hover:bg-green-600" : ""
                  }`}
                >
                  <span className="mr-3">
                    <LuUsers className="w-5 h-5" />
                  </span>
                  Donors
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection("notifications")
                    setIsMobileMenuOpen(false)
                  }}
                  className={`flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-300 transition-colors ${
                    activeSection === "notifications" ? "bg-green-500 text-white hover:bg-green-600" : ""
                  }`}
                >
                  <span className="mr-3">
                    <LuBell className="w-5 h-5" />
                  </span>
                  Notifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token")
                    localStorage.removeItem("role")
                    window.location.href = "/login"
                  }}
                  className="flex items-center w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <span className="mr-3">
                    <LuLogOut className="w-5 h-5" />
                  </span>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 ml-0">{renderSection()}</main>
    </div>
  )
}


// Notifications Section Component

