async function fetchMeals(endpoint, listId) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    const ulElement = document.getElementById(listId);
    ulElement.innerHTML = "";

    if (data.length === 0) {
      ulElement.innerHTML = `<li class="list-group-item text-danger">No meals found.</li>`;
      return;
    }
    if (Array.isArray(data)) {
      data.forEach((meal) => {
        const liElement = document.createElement("li");
        liElement.classList.add("list-group-item");
        liElement.innerHTML = `Meal ID: ${meal.id} | Title: ${meal.title}`;
        ulElement.appendChild(liElement);
      });
    } else {
      const liElement = document.createElement("li");
      liElement.classList.add("list-group-item");
      liElement.innerHTML = `Meal ID: ${data.id} | Title: ${data.title}`;
      ulElement.appendChild(liElement);
    }
  } catch (err) {
    document.getElementById(listId).innerHTML =
      `<li class="list-group-item text-danger">${err.message}.</li>`;
  }
}

fetchMeals("/api/future-meals", "future-meals");
fetchMeals("/api/past-meals", "past-meals");
fetchMeals("/api/all-meals", "all-meals");
fetchMeals("/api/first-meal", "first-meal");
fetchMeals("/api/last-meal", "last-meal");
