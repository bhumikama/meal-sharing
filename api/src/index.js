import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import allMealsRouter from "./routers/all-meals.js";
import firstMealRouter from "./routers/first-meal.js";
import lastMealRouter from "./routers/last-meal.js";
import futureMealsRouter from "./routers/future-meals.js";
import pastMealsRouter from "./routers/past-meals.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();


apiRouter.get("/", async (req, res) => {
  // res.json({ message : "Welcome to meal sharing API" ,
  //   description: "This API provides routes to view meal information.",
  //   routes: {
  //     "/api/future-meals": "Meals scheduled for the future.",
  //     "/api/past-meals": "Meals that have already occurred.",
  //     "/api/all-meals": " Get All meals that are sorted by ID.",
  //     "/api/first-meal": "Get the meal with the smallest ID.",
  //     "/api/last-meal": "Get the meal with the largest ID.",
  //   }
  // });
  res.send(`<h1>Welcome to meal sharing API</h1>
            <p>This API provides routes to view meal information</p>
            <ul>
            <li><strong>/api/future-meals":</strong> "Meals scheduled for the future.</li>
           <li><strong>/api/past-meals":</strong> "Meals that have already occurred.</li>
          <li><strong>/api/all-meals": "</strong> Get All meals that are sorted by ID.</li>
          <li><strong>/api/first-meal":</strong> "Get the meal with the smallest ID.</li>
          <li><strong>/api/last-meal":</strong> "Get the meal with the largest ID.</li>
          </ul>
      `);
    
  
});

apiRouter.use("/future-meals",futureMealsRouter);
apiRouter.use("/past-meals",pastMealsRouter);
apiRouter.use("/all-meals",allMealsRouter);
apiRouter.use("/first-meal",firstMealRouter);
apiRouter.use("/last-meal",lastMealRouter);

app.use("/api", apiRouter);


app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
