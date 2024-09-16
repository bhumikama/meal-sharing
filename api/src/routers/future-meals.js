import express from "express";
import knex from "../database_client.js";

const futureMealsRouter = express.Router();


futureMealsRouter.get('/', async (req, res) => {
    try {
        const now = new Date();
        const future_meals =  await knex('Meal').select('*').where('when', '>', now);
        res.json(future_meals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default futureMealsRouter;