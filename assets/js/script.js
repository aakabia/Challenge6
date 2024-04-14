let searchInput = document.querySelector("#citySearch");
let searchButton = document.querySelector("#searchB");
let cDate = document.querySelector("#date");
let date2 = document.querySelector("#date2");
let date3 = document.querySelector("#date3");
let date4 = document.querySelector("#date4");
let date5 = document.querySelector("#date5");
let date6 = document.querySelector("#date6");
const cityList = JSON.parse(localStorage.getItem("cities")) || [];


searchButton.addEventListener("click", getValue);
// Above, I set up my event listener and selected the input and button in my html.
// Also, I selected all the date areas in my html for my displaydate function
// Also, I recieved the items from local storage for a function later. 



function displaydate() {
  const now = dayjs().format("MM/DD/YYYY");
  const day2 = dayjs().add(1, "day").format("MM/DD/YYYY");
  const day3 = dayjs().add(2, "day").format("MM/DD/YYYY");
  const day4 = dayjs().add(3, "day").format("MM/DD/YYYY");
  const day5 = dayjs().add(4, "day").format("MM/DD/YYYY");
  const day6 = dayjs().add(5, "day").format("MM/DD/YYYY");

  console.log(now);
  console.log(day2);
  console.log(day3);
  console.log(day4);
  console.log(day5);
  console.log(day6);

  cDate.textContent = now;
  date2.textContent = day2;
  date3.textContent = day3;
  date4.textContent = day4;
  date5.textContent = day5;
  date6.textContent = day6;
}

displaydate();
// Above, I created a display date function withe the elements selected and using dayjs. 
// I formatted the dates and assigned them in their correrct area.
// last I called display date in order for the dates to always appear. 

function getValue(event) {
  event.preventDefault();
  let searchInputValue = searchInput.value.trim();

  if (searchInputValue !== "" && searchInputValue.includes(",")) {
    cityAndState = searchInputValue.split(",");
    city = cityAndState[0];
    state = cityAndState[1];

    cityUpper = city[0].toUpperCase() + city.slice(1);
    stateUpper = state[0].toUpperCase() + state.slice(1);
  } else {
    alert("Please pick a City , State !");
  }
  //Above, I get the city and state input seprated by a comma, there must be no space where the comma is.
  if (cityUpper.includes(" ")) {
    citySplit = cityUpper.split(" ");
    cityFirst = citySplit[0];
    citySecond = citySplit[1];
    citySecond = citySecond[0].toUpperCase() + citySecond.slice(1);
    cityUpper = cityFirst + " " + citySecond;
  }

  if (stateUpper.includes(" ")) {
    stateSPlit = stateUpper.split(" ");
    firstUpper = stateSPlit[0];
    secondUpper = stateSPlit[1];
    secondUpper = secondUpper[0].toUpperCase() + secondUpper.slice(1);
    stateUpper = firstUpper + " " + secondUpper;
  }
  // Above, is for if the city and state values have more than one word seperated by a space.
  console.log(cityUpper);
  console.log(stateUpper);

  getLatLonData(cityUpper, stateUpper);

  searchInput.value = "";

  // Above, I log those values to the scrren and call a new function passing new city and state as parameters.
}

function getLatLonData(cityUpper, stateUpper) {
  const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityUpper}&limit=5&appid=1f84100edd7f6cddf642b63a288eb2cd`;
  let statefound = false;
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  // Above, I get the url  for the lon and lat from api given on page.
  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.length === 0) {
            alert("Error City Not Found!");
          } else {
            console.log(data);
          }
          // Above, I fetch the data and return it in json format.
          for (i = 0; i < data.length; i++) {
            if (data[i].state === stateUpper) {
              statefound = true;

              let lat = data[i].lat;
              let lon = data[i].lon;

              let city = {
                name: cityUpper,
                state: stateUpper,
                lati: lat,
                long: lon,
              };
              // Above, I do a for loop for the data so it can match the exact output im looking for.
              cities.push(city);

              let citiesSerialized = JSON.stringify(cities);

              localStorage.setItem("cities", citiesSerialized);

              console.log(city);
              getWeatherInfo(lat, lon);
            }
            // Above, I log the data and save the object created from the data to local storage.
            if (!statefound) {
              alert("State Not found!");
              break;
            }
          }
        });
      }
    })
    // Above, is my alert if a state is not found
    .catch(function (error) {
      alert("Unable to connect to server!");
    });
  // Above, is my alert if the api is not working.
}

function getWeatherInfo(lat, lon) {
  const cityURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=1f84100edd7f6cddf642b63a288eb2cd`;
  // Above, I get the url to find precise location using lon and lat
  fetch(cityURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          //displayWeatherData(data)
        });
      }
    })
    // Above, I fetch the data turn it into json, log it for confirmation and pass it to the displayWeatherData function.
    .catch(function (error) {
      alert("Unable to connect to server!");
    });
  // Above, is for if the api fails.
}

function displayWeatherData() {
  console.log("hello");
}

displayWeatherData;
