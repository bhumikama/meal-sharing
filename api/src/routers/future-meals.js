import express from "express";
import { getMealsByDateComparison } from "../utils/MealUtils.js";

const futureMealsRouter = express.Router();

futureMealsRouter.get("/", async (req, res, next) => {
  try {
    const operator = ">";
    const future_meals = await getMealsByDateComparison(operator);
    res.json(future_meals);
  } catch (err) {
    next(err);
  }
});

export default futureMealsRouter;
