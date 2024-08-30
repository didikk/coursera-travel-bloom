document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("searchBtn");
  const clearButton = document.getElementById("clearBtn");
  const searchBar = document.getElementById("searchBar");
  const resultsContainer = document.getElementById("resultsContainer");

  searchButton.addEventListener("click", function () {
    const query = searchBar.value.toLowerCase().trim();

    if (query) {
      fetch("data.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const filteredResults = filterData(data, query);
          displayResults(filteredResults);
        })
        .catch((error) => console.log("Error fetching data:", error));
    }
  });

  clearButton.addEventListener("click", function () {
    searchBar.value = "";
    resultsContainer.innerHTML = ""; // Clear results on clear button click
    resultsContainer.style.display = "none";
  });

  function filterData(data, query) {
    const results = [];

    // Search in countries and their cities
    data.countries.forEach((country) => {
      country.cities.forEach((city) => {
        if (city.name.toLowerCase().includes(query)) {
          results.push(city);
        }
      });
    });

    // Search in temples
    data.temples.forEach((temple) => {
      if (temple.name.toLowerCase().includes(query)) {
        results.push({
          name: temple.name,
          imageUrl: temple.imageUrl,
          description: temple.description,
        });
      }
    });

    // Search in beaches
    data.beaches.forEach((beach) => {
      if (beach.name.toLowerCase().includes(query)) {
        results.push({
          name: beach.name,
          imageUrl: beach.imageUrl,
          description: beach.description,
        });
      }
    });

    return results;
  }

  function displayResults(results) {
    resultsContainer.innerHTML = ""; // Clear previous results
    resultsContainer.style.display = "flex";

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      return;
    }

    results.forEach((result) => {
      resultsContainer.innerHTML += `
        <div class="rounded-2xl bg-white overflow-clip">
            <img
              src="${result.imageUrl}"
              alt=""
              class="w-full h-[300px] object-cover"
            />
            <h2 class="text-2xl font-bold m-4">${result.name}</h2>
            <p class="mx-4 text-gray-400">
              ${result.description}
            </p>
            <button class="bg-teal-600 text-white py-2 px-6 rounded-lg m-4">
              Visit
            </button>
          </div>
          `;
    });
  }
});
