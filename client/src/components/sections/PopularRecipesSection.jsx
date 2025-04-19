import { LuClock } from "react-icons/lu"
import Food1 from "../../assets/home-page/food1.webp"
import Food2 from "../../assets/home-page/food2.webp"
import Food3 from "../../assets/home-page/food3.webp"

export default function PopularRecipesSection() {
  const recipes = [
    {
      title: "Zero-Waste Vegetable Soup",
      image: Food1,
      time: "30 mins",
      difficulty: "",
      link: "#",
    },
    {
      title: "Seasonal Garden Salad",
      image: Food2,
      time: "15 mins",
      difficulty: "Easy",
      link: "#",
    },
    {
      title: "Root-to-Stem Stir Fry",
      image: Food3,
      time: "25 mins",
      difficulty: "Medium",
      link: "#",
    },
  ]

  return (
    <section className="w-full bg-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-orange-500 text-4xl font-bold mb-10">POPULAR RECIPE</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <div key={index} className="overflow-hidden">
              <div className="rounded-lg overflow-hidden mb-3">
                <img
                  src={recipe.image || "/placeholder.svg"}
                  alt={recipe.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{recipe.title}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <LuClock className="mr-1" />
                <span className="mr-4">{recipe.time}</span>
                {recipe.difficulty && (
                  <>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-400 mr-4"></span>
                    <span>{recipe.difficulty}</span>
                  </>
                )}
              </div>
              <div className="flex justify-between items-center">
                <a href={recipe.link} className="text-green-600 hover:text-green-700 text-sm font-medium">
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
