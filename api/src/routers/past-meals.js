import express from "express";
import { getMealsByDateComparison } from "../utils/MealUtils.js";

const pastMealsRouter = express.Router();

pastMealsRouter.get("/", async (req, res, next) => {
  try {
    const past_meals = await getMealsByDateComparison("<");
    res.json(past_meals);
  } catch (err) {
    next(err);
  }
});

export default pastMealsRouter;
