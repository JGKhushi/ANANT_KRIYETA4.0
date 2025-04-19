import { useState } from "react"
import { LuUser, LuCalendar, LuClock, LuHeartHandshake, LuChefHat, LuBookmark, LuBell, LuLogOut } from "react-icons/lu"
import AccountComponent from "../components/dashboard/AccountComponent"
import MealPlanComponent from "../components/dashboard/MealPlanComponent"
import ExpiryTrackComponent from "../components/dashboard/ExpiryTrackComponent"
import DonateComponent from "../components/dashboard/DonateComponent"
import RecipeGeneratorComponent from "../components/dashboard/RecipeGeneratorComponent"
import SavedRecipeComponent from "../components/dashboard/SavedRecipeComponent"
import NotificationsComponent from "../components/dashboard/NotificationsComponent"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("account")

  const menuItems = [
    { id: "account", label: "Account", icon: <LuUser className="w-5 h-5" /> },
    { id: "donate", label: "Donate", icon: <LuHeartHandshake className="w-5 h-5" /> },
    { id: "recipe-generate", label: "Recipe Generator", icon: <LuChefHat className="w-5 h-5" /> },
    { id: "saved-recipe", label: "Saved Recipe", icon: <LuBookmark className="w-5 h-5" /> },
    { id: "expiry-track", label: "Expiry Tracker", icon: <LuClock className="w-5 h-5" /> },
    { id: "meal-plan", label: "Meal Plan", icon: <LuCalendar className="w-5 h-5" /> },
    { id: "notifications", label: "Notifications", icon: <LuBell className="w-5 h-5" /> },
  ]

  const renderComponent = () => {
    switch (activeTab) {
      case "account":
        return <AccountComponent />
      case "meal-plan":
        return <MealPlanComponent />
      case "expiry-track":
        return <ExpiryTrackComponent />
      case "donate":
        return <DonateComponent />
      case "recipe-generate":
        return <RecipeGeneratorComponent />
      case "saved-recipe":
        return <SavedRecipeComponent />
      case "notifications":
        return <NotificationsComponent />
      default:
        return <AccountComponent />
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 shadow-md">
        <nav className="mt-2">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
                    activeTab === item.id ? "bg-orange-500 text-white" : "text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => {
                // remove localstorage and redirect to login page
                localStorage.removeItem("token")
                localStorage.removeItem("role")
                window.location.href = "/login"
              }} className="flex items-center w-full px-4 py-3 text-left text-gray-700 transition-colors hover:text-red-700">
                <span className="mr-3">
                  <LuLogOut className="w-5 h-5" />
                </span>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{renderComponent()}</div>
    </div>
  )
}
