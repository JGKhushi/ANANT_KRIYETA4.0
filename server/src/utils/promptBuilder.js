function buildPrompt({ ingredients, cuisine, dietary, servings, timeLimit, additionalDetails }) {
  return `
I have the following ingredients: ${ingredients}.
I want a recipe for ${cuisine} cuisine.
My dietary preferences are: ${dietary || 'None'}.
I want to serve ${servings} people.
Time limit is ${timeLimit} minutes.
${additionalDetails ? `Additional notes: ${additionalDetails}.` : ''}

Please return a complete recipe in JSON object like output with following details: {
    title: string
    prepTime: string
    cookTime: string
    totalTime: string
    servings: number
    ingredients: string[]
    instructions: string[]
    nutritionFacts: {
      calories: string
      protein: string
      carbs: string
      fat: string
    }
  }. Keep instructions short and under ${timeLimit} minutes.
`;
}

module.exports = buildPrompt;
