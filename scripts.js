const cities = [
    { id: 0, name: "Riga", x: 0.445, y: 0.44 },
    { id: 1, name: "Daugavpils", x: 0.749, y: 0.817 },
    { id: 2, name: "Ventspils", x: 0.144, y: 0.282 },
    { id: 3, name: "Liepāja", x: 0.069, y: 0.587 },
    { id: 4, name: "Valmiera", x: 0.6, y: 0.25 },
    { id: 5, name: "Rēzekne", x: 0.84, y: 0.594 },
    // Add more cities with relative x and y coordinates (between 0 and 1)
];

document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map-container");
    const latviaMap = document.getElementById("latvia-map");
    const scoreElement = document.getElementById("score");


    let score = 0;
    let randomCity;
    generateRandomCity();

    const cityToGuess = document.createElement('h2');
    insertAfter(cityToGuess, document.querySelector("h1"));
    refreshGuessingCity();


    cities.forEach(city => {
        const cityDot = document.createElement("div");
        cityDot.classList.add("city-dot");
        cityDot.style.left = `${city.x * 100}%`;
        cityDot.style.top = `${city.y * 100}%`;

        cityDot.addEventListener("click", handleClickEvent(city));

        mapContainer.appendChild(cityDot);
    });

    function handleClickEvent(city) {
        // alert(`You guessed: ${city.name}`);
        if (city.id === randomCity.id) {
            score++;
            removeCityFromListAndUpdateIds();
            removeDot(cityDot);
            if (cities.length !== 0) {
                generateRandomCity()
                refreshGuessingCity();
            } else {
                refreshGuessingCity("You won!");
            }
        }
        console.log(cities);
        scoreElement.textContent = score;
    }

    function removeDot(dot) {
        dot.removeEventListener("click", handleClickEvent);
        dot.remove();
    }

    function removeCityFromListAndUpdateIds() {
        removeItemOnce(cities, randomCity);
    }

    function refreshGuessingCity(text = "") {
        cityToGuess.textContent = text === "" ? `You have to guess where is ${randomCity.name}` : text;
    }

    function generateRandomCity() {
        randomCity = cities[mixId()];
    }
});

function mixId() {
    return Math.floor(Math.random() * cities.length);
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}