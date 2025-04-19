import { useState } from "react"
import { LuPlus, LuX, LuChefHat, LuClock, LuUsers, LuSave } from "react-icons/lu"
import axios from "axios"
import Loader from "../shared/Loader"

export default function RecipeGenerateComponent() {
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState("")
  const [cuisineType, setCuisineType] = useState("")
  const [servings, setServings] = useState(2)
  const [timeLimit, setTimeLimit] = useState(30)
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
    lowCarb: false,
  })
  const [extraDetails, setExtraDetails] = useState("")

  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRecipe, setGeneratedRecipe] = useState(null)
  const [loading, setLoading] = useState(false)

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient("")
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addIngredient()
    }
  }

  const handleDietaryChange = (preference) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      [preference]: !dietaryPreferences[preference],
    })
  }

  const generateRecipe = async () => {
    if (ingredients.length === 0) {
      alert("Please add at least one ingredient")
      return
    }

    setIsGenerating(true)

    const requestBody = {
      ingredients: ingredients.join(", "),
      cuisineType: cuisineType,
      servings: servings,
      timeLimit: timeLimit,
      dietaryPreferences: JSON.stringify(dietaryPreferences),
      extraDetails: extraDetails,
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/recipe/generate-recipe`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.status === 200) {
        const recipeData = response.data
        setGeneratedRecipe(recipeData)
      }

    } catch (error) {
      console.error("Error generating recipe:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const saveRecipe = () => {
    if (!generatedRecipe) {
      alert("No recipe to save")
      return
    }

    setLoading(true);

    const url = `${import.meta.env.VITE_BACKEND}/recipe`
    const requestBody = {
      recipe: JSON.stringify(generatedRecipe)
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }

    axios.post(url, requestBody, { headers })
      .then((response) => {
        if (response.status === 201) {
          alert("Recipe saved successfully!")
        } else {
          alert("Failed to save recipe.")
        }
      })
      .catch((error) => {
        console.error("Error saving recipe:", error)
        alert("Failed to save recipe.")
      })
      .finally(() => {
        setLoading(false)
        setGeneratedRecipe(null)
      })

  }

  const resetForm = () => {
    setGeneratedRecipe(null)
  }

  if(loading) {
    return (
      <Loader />
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recipe Generator</h1>

      {!generatedRecipe ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">What ingredients do you have?</h2>
            <div className="flex mb-2">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add an ingredient (e.g., chicken, rice, tomatoes)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button
                onClick={addIngredient}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-md transition-colors"
              >
                <LuPlus />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2 min-h-10">
                {ingredients.map((ingredient, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center">
                    {ingredient}
                    <button
                      onClick={() => removeIngredient(ingredient)}
                      className="ml-2 text-orange-800 hover:text-orange-900"
                    >
                      <LuX size={16} />
                    </button>
                  </span>
                ))}
              </div>
              {ingredients.length === 0 && (
                <p className="text-gray-500 text-sm italic">Add ingredients you want to use in your recipe</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Cuisine Preferences</h2>
              <select
                value={cuisineType}
                onChange={(e) => setCuisineType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                <option value="">Any cuisine</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="asian">Asian</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="american">American</option>
                <option value="indian">Indian</option>
                <option value="french">French</option>
              </select>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Dietary Preferences</h2>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryPreferences.vegetarian}
                    onChange={() => handleDietaryChange("vegetarian")}
                    className="mr-2"
                  />
                  <span>Vegetarian</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryPreferences.vegan}
                    onChange={() => handleDietaryChange("vegan")}
                    className="mr-2"
                  />
                  <span>Vegan</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryPreferences.glutenFree}
                    onChange={() => handleDietaryChange("glutenFree")}
                    className="mr-2"
                  />
                  <span>Gluten-Free</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryPreferences.dairyFree}
                    onChange={() => handleDietaryChange("dairyFree")}
                    className="mr-2"
                  />
                  <span>Dairy-Free</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryPreferences.lowCarb}
                    onChange={() => handleDietaryChange("lowCarb")}
                    className="mr-2"
                  />
                  <span>Low-Carb</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Servings</h2>
              <div className="flex items-center">
                <button
                  onClick={() => setServings(Math.max(1, servings - 1))}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={servings}
                  onChange={(e) => setServings(Number.parseInt(e.target.value) || 1)}
                  className="w-16 text-center py-1 border-t border-b border-gray-300"
                />
                <button
                  onClick={() => setServings(servings + 1)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100"
                >
                  +
                </button>
                <span className="ml-2 text-gray-600">people</span>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Time Limit</h2>
              <div className="flex items-center">
                <button
                  onClick={() => setTimeLimit(Math.max(5, timeLimit - 5))}
                  className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="5"
                  step="5"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number.parseInt(e.target.value) || 5)}
                  className="w-16 text-center py-1 border-t border-b border-gray-300"
                />
                <button
                  onClick={() => setTimeLimit(timeLimit + 5)}
                  className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-100"
                >
                  +
                </button>
                <span className="ml-2 text-gray-600">minutes</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Additional Details (Optional)</h2>
            <textarea
              value={extraDetails}
              onChange={(e) => setExtraDetails(e.target.value)}
              placeholder="Any specific requirements or preferences? (e.g., spice level, cooking method, etc.)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              rows={3}
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={generateRecipe}
              disabled={isGenerating || ingredients.length === 0}
              className={`flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-md text-white font-medium transition-colors ${isGenerating || ingredients.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Recipe...
                </>
              ) : (
                <>
                  <LuChefHat className="mr-2" />
                  Generate Recipe
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{generatedRecipe.title}</h2>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <LuClock className="text-orange-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Total Time</p>
                  <p className="font-medium">{generatedRecipe.totalTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <LuUsers className="text-orange-500 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Servings</p>
                  <p className="font-medium">{generatedRecipe.servings}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                <ul className="space-y-2">
                  {generatedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-2 mr-2"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Nutrition Facts</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="font-medium">{generatedRecipe.nutritionFacts.calories}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Protein</p>
                      <p className="font-medium">{generatedRecipe.nutritionFacts.protein}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Carbs</p>
                      <p className="font-medium">{generatedRecipe.nutritionFacts.carbs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Fat</p>
                      <p className="font-medium">{generatedRecipe.nutritionFacts.fat}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                <ol className="space-y-4">
                  {generatedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-3 mt-0.5">
                        {index + 1}
                      </span>
                      <p>{instruction}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                onClick={resetForm}
                className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Generate Another Recipe
              </button>
              <button
                onClick={saveRecipe}
                className="flex items-center justify-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
              >
                <LuSave className="mr-2" />
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
