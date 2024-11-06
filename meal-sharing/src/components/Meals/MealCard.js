import styles from "./Meal.module.css";
import React from "react";
// import PlaceIcon from "@mui/icons-material/Place";

const MealCard = ({ imgUrl, title, location, price }) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.productImageDiv}>
        <img
          src={imgUrl}
          alt={`image of ${title}`}
          className={styles.front_image}
        />
      </div>

      <div className={styles.productInfo}>
        <div className={styles.productName}>
          <h5>{title}</h5>
          <p>
            {/* <PlaceIcon /> */}
            {location}
          </p>
          <p>Kr.{price}</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
