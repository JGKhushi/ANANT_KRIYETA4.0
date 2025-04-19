import { useState } from "react"
import {
  LuBell,
  LuTrash2,
  LuSettings,
} from "react-icons/lu"

export default function NotificationsSection() {
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     type: "donation",
  //     title: "New donation available",
  //     message: "A new donation has been posted in your area: Fresh Produce (5 kg)",
  //     date: "Today, 9:30 AM",
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     type: "system",
  //     title: "Verification approved",
  //     message: "Your NGO verification documents have been approved.",
  //     date: "Yesterday, 2:15 PM",
  //     read: true,
  //   },
  //   {
  //     id: 3,
  //     type: "donor",
  //     title: "Donor message",
  //     message: "John Doe has sent you a message regarding their donation.",
  //     date: "Apr 12, 2025",
  //     read: true,
  //   },
  //   {
  //     id: 4,
  //     type: "reminder",
  //     title: "Pickup reminder",
  //     message: "Don't forget to pick up the scheduled donation from Sarah Johnson today at 5:00 PM.",
  //     date: "Apr 11, 2025",
  //     read: false,
  //   },
  //   {
  //     id: 5,
  //     type: "system",
  //     title: "Monthly report available",
  //     message: "Your monthly impact report for March 2025 is now available.",
  //     date: "Apr 5, 2025",
  //     read: true,
  //   },
  // ])

  const [notifications, setNotifications] = useState([])

  const [filter, setFilter] = useState("all")
  const [showSettings, setShowSettings] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    newDonations: true,
    donorMessages: true,
    pickupReminders: true,
    systemUpdates: true,
    emailNotifications: false,
  })

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === filter)

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const handleSettingChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting],
    })
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "donation":
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <LuBell className="text-green-500" />
          </div>
        )
      case "donor":
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <LuBell className="text-blue-500" />
          </div>
        )
      case "reminder":
        return (
          <div className="bg-orange-100 p-2 rounded-full">
            <LuBell className="text-orange-500" />
          </div>
        )
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <LuBell className="text-gray-500" />
          </div>
        )
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === "all" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === "unread" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter("donation")}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === "donation" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Donations
            </button>
            {/* <button
              onClick={() => setFilter("donor")}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                filter === "donor" ? "bg-green-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Donor Messages
            </button> */}
          </div>

          <div className="flex space-x-2">
            <button onClick={markAllAsRead} className="text-green-500 hover:text-green-600 text-sm font-medium">
              Mark all as read
            </button>
            {/* <button onClick={() => setShowSettings(!showSettings)} className="text-gray-500 hover:text-gray-600">
              <LuSettings />
            </button> */}
          </div>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 ${!notification.read ? "bg-green-50 border-green-200" : ""}`}
              >
                <div className="flex items-start">
                  <div className="mr-4">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`font-medium ${!notification.read ? "text-green-800" : ""}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">{notification.date}</span>
                    </div>
                    <p className="text-gray-600 mt-1">{notification.message}</p>

                    <div className="flex justify-between items-center mt-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-green-500 hover:text-green-600 text-sm"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 ml-auto"
                      >
                        <LuTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No notifications found.</p>
          </div>
        )}
      </div>

      {showSettings && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">New Donations</h3>
                <p className="text-sm text-gray-500">Get notified when new donations are available in your area</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.newDonations}
                  onChange={() => handleSettingChange("newDonations")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Donor Messages</h3>
                <p className="text-sm text-gray-500">Get notified when donors send you messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.donorMessages}
                  onChange={() => handleSettingChange("donorMessages")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Pickup Reminders</h3>
                <p className="text-sm text-gray-500">Get reminders about scheduled donation pickups</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.pickupReminders}
                  onChange={() => handleSettingChange("pickupReminders")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">System Updates</h3>
                <p className="text-sm text-gray-500">Get notified about system updates and reports</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.systemUpdates}
                  onChange={() => handleSettingChange("systemUpdates")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notificationSettings.emailNotifications}
                  onChange={() => handleSettingChange("emailNotifications")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  )
}