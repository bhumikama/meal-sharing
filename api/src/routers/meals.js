import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

//return all meals
mealsRouter.get("/", async (req, res, next) => {
  try {
    const query = knex("Meal");
    const {
      maxPrice,
      availableReservations,
      title,
      dateAfter,
      dateBefore,
      limit,
      sortKey,
      sortDir,
    } = req.query;
    console.log(`maxPrice = ${maxPrice}`);
    console.log(`title = ${title}`);
    console.log(`limit = ${limit}`);
    console.log(`dateafter = ${dateAfter}`);
    console.log(`datebefore = ${dateBefore}`);
    console.log(`availableReservation = ${availableReservations}`);

    if (maxPrice !== undefined) {
      query.where("price", "<", maxPrice);
    }
    if (availableReservations !== undefined) {
      if (availableReservations === "true") {
        //might be returned as a string, hence checking explicitly
        query
          .leftJoin("Reservation", "Meal.id", "=", "Reservation.meal_id")
          .select("Meal.id", "Meal.max_reservations", "Meal.title")
          .sum("Reservation.number_of_guests as sum_of_guests")
          .groupBy("Meal.id", "Meal.max_reservations", "Meal.title")
          .having("sum_of_guests", "<", knex.ref("Meal.max_reservations")); //to make it refer to a column and not consider as a string using knex.ref() here
      } else {
        query
          .leftJoin("Reservation", "Meal.id", "=", "Reservation.meal_id")
          .select("Meal.id", "Meal.max_reservations", "Meal.title")
          .sum("Reservation.number_of_guests as sum_of_guests")
          .groupBy("Meal.id", "Meal.max_reservations", "Meal.title")
          .having("sum_of_guests", ">=", knex.ref("Meal.max_reservations"));
      }
    }

    if (title !== undefined) {
      query.where("title", "like", `%${title}%`); //performing a partial match here
    }
    if (dateAfter !== undefined) {
      query.where("when", ">", dateAfter);
    }
    if (dateBefore !== undefined) {
      query.where("when", "<", dateBefore);
    }
    if (limit !== undefined) {
      query.limit(limit);
    }
    if (sortKey !== undefined) {
      if (sortKey == "price") {
        query.orderBy("price", sortDir !== undefined ? sortDir : "asc");
      }
      if (sortKey == "max_reservations") {
        query.orderBy(
          "max_reservations",
          sortDir !== undefined ? sortDir : "asc"
        );
      }
    }

    const meals = await query;
    res.json(meals);
  } catch (error) {
    next(error);
  }
});

//insert meal
mealsRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await knex("Meal").insert(data);
    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

//GET meals by id
mealsRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = await knex("Meal").where("id", id).first();
    if (!meal) {
      res.json({ message: "Meal not found" });
    } else {
      res.json(meal);
    }
  } catch (error) {
    next(error);
  }
});

// GET api/meals/:meal_id/reviews
mealsRouter.get("/:meal_id/reviews", async (req, res, next) => {
  try {
    const id = req.params.meal_id;
    const reviewsForMeal = await knex("review").where("meal_id", id);
    if (reviewsForMeal.length == 0) {
      res.json({ message: "Meal not found" });
    } else {
      res.json(reviewsForMeal);
    }
  } catch (error) {
    next(error);
  }
});

//Updates the meal by id
mealsRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedMeal = req.body;
    const meal = await knex("Meal").where("id", id).update(updatedMeal);

    if (meal) {
      res.status(200).json({ message: "Meal updated successfully" });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    next(error);
  }
});

//Deletes the meal by id
mealsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedMeal = await knex("Meal").where("id", id).del();
    if (deletedMeal) {
      res.status(200).json({ message: "deleted successfully" });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    next(error);
  }
});

export default mealsRouter;
