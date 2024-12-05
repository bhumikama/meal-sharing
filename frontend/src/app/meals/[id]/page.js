"use client";
import React, { useState, useEffect } from "react";
import MealDetails from "@/components/Meals/MealDetails";
import { usePathname } from "next/navigation";

// Fetch function for meal details
const fetchMealsDetails = async (mealID) => {
  try {
    const apiResponse = await fetch(
      `https://meal-sharing-backend-huuy.onrender.com/api/meals/${mealID}`
    );
    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching meal details:", error);
    return null;
  }
};

// Fetch function for meal reviews
const fetchMealReviews = async (mealID) => {
  try {
    const apiResponse = await fetch(
      `https://meal-sharing-backend-huuy.onrender.com/api/reviews/${mealID}`
    );
    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching meal reviews:", error);
    return null;
  }
};

export default function MealInfo() {
  const pathname = usePathname();
  const [mealId, setMealId] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);
  const [reviewDetails, setReviewDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (pathname) {
      const pathParts = pathname.split("/").filter(Boolean);
      const id = pathParts[pathParts.length - 1];
      setMealId(id);
    }
  }, [pathname]);

  // Fetch meal details and reviews when the component mounts or when mealId changes
  useEffect(() => {
    if (!mealId) return;
    const getMealData = async () => {
      try {
        const fetchedMealDetails = await fetchMealsDetails(mealId);
        const fetchedReviewDetails = await fetchMealReviews(mealId);

        if (!fetchedMealDetails || !fetchedReviewDetails) {
          setError("Error loading meals or reviews. Please try again later.");
          return;
        }

        setMealDetails(fetchedMealDetails);
        setReviewDetails(fetchedReviewDetails);
      } catch (err) {
        setError("An error occurred while fetching data.");
      }
    };

    getMealData();
  }, [mealId]); // Re-run when mealId changes

  const reFetchMealInfo = async () => {
    try {
      const updatedMealInfo = await fetchMealsDetails(mealId);
      if (updatedMealInfo) {
        setMealDetails(updatedMealInfo);
      } else {
        setError("Failed to re fetch meal data");
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    }
  };
  
  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch(`https://meal-sharing-backend-huuy.onrender.com/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
      const result = await response.json();

      if (response.ok) {
        // Trigger review refetch after successful submission
        const updatedReviews = await fetchMealReviews(mealId);
        setReviewDetails(updatedReviews);
      } else {
        if (result.errors) {
          // Return validation errors to the caller
          throw { validationErrors: result.errors, status: response.status };
        }
        // Handle generic server-side error
        throw {
          message: result.message || "Failed to submit review.",
          status: response.status,
        };
      }
    } catch (error) {
      // Re-throw error for the caller to handle
      throw error;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!mealDetails || !reviewDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MealDetails
        mealInfo={mealDetails}
        reviewInfo={reviewDetails}
        onReviewSubmit={handleReviewSubmit}
        refetchMealDetails={reFetchMealInfo}
      />
    </div>
  );
}
