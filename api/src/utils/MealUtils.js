import knex from "../database_client.js";

// Function to fetch meals based on date comparison
export const getMealsByDateComparison = async (comparisonOperator) => {
  const now = new Date();
  // eslint-disable-next-line no-useless-catch
  try {
    const meals = await knex("Meal").select("*").where("when", comparisonOperator, now);
    return meals;
  } catch (error) {
    throw error; 
  }
};
