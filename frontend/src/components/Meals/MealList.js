import React, { useState } from "react";
import MealCard from "./MealCard";
import styles from "./Meal.module.css";

function MealList({ mealsList }) {
  return (
    <div>
      <div className={styles.mainContainer}>
        {mealsList.map((meal, index) => (
          <MealCard
            key={`meal-${index}`}
            mealId={meal.id}
            title={meal.title}
            imgUrl={meal.image_url}
            location={meal.location}
            price={meal.price}
            description={meal.description}
            available_spots={meal.available_spots}
            average_rating={meal.average_stars.toFixed(1)}
          />
        ))}
      </div>
    </div>
  );
}

export default MealList;
