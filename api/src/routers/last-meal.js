import express from "express";
import knex from "../database_client.js";

const lastMealRouter = express.Router();


lastMealRouter.get('/', async (req, res) => {
    try {
        const last_meal =  await knex('Meal').orderBy('id','desc').first();
        res.json(last_meal);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default lastMealRouter;