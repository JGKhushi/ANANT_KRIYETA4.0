import { useEffect, useState } from "react"
import {
  LuMapPin,
  LuPhone,
  LuMail,
  LuCalendar,
  LuSearch,
} from "react-icons/lu"

import Loader from "../../shared/Loader"
import axios from "axios"

export default function DonorsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDonor, setSelectedDonor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/donation/donorswithngo`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        setDonors(response.data)
      } catch (error) {
        console.error("Error fetching donors:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDonors()
  }, [])

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Donors</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search donors by name, email, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDonors.map((donor) => (
            <div
              key={donor.id}
              className={`border rounded-lg p-4 cursor-pointer hover:border-green-500 transition-colors ${selectedDonor?.id === donor.id ? "border-green-500 bg-green-50" : ""}`}
              onClick={() => setSelectedDonor(selectedDonor?.id === donor.id ? null : donor)}
            >
              <div className="flex items-center mb-3">
                <div>
                  <h3 className="font-medium">{donor.name}</h3>
                  <p className="text-sm text-gray-500">{donor.donationCount} donations</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <LuMapPin className="text-gray-400 mr-2 mt-1" />
                  <span className="text-gray-600">{donor.location}</span>
                </div>
                <div className="flex items-center">
                  <LuCalendar className="text-gray-400 mr-2" />
                  <span className="text-gray-600">Last donation: {donor.lastDonation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No donors found matching your search.</p>
          </div>
        )}
      </div>

      {selectedDonor && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Donor Details</h2>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="flex flex-col  p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium">{selectedDonor.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{selectedDonor.donationCount} donations</p>

                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center">
                    <LuPhone className="text-gray-400 mr-2" />
                    <span>{selectedDonor.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <LuMail className="text-gray-400 mr-2" />
                    <span>{selectedDonor.email}</span>
                  </div>
                  <div className="flex items-start">
                    <LuMapPin className="text-gray-400 mr-2 mt-1" />
                    <span>{selectedDonor.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="font-medium mb-3">Donation History</h3>

              <div className="space-y-3">
                {selectedDonor.donationHistory.map((donation, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{donation.items.join(", ")}</p>
                        <p className="text-sm text-gray-500">Quantity: {donation.quantity}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          donation.status === "accepted"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {donation.status === "pending" ? "Pending" : "Accepted"}
                      </span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <LuCalendar className="mr-1" />
                      <span>{donation.date}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}