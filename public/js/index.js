// console.log("client side js file is loaded");


const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const locationURL = "http://localhost:3000/weather?address=" + searchText.value;
    document.querySelector("#location").textContent = "Loading...";
    document.querySelector("#forecast").textContent = "";
    fetch(locationURL).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                document.querySelector("#location").textContent = data.error;
                document.querySelector("#forecast").textContent = "";
            }
            else {
                document.querySelector("#location").textContent = data.location;
                document.querySelector("#forecast").textContent = data.forecast;
            }
        });
    });
});