import express from "express";
import knex from "../database_client.js";

const reviewRouter = express.Router();

//Returns all Reviews
reviewRouter.get("/", async (req, res, next) => {
  try {
    const allReviews = await knex("review");
    res.json(allReviews);
  } catch (error) {
    next(error);
  }
});

//Adds a new Review to the database
reviewRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { meal_id, title, description, stars } = req.body;

    // validation for required fields
    if (!meal_id || !title || !description || !stars) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    await knex("review").insert({
      meal_id,
      title,
      description,
      stars,
      created_date: new Date(),
    });

    res.status(200).json({ message: "Review added successfully!" });
  } catch (error) {
    console.error("Error adding reservation:", error);
    next(error);
  }
});

//GET Reviews by id
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await knex("review").where({ meal_id: id });
    if (result.length === 0) {
      res.json({ message: "No Reviews were found for this meal" });
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

//Updates the Review by id
reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedReview = req.body;
    const result = await knex("review").where({ id }).update(updatedReview);

    if (result) {
      res.status(200).json({ message: "Review updated successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
});

//Deletes the Review by id
reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedReview = await knex("review").where({ id }).del();
    if (deletedReview) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default reviewRouter;
