import express from "express";
import knex from "../database_client.js";

const reservationRouter = express.Router();

//Returns all reservations
reservationRouter.get("/", async (req, res, next) => {
    try {
        const reservation = await knex("Reservation").select("*");
        res.json(reservation);
    } catch (error) {
        next(error);
    }
});

//Adds a new reservation to the database
reservationRouter.post("/", async (req, res, next) => {
    try {
        console.log(req.body);
        const data = req.body;
        await knex("Reservation").insert(data);
        res.status(200).json({ message: "created successfully" });
    } catch (error) {
        next(error);
    }
});

//GET reservations by id
reservationRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const reservation = await knex("Reservation").select('*').where('id',id);
        if (!reservation) {
            res.status(404).json({ message: 'Reservation not found' });
          } else {
            res.json(reservation);
          }
    } catch (error) {
        next(error);
    }
});

//Updates the Reservation by id
reservationRouter.put("/:id", async (req, res, next) => {
    try {
        const id  = req.params.id; 
        const updatedReservation = req.body; 
        const result = await knex('Reservation').where('id',id).update(updatedReservation);
    
        if (result) {
          res.status(200).json({ message: 'Reservation updated successfully' });
        } else {
          res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        next(error);
    }
});

//Deletes the Reservation by id
reservationRouter.delete("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedReservation = await knex("Reservation").where('id',id).del();
        if(deletedReservation){
            res.status(200).json({ "message": "deleted successfully" });
        }
        else{
            res.status(404).json({ "message": "Reservation not found" });
        }
        
    } catch (error) {
        next(error);
    }
});

export default reservationRouter;
