import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import allMealsRouter from "./routers/all-meals.js";
import firstMealRouter from "./routers/first-meal.js";
import lastMealRouter from "./routers/last-meal.js";
import futureMealsRouter from "./routers/future-meals.js";
import pastMealsRouter from "./routers/past-meals.js";
import mealsRouter from "./routers/meals.js";
import reservationRouter from "./routers/reservations.js";
import reviewRouter from "./routers/review.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

const apiRouter = express.Router();

apiRouter.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

apiRouter.use("/future-meals", futureMealsRouter);
apiRouter.use("/past-meals", pastMealsRouter);
apiRouter.use("/all-meals", allMealsRouter);
apiRouter.use("/first-meal", firstMealRouter);
apiRouter.use("/last-meal", lastMealRouter);
apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationRouter);
apiRouter.use("/reviews", reviewRouter);

app.use("/api", apiRouter);

//middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.status == 404) {
    res.status(404).json({ error: err.message });
  }
  res.status(500).json({ error: "An unexpected error occurred!" });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
