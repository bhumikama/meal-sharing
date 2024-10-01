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
    const data = req.body;
    await knex("review").insert(data);
    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

//GET Reviews by id
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await knex("review").where("id", id).first();
    if (!result) {
      res.json({ message: "Review not found" });
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
    const id = req.params.id;
    const updatedReview = req.body;
    const result = await knex("review").where("id", id).update(updatedReview);

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
    const id = req.params.id;
    const deletedReview = await knex("review").where("id", id).del();
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
