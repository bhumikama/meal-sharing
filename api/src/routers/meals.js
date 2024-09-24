import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

//return all meals
mealsRouter.get("/", async (req, res, next) => {
  try {
    const meals = await knex("Meal").select("*");
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

//insert meal
mealsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await knex("Meal").insert(data);
    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

//GET meals by id
mealsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = await knex("Meal").select("*").where("id", id);
    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
    } else {
      res.json(meal);
    }
  } catch (error) {
    next(error);
  }
});

//Updates the meal by id
mealsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedMeal = req.body;
    const meal = await knex("Meal").where("id", id).update(updatedMeal);

    if (meal) {
      res.status(200).json({ message: "Meal updated successfully" });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    next(error);
  }
});

//Deletes the meal by id
mealsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedMeal = await knex("Meal").where("id", id).del();
    if (deletedMeal) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default mealsRouter;
