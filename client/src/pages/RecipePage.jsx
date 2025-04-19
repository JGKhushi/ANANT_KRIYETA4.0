import { LuClock, LuUsers } from "react-icons/lu"

export default function RecipePage({ generatedRecipe }) {
  return (
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
              </div>
            </div>
  )
}