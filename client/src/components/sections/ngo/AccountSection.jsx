import { useEffect, useState } from "react"
import {
  LuSave,
  LuMapPin,
  LuPhone,
  LuMail,
  LuGlobe,
} from "react-icons/lu"
import Loader from "../../shared/Loader"
import axios from "axios"

// Account Section Component
export default function AccountSection() {
  const [loading, setLoading] = useState(true)
  const [ngoData, setNgoData] = useState({
    name: "Community Food Bank",
    registrationNumber: "NGO12345678",
    email: "contact@communityfoodbank.org",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Cityville, State, 12345",
    serviceArea: "Cityville and surrounding areas (10 mile radius)",
    website: "www.communityfoodbank.org",
    contactPerson: "Jane Smith",
    contactRole: "Program Director",
    transportAvailable: true,
    coldStorageAvailable: true,
    numberOfAcceptedDonations: 0,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({ ...ngoData })

  useEffect(() => {
    const fetchNgoData = async () => {

      try {
        const url = `${import.meta.env.VITE_BACKEND}/ngo`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setNgoData(response.data)
        setEditedData(response.data)
      } catch (error) {
        console.error("Error fetching NGO data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNgoData()
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditedData({
      ...editedData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSave = () => {
    setNgoData({ ...editedData })
    setIsEditing(false)
  }

  const stats = [
    { label: "Donations Accepted", value: ngoData.numberOfAcceptedDonations },

  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">NGO Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* NGO Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Organization Profile</h2>
            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`flex items-center px-3 py-1 rounded-md text-sm ${
                isEditing ? "bg-green-500 hover:bg-green-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {isEditing ? (
                <>
                  Save
                </>
              ) : (
                <>
                  Edit
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col md:flex-row">

            <div className="md:w-2/3">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Number</label>
                      <input
                        type="text"
                        name="registrationNumber"
                        value={editedData.registrationNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={editedData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={editedData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="text"
                        name="website"
                        value={editedData.website}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={editedData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Area</label>
                    <input
                      type="text"
                      name="serviceArea"
                      value={editedData.serviceArea}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={editedData.contactPerson}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <input
                        type="text"
                        name="contactRole"
                        value={editedData.contactRole}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="transportAvailable"
                        checked={editedData.transportAvailable}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>Transport Available</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="coldStorageAvailable"
                        checked={editedData.coldStorageAvailable}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span>Cold Storage Available</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">{ngoData.name}</h3>
                  <p className="text-gray-500">Registration: {ngoData.registrationNumber}</p>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <LuMapPin className="text-gray-400 mr-2 mt-1" />
                      <div>
                        <p>{ngoData.address}</p>
                        <p className="text-sm text-gray-500">Service Area: {ngoData.serviceArea}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <LuPhone className="text-gray-400 mr-2" />
                      <p>{ngoData.phone}</p>
                    </div>

                    <div className="flex items-center">
                      <LuMail className="text-gray-400 mr-2" />
                      <p>{ngoData.email}</p>
                    </div>

                    <div className="flex items-center">
                      <LuGlobe className="text-gray-400 mr-2" />
                      <p>{ngoData.website}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium">Contact Person</p>
                    <p>
                      {ngoData.contactPerson}, {ngoData.contactRole}
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    {ngoData.transportAvailable && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Transport Available
                      </span>
                    )}
                    {ngoData.coldStorageAvailable && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        Cold Storage Available
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Impact Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start border-b border-gray-100 pb-3 last:border-0">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3"></div>
              <div className="flex-1">
                <p>{activity.message}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  )
}