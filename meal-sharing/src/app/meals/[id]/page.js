"use client";
import React, { useState, useEffect } from "react";
import MealDetails from "@/components/Meals/MealDetails";
import { usePathname } from "next/navigation";

// Fetch function for meal details
const fetchMealsDetails = async (mealID) => {
  try {
    const apiResponse = await fetch(
      `http://localhost:3001/api/meals/${mealID}`
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
      `http://localhost:3001/api/reviews/${mealID}`
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

  // Function to handle review submission
  const handleReviewSubmit = async (newReview) => {
    try {
      // Post the new review to the API
      const response = await fetch(`http://localhost:3001/api/reviews/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        // Trigger review refetch after submission
        const updatedReviews = await fetchMealReviews(mealId);
        setReviewDetails(updatedReviews); // Update state with the new reviews
      } else {
        const result = await response.json();
        setError(result.message || "Failed to submit review.");
      }
    } catch (error) {
      setError("An error occurred while submitting the review.");
      console.error(error);
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
      />
    </div>
  );
}
