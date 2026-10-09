const map = L.map("map").setView([45, 20], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function loadCities() {
    const response = await fetch("cities.json");
    const cities = await response.json();

    displayCities(cities);
}

function displayCities(cities) {
    cities.forEach(city => {
        const marker = L.marker([
            Number(city.lat),
            Number(city.long)
        ]).addTo(map);

        marker.bindPopup(city.name);

        marker.on("click", () => {
            showCity(city);
        });
    });
}


function showCity(city) {
    document.querySelector("#city-name").textContent = city.name;
    document.querySelector("#city-country").textContent = city.country;

    const factsList = document.querySelector("#city-facts");
    factsList.innerHTML = "";

    const facts = [
        "Population: " + city.population,
        city.fact,
        "Country: " + city.country,
        "Latitude: " + city.lat,
        "Longitude: " + city.long
    ];

    facts.forEach(fact => {
        const item = document.createElement("li");
        item.textContent = fact;
        factsList.appendChild(item);
    });
}

loadCities();