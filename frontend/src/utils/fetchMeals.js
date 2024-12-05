export const fetchMeals = async (queryString) => {
  console.log("Query String:", queryString);
  const response = await fetch(
    `http://localhost:3001/api/meals?${queryString}`
  );
  if (!response.ok) {
    console.error("Failed to fetch meals:", response.statusText);
    return [];
  }
  const data = await response.json();
  return data;
};

export const fetchReviews = async (mealId) => {
  const response = await fetch(`http://localhost:3001/api/reviews/`);

  if (!response.ok) {
    console.error("ailed to fetch reviews :", response.statusText);
    return [];
  }
  const data = await response.json();
  return data;
};
