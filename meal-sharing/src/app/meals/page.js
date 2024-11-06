import MealList from "@/components/Meals/MealList";
async function fetchMeals() {
  try {
    const apiResponse = await fetch("http://localhost:3001/api/meals");
    const data = await apiResponse.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function Recipes() {
  const mealList = await fetchMeals();
  return <MealList mealsList={mealList} />;
}
