import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

//return all meals
mealsRouter.get("/", async (req, res, next) => {
  try {
    const query = knex("meal");
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

    if (!isNaN(maxPrice)) {
      query.where("price", "<", maxPrice);
    }
    if (!isNaN(availableReservations)) {
      //might be returned as a string, hence checking explicitly
      query
        .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
        .select("meal.id", "meal.max_reservations", "meal.title")
        .sum("reservation.number_of_guests as sum_of_guests")
        .groupBy("meal.id", "meal.max_reservations", "meal.title")
        .havingRaw(
          availableReservations === "true"
            ? "SUM(reservation.number_of_guests) < meal.max_reservations"
            : "SUM(reservation.number_of_guests) >= meal.max_reservations"
        ); //to make it refer to a column and not consider as a string using knex.ref() here
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
    const data = req.body;
    await knex("meal").insert(data);
    res.status(200).json({ message: "created successfully" });
  } catch (error) {
    next(error);
  }
});

//GET meals by id
// mealsRouter.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const meal = await knex("meal").where({ id }).first();
//     if (!meal) {
//       res.json({ message: "Meal not found" });
//     } else {
//       res.json(meal);
//     }
//   } catch (error) {
//     next(error);
//   }
// });

mealsRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query to get meal details along with current and available reservations
    const meal = await knex("meal")
      .leftJoin("reservation", "meal.id", "reservation.meal_id") // Left join to get reservation data
      .select(
        "meal.id",
        "meal.title",
        "meal.description",
        "meal.location",
        "meal.when",
        "meal.max_reservations",
        "meal.price",
        "meal.created_date",
        "meal.image_url",
        knex.sum("reservation.number_of_guests").as("current_reservations") // Sum of reservations
      )
      .where("meal.id", id)
      .groupBy("meal.id") // Grouping by meal to aggregate the reservations
      .first();

    // Calculate available reservations
    if (meal) {
      meal.available_reservations =
        meal.max_reservations - (meal.current_reservations || 0);
    }

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.json(meal); // Send the meal with available and current reservations
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
    const { id } = req.params;
    const updatedMeal = req.body;
    const meal = await knex("meal").where({ id }).update(updatedMeal);

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
    const { id } = req.params;
    const deletedMeal = await knex("meal").where({ id }).del();
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
