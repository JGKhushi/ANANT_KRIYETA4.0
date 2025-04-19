import { useState } from "react"
import { LuPlus, LuTrash2 } from "react-icons/lu"

export default function MealPlanComponent() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snacks"]

  const [selectedDay, setSelectedDay] = useState("Monday")

  const [mealPlan, setMealPlan] = useState({
    Monday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Friday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
  })

  const addMeal = (day, mealType) => {
    const newMeal = prompt(`Add a new meal for ${day} ${mealType}:`)
    if (newMeal && newMeal.trim()) {
      setMealPlan((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: [...prev[day][mealType], newMeal.trim()],
        },
      }))
    }
  }

  const removeMeal = (day, mealType, index) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: prev[day][mealType].filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meal Planning</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex overflow-x-auto pb-2 mb-4">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 mr-2 rounded-md whitespace-nowrap ${
                selectedDay === day ? "bg-orange-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {mealTypes.map((mealType) => (
            <div key={mealType} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{mealType}</h3>
                <button
                  onClick={() => addMeal(selectedDay, mealType)}
                  className="text-orange-500 hover:text-orange-600 flex items-center text-sm"
                >
                  <LuPlus className="mr-1" /> Add Meal
                </button>
              </div>

              {mealPlan[selectedDay][mealType].length > 0 ? (
                <ul className="space-y-2">
                  {mealPlan[selectedDay][mealType].map((meal, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                      <span>{meal}</span>
                      <button
                        onClick={() => removeMeal(selectedDay, mealType, index)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <LuTrash2 />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm italic">No meals planned. Click "Add Meal" to get started.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
