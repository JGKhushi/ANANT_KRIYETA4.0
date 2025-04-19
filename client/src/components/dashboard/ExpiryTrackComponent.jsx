import { useState } from "react"
import { LuPlus, LuTrash2 } from "react-icons/lu"

export default function ExpiryTrackComponent() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Milk",
      category: "Dairy",
      purchaseDate: "2025-04-05",
      expiryDate: "2025-04-12",
      daysLeft: 3,
    },
    {
      id: 3,
      name: "Spinach",
      category: "Vegetables",
      purchaseDate: "2025-04-06",
      expiryDate: "2025-04-09",
      daysLeft: 0,
    },
    {
      id: 4,
      name: "Yogurt",
      category: "Dairy",
      purchaseDate: "2025-04-02",
      expiryDate: "2025-04-16",
      daysLeft: 7,
    },
    {
      id: 5,
      name: "Bread",
      category: "Bakery",
      purchaseDate: "2025-04-07",
      expiryDate: "2025-04-14",
      daysLeft: 5,
    },
  ])

  const [filter, setFilter] = useState("all")

  const filteredItems =
    filter === "all"
      ? items
      : filter === "expiring-soon"
        ? items.filter((item) => item.daysLeft <= 3)
        : items.filter((item) => item.daysLeft === 0)

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const getDaysLeftColor = (daysLeft) => {
    if (daysLeft === 0) return "text-red-600"
    if (daysLeft <= 3) return "text-orange-500"
    return "text-green-600"
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Expiry Tracker</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md ${
                filter === "all" ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setFilter("expiring-soon")}
              className={`px-4 py-2 rounded-md ${
                filter === "expiring-soon" ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Expiring Soon
            </button>
            <button
              onClick={() => setFilter("expired")}
              className={`px-4 py-2 rounded-md ${
                filter === "expired" ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Expired
            </button>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors flex items-center">
            <LuPlus className="mr-2" /> Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Purchase Date</th>
                <th className="px-4 py-2 text-left">Expiry Date</th>
                <th className="px-4 py-2 text-left">Days Left</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.purchaseDate}</td>
                  <td className="px-4 py-3">{item.expiryDate}</td>
                  <td className={`px-4 py-3 font-medium ${getDaysLeftColor(item.daysLeft)}`}>
                    {item.daysLeft === 0 ? (
                      <span className="flex items-center">
                         Expired
                      </span>
                    ) : (
                      `${item.daysLeft} days`
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500">
                      <LuTrash2 />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
