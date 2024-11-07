import styles from "./Meal.module.css";
import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import StarsIcon from "@mui/icons-material/Stars";
import PlaceIcon from "@mui/icons-material/Place";
import Link from "next/link";

const MealCard = ({ imgUrl, title, location, price, mealId }) => {
  return (
    <section className={styles.productContainer}>
      <div className={styles.card}>
        <div className={styles.cardImg}>
          <img src={imgUrl} alt={`ìmg of ${title}`} />
          <span>
            <StarsIcon />
          </span>
        </div>
        <div className={styles.cardInfo}>
          <h2>{title}</h2>
          <div className={styles.starRating}>
            <span>
              <StarsIcon sx={{ color: "orange" }} />
            </span>
            <span>
              <StarsIcon sx={{ color: "orange" }} />
            </span>
            <span>
              <StarsIcon sx={{ color: "orange" }} />
            </span>
            <span>
              <StarsIcon sx={{ color: "orange" }} />
            </span>
          </div>
          <ul className="flex justify-between">
            <li>
              <PeopleIcon sx={{ color: "orange" }} />
              10
            </li>
            <li>
              <PlaceIcon sx={{ color: "orange" }} />
              {location}
            </li>
          </ul>
          <button className={styles.cardButton}>
            <Link href={`/meals/${mealId}`}>Read More</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MealCard;
