import express from "express";
import knex from "../database_client.js";


const firstMealRouter = express.Router();

firstMealRouter.get("/", async (req, res, next) => {
  try {
    const first_meal = await knex("Meal").orderBy("id", "asc").first();
    if (first_meal) {
      res.json(first_meal);
    } else {
      const err = new Error("No meals found");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

export default firstMealRouter;
