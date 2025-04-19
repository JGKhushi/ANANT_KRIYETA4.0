const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const buildPrompt = require("../utils/promptBuilder");
require("dotenv").config();
const prisma = require("../../prisma/client");
const authenticateToken = require("../middlewares/auth.middleware");


router.get("/user-recipes", authenticateToken,  async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  console.log("Hello from user-recipes route")
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!recipes) {
      return res.status(404).json({ error: "No recipes found" });
    }

    const parsedRecipes = recipes.map(recipe => JSON.parse(recipe.recipe));
    res.status(200).json(parsedRecipes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const recipe = req.body.recipe;
  try {
    await prisma.recipe.create({
      data: {
        userId,
        recipe,
      },
    });
    res.status(201).json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

router.post("/generate-recipe", async (req, res) => {
  const {
    ingredients,
    cuisine,
    dietary,
    servings,
    timeLimit,
    additionalDetails,
  } = req.body;

  const prompt = buildPrompt({
    ingredients,
    cuisine,
    dietary,
    servings,
    timeLimit,
    additionalDetails,
  });

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const rawText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No recipe generated.";

    const cleanJSON = rawText.replace(/```json\n?|```/g, "");

    const recipe = JSON.parse(cleanJSON);

    res.json(recipe);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
