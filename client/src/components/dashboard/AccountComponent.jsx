import { useEffect, useState } from "react"
import axios from "axios";
import Loader from "../shared/Loader";

export default function AccountComponent() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/user`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input type="text" value={user.name} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input type="email" value={user.email} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Phone</label>
                <input type="email" value={user.phone} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Address</label>
                <textarea  value={user.address} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors">
            Save Changes
          </button>
        </div>
      </div>

    </div>
  )
}
