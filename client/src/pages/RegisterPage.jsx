import { useState } from "react"
import { LuUser, LuBuilding, LuHeart } from "react-icons/lu"
import UserBusinessForm from "../components/registration/UserBusinessForm"
import NgoForm from "../components/registration/NgoForm"

export default function RegisterPage() {
  const [selectedType, setSelectedType] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create an Account</h1>
          <p className="mt-2 text-gray-600">Join ZeroBite to start your food sustainability journey</p>
        </div>

        {!selectedType ? (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-center mb-6">Select Registration Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setSelectedType("user")}
                className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors cursor-pointer"
              >
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <LuUser className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Individual / Business</h3>
                <p className="text-sm text-gray-500 text-center">
                  Register as an individual user or a business to donate food, access recipes, and more
                </p>
              </button>

              <button
                onClick={() => setSelectedType("ngo")}
                className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-orange-500 transition-colors cursor-pointer"
              >
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <LuHeart className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">NGO / Organization</h3>
                <p className="text-sm text-gray-500 text-center">
                  Register as a food bank, shelter, or community kitchen to receive food donations
                </p>
              </button>
            </div>
          </div>
        ) : selectedType === "user" ? (
          <UserBusinessForm onBack={() => setSelectedType(null)} />
        ) : (
          <NgoForm onBack={() => setSelectedType(null)} />
        )}
      </div>
    </div>
  )
}
