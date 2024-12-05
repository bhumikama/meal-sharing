import styles from "./Meal.module.css";
import React from "react";
import StarsIcon from "@mui/icons-material/Stars";
import PlaceIcon from "@mui/icons-material/Place";
import Link from "next/link";

const MealCard = ({
  imgUrl,
  title,
  location,
  description,
  price,
  mealId,
  available_spots,
  average_rating,
}) => {
  return (
    <Link href={`/meals/${mealId}`} passHref>
      <section className={styles.productContainer}>
        <div className={`${styles.card} cursor-pointer`}>
          <div className={styles.cardImg}>
            <img src={imgUrl} alt={`Image of ${title}`} />
            {available_spots > 0 ? (
              <div className={styles.spotsBanner}>
                {available_spots} spot{available_spots > 1 ? "s" : ""} left
              </div>
            ) : (
              <div
                className={styles.spotsBanner}
                style={{ backgroundColor: "red" }}
              >
                Fully booked
              </div>
            )}
          </div>
          <div className={styles.cardInfo}>
            <h2>{title}</h2>
            <div className={styles.starRating}>
              {[...Array(5)].map((_, index) => (
                <StarsIcon
                  key={index}
                  sx={{
                    color: index < average_rating ? "orange" : "lightgray",
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-[#202125] mb-1 line-clamp-1">
              {description}
            </p>
            <div className={styles.infoRow}>
              <span className={styles.location}>
                <PlaceIcon
                  sx={{
                    color: "#29ade5",
                    fontSize: "small",
                    marginRight: "1px",
                  }}
                />
                {location}
              </span>
              <span className={styles.price}>DKK {price}</span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default MealCard;
