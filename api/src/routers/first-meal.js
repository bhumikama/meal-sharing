import express from "express";
import knex from "../database_client.js";

const firstMealRouter = express.Router();


firstMealRouter.get('/', async (req, res) => {
    try {
        const first_meal =  await knex('Meal').orderBy('id','asc').first();
        res.json(first_meal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default firstMealRouter;