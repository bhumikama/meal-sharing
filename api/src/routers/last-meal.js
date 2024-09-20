import express from "express";
import knex from "../database_client.js";

const lastMealRouter = express.Router();

lastMealRouter.get("/", async (req, res, next) => {
  try {
    const last_meal = await knex("Meal").orderBy("id", "desc").first();
    if (last_meal) {
      res.json(last_meal);
    } else {
      const err = new Error("No meals found");
      err.status = 404;
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

export default lastMealRouter;
