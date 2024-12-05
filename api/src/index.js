import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mealsRouter from "./routers/meals.js";
import reservationRouter from "./routers/reservations.js";
import reviewRouter from "./routers/review.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.json({
    name: "Meal Sharing API",
    version: "1.0.0",
    description:
      "An API for managing meals in a meal sharing app.",
    endpoints: [
      "/api/meals - manage meals",
      "/api/reservations - manage reservations",
    ],
  });
});

apiRouter.use("/meals", mealsRouter);
apiRouter.use("/reservations", reservationRouter);
apiRouter.use("/reviews", reviewRouter);

app.use("/api", apiRouter);

//middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err.status == 404) {
    res.status(404).json({ message: err.message });
  }
  res.status(500).json({ message: "An unexpected error occurred!" });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
