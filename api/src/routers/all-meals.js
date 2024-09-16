import express from "express";
import knex from "../database_client.js";

const allMealsRouter = express.Router();


allMealsRouter.get('/', async (req, res) => {
    try {
        const all_meals =  await knex('Meal').orderBy('id');
        res.json(all_meals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default allMealsRouter;