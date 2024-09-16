import express from "express";
import knex from "../database_client.js";

const firstMealRouter = express.Router();


firstMealRouter.get('/', async (req, res) => {
    try {
        const first_meal =  await knex('Meal').orderBy('id','asc').first();
        if(first_meal){
            res.json(first_meal);
        }
        else{
            res.status(404).json({message : "No meals found"});
        }
        
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

export default firstMealRouter;