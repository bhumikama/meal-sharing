import React from "react";
import MealCard from "./MealCard";
import styles from "./Meal.module.css";
function MealList({ mealsList }) {
  return (
    <div className={styles.collectionProducts}>
      <h2>
        Our
        <span> Meals</span>
      </h2>

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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MealList;
