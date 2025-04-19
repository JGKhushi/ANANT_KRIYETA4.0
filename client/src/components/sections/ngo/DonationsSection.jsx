import { useEffect, useState } from "react"
import {
  LuUser,
  LuMapPin,
  LuPhone,
  LuFilter,
  LuCalendar,
  LuClock,
  LuCheck,
  LuInfo,
} from "react-icons/lu"

import axios from 'axios'
import Loader from "../../shared/Loader"


// Donations Section Component
export default function DonationsSection() {
  const [activeTab, setActiveTab] = useState("available")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [loading, setLoading] = useState(true);

  const [availableDonations, setAvailableDonations] = useState([])

  const [acceptedDonations, setAcceptedDonations] = useState([
    {
      id: 101,
      donorName: "Robert Smith",
      foodType: "Fresh Produce",
      items: ["Tomatoes", "Cucumbers", "Lettuce"],
      quantity: "4 kg",
      expiry: "April 17, 2025",
      location: "222 Maple Ave, Cityville",
      distance: "1.8 miles",
      acceptedDate: "April 11, 2025",
      pickupScheduled: "April 14, 2025, 3:00 PM",
      status: "scheduled",
      contactPhone: "+1 (555) 111-2222",
    },
    {
      id: 102,
      donorName: "Jennifer Lee",
      foodType: "Prepared Meals",
      items: ["Pasta Dishes", "Soups", "Sandwiches"],
      quantity: "15 meals",
      expiry: "April 15, 2025",
      location: "333 Cedar Ln, Townsville",
      distance: "2.5 miles",
      acceptedDate: "April 10, 2025",
      pickupScheduled: "April 13, 2025, 5:30 PM",
      status: "completed",
      contactPhone: "+1 (555) 333-4444",
    },
  ])

  useEffect(() => {
    const fetchAvailableDonations = async () => {
      const url = `${import.meta.env.VITE_BACKEND}/donation/pending`
      
      try {
        const resp = await axios.get(url)
        setAvailableDonations(resp.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } 
    } 

    // fetch accepted donations
    const fetchAcceptedDonations = async () => {
      const url = `${import.meta.env.VITE_BACKEND}/donation/accepted`
      const token = localStorage.getItem("token")
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      try {
        const resp = await axios.get(url, { headers })
        setAcceptedDonations(resp.data)
      }
      catch (err) {
        console.error("Error fetching accepted donations:", err.message)
      } 
    }

    const fetchBoth = async () => {
      await fetchAvailableDonations()
      await fetchAcceptedDonations()
      setLoading(false)
    }
    
    fetchBoth();
  } ,[])


  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    })
  }

  const handleAcceptDonation = async (donation) => {
    // Remove from available donations
    setLoading(true)
    setAvailableDonations(availableDonations.filter((item) => item.id !== donation.id))

    // Add to accepted donations with additional fields
    const acceptedDonation = {
      ...donation,
      id: donation.id + 1000, // Ensure unique ID
      acceptedDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      pickupScheduled: "Not scheduled yet",
      status: "pending",
    }

    // send put req to server
    const url = `${import.meta.env.VITE_BACKEND}/donation/accept/${donation.id}`
    
    try {
      // send put req to server with jwt token, donantion id is passed as param
      const token = localStorage.getItem("token")
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const resp = await axios.put(url, {}, { headers })

      setAcceptedDonations([acceptedDonation, ...acceptedDonations])
      window.location.reload();
    } catch (err) {
      console.error("Error accepting donation:", err.message)
    } finally {
      setLoading(false)
    }

    // Close donation details if open
    setSelectedDonation(null)
  }

  const handleSchedulePickup = (id) => {
    // In a real app, this would open a scheduling modal
    const updatedDonations = acceptedDonations.map((donation) =>
      donation.id === id
        ? {
            ...donation,
            pickupScheduled: "April 15, 2025, 2:00 PM",
            status: "scheduled",
          }
        : donation,
    )

    setAcceptedDonations(updatedDonations)
  }

  const handleMarkComplete = (id) => {
    const updatedDonations = acceptedDonations.map((donation) =>
      donation.id === id
        ? {
            ...donation,
            status: "completed",
          }
        : donation,
    )

    setAcceptedDonations(updatedDonations)
  }


  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
            Pending
          </span>
        )
      case "accepted":
        return (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
            <LuCheck className="mr-1" /> Accepted
          </span>
        )
      default:
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center">
            Pending
          </span>
        )
    }
  }

  // const filteredAvailableDonations = availableDonations.filter((donation) => {
  //   if (filters.foodType !== "all" && donation.foodType !== filters.foodType) return false

  //   // Distance filtering logic would go here in a real app
  //   if (filters.distance !== "all") {
  //     const distanceNum = Number.parseFloat(donation.distance)
  //     if (filters.distance === "under5" && distanceNum >= 5) return false
  //     if (filters.distance === "under10" && distanceNum >= 10) return false
  //     if (filters.distance === "under20" && distanceNum >= 20) return false
  //   }

  //   // Expiry filtering logic
  //   if (filters.expiryTime !== "all") {
  //     const today = new Date()
  //     const expiryDate = new Date(donation.expiry)
  //     const diffTime = expiryDate - today
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  //     if (filters.expiryTime === "today" && diffDays !== 0) return false
  //     if (filters.expiryTime === "tomorrow" && diffDays !== 1) return false
  //     if (filters.expiryTime === "thisWeek" && (diffDays < 0 || diffDays > 7)) return false
  //   }

  //   return true
  // })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Donations</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium ${activeTab === "available" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("available")}
          >
            Available Donations
          </button>
          <button
            className={`px-4 py-3 font-medium ${activeTab === "accepted" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("accepted")}
          >
            Accepted Donations
          </button>
        </div>

        {activeTab === "available" && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Available Donations</h2>
              {/* <button
                onClick={toggleFilters}
                className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
              >
                <LuFilter className="mr-1" /> Filter
              </button> */}
            </div>

            {showFilters && (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
                    <select
                      value={filters.foodType}
                      onChange={(e) => handleFilterChange("foodType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">All Types</option>
                      <option value="Fresh Produce">Fresh Produce</option>
                      <option value="Bakery">Bakery</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Non-perishable">Non-perishable</option>
                      <option value="Prepared Meals">Prepared Meals</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Time</label>
                    <select
                      value={filters.expiryTime}
                      onChange={(e) => handleFilterChange("expiryTime", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="all">Any Time</option>
                      <option value="today">Today</option>
                      <option value="tomorrow">Tomorrow</option>
                      <option value="thisWeek">This Week</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {availableDonations.length > 0 ? (
              <div className="space-y-4">
                {availableDonations.map((donation) => (
                  <div
                    key={donation.id}
                    className={`border rounded-lg overflow-hidden ${selectedDonation?.id === donation.id ? "border-green-500" : "border-gray-200"}`}
                  >
                    <div
                      className="p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedDonation(selectedDonation?.id === donation.id ? null : donation)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{donation.foodType}</h3>
                          <p className="text-sm text-gray-600">{donation.items.join(", ")}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {donation.quantity}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-y-2">
                        <div className="w-full sm:w-1/2 flex items-center text-sm text-gray-500">
                          <LuMapPin className="mr-1" />
                          <span>{donation.location} </span>
                        </div>
                        <div className="w-full sm:w-1/2 flex items-center text-sm text-gray-500">
                          <LuCalendar className="mr-1" />
                          <span>Expires: {donation.expiry}</span>
                        </div>
                      </div>
                    </div>

                    {selectedDonation?.id === donation.id && (
                      <div className="bg-gray-50 p-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Donor Information</h4>
                            <div className="mt-1 space-y-1">
                              <div className="flex items-center text-sm">
                                <LuUser className="text-gray-400 mr-2" />
                                <span>{donation.donorName}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <LuPhone className="text-gray-400 mr-2" />
                                <span>{donation.contactPhone}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-700">Pickup Details</h4>
                            <div className="mt-1 space-y-1">
                              <div className="flex items-start text-sm">
                                <LuMapPin className="text-gray-400 mr-2 mt-1" />
                                <span>{donation.location}</span>
                              </div>
                              <div className="flex items-center text-sm">
                                <LuClock className="text-gray-400 mr-2" />
                                <span>{donation.pickupTimes}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {donation.notes && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700">Additional Notes</h4>
                            <p className="mt-1 text-sm bg-white p-2 rounded border border-gray-200">{donation.notes}</p>
                          </div>
                        )}

                        <div>
                          {/* add image donation.image */}
                          <p>Attached Image:</p>
                          <img src={donation.image} alt="Donation" className="h-32 object-contain rounded-md mb-4" />
                        </div>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleAcceptDonation(donation)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors cursor-pointer"
                          >
                            Accept Donation
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <LuInfo className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No donations found</h3>
                <p className="text-gray-500">Try adjusting your filters or check back later</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "accepted" && (
          <div className="p-4">
            <h2 className="text-lg font-medium mb-4">Donations You've Accepted</h2>

            {acceptedDonations.length > 0 ? (
              <div className="space-y-4">
                {acceptedDonations.map((donation) => (
                  <div key={donation.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-medium">{donation.foodType}</h3>
                          <p className="text-sm text-gray-600">{donation.items.join(", ")}</p>
                        </div>
                        {getStatusBadge(donation.status)}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Donor</p>
                          <p className="text-sm">{donation.donorName}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Quantity</p>
                          <p className="text-sm">{donation.quantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Expiry Date</p>
                          <p className="text-sm">{donation.expiry}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-gray-500">Location</p>
                          <div className="flex items-start text-sm">
                            <LuMapPin className="text-gray-400 mr-1 mt-1" />
                            <span>{donation.location}</span>
                          </div>
                        </div>
                        {/* <div>
                          <p className="text-xs text-gray-500">Pickup Schedule</p>
                          <p className="text-sm">{donation.pi}</p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <LuInfo className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No accepted donations yet</h3>
                <p className="text-gray-500">Start by accepting donations from the Available tab</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
