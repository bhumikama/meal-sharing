import express from "express";
import knex from "../database_client.js";

const lastMealRouter = express.Router();


lastMealRouter.get('/', async (req, res) => {
    try {
        const last_meal =  await knex('Meal').orderBy('id','desc').first();
        if(last_meal){
            res.json(last_meal);
        }
        else{
            res.status(404).json({message : "No meals found"});
        }
        
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default lastMealRouter;