import express from "express";
import knex from "../database_client.js";

const mealsRouter = express.Router();

//return all meals
// mealsRouter.get("/", async (req, res, next) => {
//   try {
//     const query = knex("meal");
//     const {
//       maxPrice,
//       availableReservations,
//       title,
//       dateAfter,
//       dateBefore,
//       limit,
//       sortKey,
//       sortDir,
//     } = req.query;

//     if (!isNaN(maxPrice)) {
//       query.where("price", "<", maxPrice);
//     }
//     if (!isNaN(availableReservations)) {
//       //might be returned as a string, hence checking explicitly
//       query
//         .leftJoin("reservation", "meal.id", "=", "reservation.meal_id")
//         .select("meal.id", "meal.max_reservations", "meal.title")
//         .sum("reservation.number_of_guests as sum_of_guests")
//         .groupBy("meal.id", "meal.max_reservations", "meal.title")
//         .havingRaw(
//           availableReservations === "true"
//             ? "SUM(reservation.number_of_guests) < meal.max_reservations"
//             : "SUM(reservation.number_of_guests) >= meal.max_reservations"
//         ); //to make it refer to a column and not consider as a string using knex.ref() here
//     }

//     if (title !== undefined) {
//       query.where("title", "like", `%${title}%`); //performing a partial match here
//     }
//     if (dateAfter !== undefined) {
//       query.where("when", ">", dateAfter);
//     }
//     if (dateBefore !== undefined) {
//       query.where("when", "<", dateBefore);
//     }
//     if (limit !== undefined) {
//       query.limit(limit);
//     }
//     if (sortKey !== undefined) {
//       if (sortKey == "price") {
//         query.orderBy("price", sortDir !== undefined ? sortDir : "asc");
//       }
//       if (sortKey == "max_reservations") {
//         query.orderBy(
//           "max_reservations",
//           sortDir !== undefined ? sortDir : "asc"
//         );
//       }
//     }

//     const meals = await query;
//     res.json(meals);
//   } catch (error) {
//     next(error);
//   }
// });

mealsRouter.get("/", async (req, res, next) => {
  try {
    // let query = knex("meal")
    //   .select(
    //     "meal.*",
    //     knex.raw(
    //       "(meal.max_reservations - COALESCE(reservation_totals.total_guests, 0)) as available_spots"
    //     )
    //   )
    //   // Join reviews
    //   .leftJoin(
    //     knex("review").select("meal_id").groupBy("meal_id").as("review_totals"),
    //     "meal.id",
    //     "review_totals.meal_id"
    //   )
    //   // Join reservations with totals
    //   .leftJoin(
    //     knex("reservation")
    //       .select("meal_id")
    //       .sum("number_of_guests as total_guests")
    //       .groupBy("meal_id")
    //       .as("reservation_totals"),
    //     "meal.id",
    //     "reservation_totals.meal_id"
    //   );
    let query = knex("meal")
      .select(
        "meal.*",
        knex.raw(
          "ROUND(COALESCE(avg_reviews.avg_stars, 0), 1) as average_stars"
        ),
        knex.raw(
          "(meal.max_reservations - COALESCE(reservation_totals.total_guests, 0)) as available_spots"
        )
      )
      .leftJoin(
        knex("review")
          .select("meal_id")
          .avg("stars as avg_stars")
          .groupBy("meal_id")
          .as("avg_reviews"),
        "meal.id",
        "avg_reviews.meal_id"
      )
      .leftJoin(
        knex("reservation")
          .select("meal_id")
          .sum("number_of_guests as total_guests")
          .groupBy("meal_id")
          .as("reservation_totals"),
        "meal.id",
        "reservation_totals.meal_id"
      );
    // Filter by title
    if (req.query.title) {
      query = query.where("title", "like", `%${req.query.title}%`);
    }

    // Filter by available reservations
    if (req.query.availableReservations === "true") {
      query = query.whereRaw(
        "(meal.max_reservations - COALESCE(reservation_totals.total_guests, 0)) > 0"
      );
    }

    // Sort results
    if (req.query.sortKey) {
      const { sortKey, sortDir } = req.query;
      const allowedKeysToSort = [
        "scheduled_at",
        "max_reservations",
        "price",
        "average_stars",
      ];

      if (allowedKeysToSort.includes(sortKey)) {
        query = query.orderBy(sortKey, sortDir === "desc" ? "desc" : "asc");
      }
    }

    // Execute the query
    const mealsSummary = await query;

    // Format the response
    const formattedMealSummaries = mealsSummary.map((meal) => ({
      ...meal,
      available_spots: parseInt(meal.available_spots, 10),
      average_stars: parseFloat(meal.average_stars),
    }));

    res.json(formattedMealSummaries);
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
