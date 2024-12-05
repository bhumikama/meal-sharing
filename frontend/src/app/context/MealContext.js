"use client";
import { createContext, useEffect, useState } from "react";

export const MealContext = createContext();

export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch("http://localhost:3001/api/meals");
      const mealData = await apiResponse.json();
      if (apiResponse.ok) {
        setMeals(mealData);
      } else {
        console.log(mealData.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch when the component is mounted
    fetchMeals();

    // Set an interval to refetch every 5 seconds
    const interval = setInterval(() => {
      fetchMeals();
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures it runs once when the component mounts

  return (
    <MealContext.Provider
      value={{ meals, isLoading, refetchMeals: fetchMeals }}
    >
      {children}
    </MealContext.Provider>
  );
};
