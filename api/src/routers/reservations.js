import express from "express";
import knex from "../database_client.js";
import { addReservationSchema } from "../validate/validator.js";
import { validateSchema } from "../validate/validator.js";
const reservationRouter = express.Router();

//Returns all reservations
reservationRouter.get("/", async (req, res, next) => {
  try {
    const reservation = await knex("Reservation");
    res.json(reservation);
  } catch (error) {
    next(error);
  }
});

//Adds a new reservation to the database
reservationRouter.post(
  "/",
  validateSchema(addReservationSchema),
  async (req, res, next) => {
    try {
      console.log(req.body);
      const {
        number_of_guests,
        meal_id,
        contact_name,
        contact_email,
        contact_phonenumber,
      } = req.value.body;

      console.log("add new reservation:", req.value.body);

      // validation for required fields
      if (!number_of_guests || !meal_id || !contact_name || !contact_email) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      await knex("reservation").insert({
        meal_id,
        number_of_guests,
        contact_name,
        contact_email,
        contact_phonenumber,
        created_date: new Date(),
      });

      res.status(200).json({ message: "Reservation added successfully!" });
    } catch (error) {
      console.error("Error adding reservation:", error);
      next(error);
    }
  }
);

//GET reservations by id
reservationRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const reservation = await knex("Reservation").where("id", id).first();
    if (!reservation) {
      res.json({ message: "Reservation not found" });
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
    const id = req.params.id;
    const updatedReservation = req.body;
    const result = await knex("Reservation")
      .where("id", id)
      .update(updatedReservation);

    if (result) {
      res.status(200).json({ message: "Reservation updated successfully" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    next(error);
  }
});

//Deletes the Reservation by id
reservationRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedReservation = await knex("Reservation").where("id", id).del();
    if (deletedReservation) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default reservationRouter;
