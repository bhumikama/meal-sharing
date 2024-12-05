export const fetchMeals = async (queryString) => {
  console.log("Query String:", queryString);
  const response = await fetch(
    `https://meal-sharing-backend-huuy.onrender.com/api/meals?${queryString}`
  );
  if (!response.ok) {
    console.error("Failed to fetch meals:", response.statusText);
    return [];
  }
  const data = await response.json();
  return data;
};

export const fetchReviews = async (mealId) => {
  const response = await fetch(`https://meal-sharing-backend-huuy.onrender.com/api/reviews/`);

  if (!response.ok) {
    console.error("ailed to fetch reviews :", response.statusText);
    return [];
  }
  const data = await response.json();
  return data;
};
