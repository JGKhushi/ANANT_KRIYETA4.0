import { use, useState, useEffect } from "react"
import { LuSearch, LuTrash2, LuHeart, LuClock } from "react-icons/lu"
import RecipeCard from "../cards/RecipeCard"
import RecipePage from "../../pages/RecipePage";
import Loader from "../shared/Loader"
import axios from "axios"

export default function SavedRecipeComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [searchTerm, setSearchTerm] = useState("")
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND}/recipe/user-recipes`
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        console.log("Fetched recipes:", response.data)
        
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSavedRecipes()
  }, [])

  const filteredRecipes = savedRecipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const toggleFavorite = (id) => {
    setSavedRecipes(
      savedRecipes.map((recipe) => (recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe)),
    )
  }

  const removeRecipe = (id) => {
    setSavedRecipes(savedRecipes.filter((recipe) => recipe.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Saved Recipes</h1>

      <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
            <div key={Math.random()} onClick={() => setSelectedRecipe(recipe)}>
              <RecipeCard title={recipe.title}  setOpen={setIsOpen}/>
            </div>

            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No recipes found.</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-orange-500/70 z-50 flex items-center justify-center p-4">
          <div
            className="bg-white rounded-lg shadow-lg max-h-[90vh] w-full max-w-screen overflow-y-auto p-6 relative"
          >
            <button
              className="absolute text-5xl top-2 right-3 text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>

            <RecipePage generatedRecipe={selectedRecipe}/>
          </div>
        </div>
      )}

    </div>
  )
}
