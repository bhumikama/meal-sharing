import MealList from "@/components/Meals/MealList";
async function fetchMeals() {
  try {
    const apiResponse = await fetch("http://localhost:3001/api/meals");
    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export default async function Recipes() {
  const mealList = await fetchMeals();
  if (!mealList) {
    return <div>Error loading meals. Please try again later.</div>;
  }
  return <MealList mealsList={mealList} />;
}
