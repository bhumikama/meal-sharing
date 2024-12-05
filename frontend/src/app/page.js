"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import MealCard from "@/components/Meals/MealCard";
import { MealContext } from "./context/MealContext";

export default function Home() {
  const { meals, isLoading } = useContext(MealContext);
  const topMeals = meals.slice(0, 3);
  const cardMeals = meals.slice(3, 6);

  // State for the background image
  const [backgroundImage, setBackgroundImage] = useState("background_pic.jpg");

  // Function to update the background
  const handleCardClick = (imgUrl) => {
    setBackgroundImage(imgUrl);
  };

  return (
    <div className="min-h-screen w-full">
      {/* Full-width Background Section */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <p className="text-2xl sm:text-4xl font-extrabold text-white leading-snug text-shadow-md">
            Craving Something Delicious?
            <br />
            Your Next Favorite Meal Awaits
          </p>
        </div>

        {/* Overlay Cards */}
        <div className="absolute w-full -bottom-[80px] sm:-bottom-[100px] flex justify-center gap-4 sm:gap-6 md:gap-8">
          {topMeals.map((meal, index) => (
            <div
              key={`meal-${index}`}
              className="flex items-center bg-white shadow-lg rounded-md overflow-hidden cursor-pointer hover:scale-105 transition-transform w-[250px] sm:w-[300px] h-[100px] sm:h-[120px]"
              onClick={() => handleCardClick(meal.image_url)}
            >
              {/* Image Section */}
              <img
                src={meal.image_url}
                alt={meal.title}
                className="w-[30%] sm:w-[40%] h-full object-cover"
              />

              {/* Title Section */}
              <div className="flex-1 p-2">
                <h3 className="text-sm sm:text-md font-bold text-[#202125]">
                  {meal.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meals Section */}
      <div className="flex flex-col items-center mt-[100px] sm:mt-[150px] px-[20px] sm:px-[40px] lg:px-[160px] gap-[30px] sm:gap-[40px]">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Discover Our <span className="text-[#29ade5]">Top Meals</span>
        </h2>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cardMeals.map((meal, index) => (
              <MealCard
                key={`meal-${index}`}
                mealId={meal.id}
                title={meal.title}
                description={meal.description}
                imgUrl={meal.image_url}
                location={meal.location}
                price={meal.price}
                available_spots={meal.available_spots}
                average_rating={meal.average_stars.toFixed(1)}
              />
            ))}
          </div>
        </div>

        {/* Explore More Button */}
        <Link href={"/meals"}>
          <button className="bg-[#29ade5] text-white p-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-[#1d87c1] hover:shadow-lg hover:scale-105">
            Explore More
          </button>
        </Link>
      </div>
    </div>
  );
}
