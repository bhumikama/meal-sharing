import express from "express";
import knex from "../database_client.js";

const pastMealsRouter = express.Router();


pastMealsRouter.get('/', async (req, res) => {
    try {
        const now = new Date();
        const past_meals =  await knex('Meal').select('*').where('when', '<', now);
        res.json(past_meals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default pastMealsRouter;