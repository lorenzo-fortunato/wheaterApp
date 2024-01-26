const form = document.querySelector(".top-banner form");
const input = document.querySelector('input');
const msg = document.querySelector('.msg');
const list = document.querySelector('.ajax-section .cities');
const buttonClear = document.querySelector('.clear');
const buttonPosition = document.querySelector('.position');
let listItems;
let listItemsArray;
let count = 0;

// const apiKey = "la_tua_key";    -> è necessario valorizzare questa variabile, vedi README.txt

function resetAndFocus() {
  form.reset();
  input.focus();
}

buttonClear.addEventListener("click", e => {
  const unordered = document.querySelector(".cities");
  unordered.innerHTML = "";
  msg.textContent = "";
  count = 0;
})

/// Http call using ajax, view otherAsync.js for alternatives
function fetchData(myUrl) {
  let http = new XMLHttpRequest();
  http.open("GET", myUrl, true);
  http.send();

  http.responseType = "json";
  http.onload = () => {
    if (http.readyState == 4 && http.status == 200) {
      const data = http.response;

      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
                  <h2 class="city-name" data-name="${name},${sys.country}">
                    <span>${name}</span>
                    <sup>${sys.country}</sup>
                  </h2>
                  <div class="city-temp">
                    ${Math.round(main.temp)}
                    <sup>°C</sup>
                  </div>
                  <figure>
                    <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
                    <figurecaption>${weather[0]["description"]}</figcaption>
                  </figure>`;

      li.innerHTML = markup;
      list.appendChild(li);
    } else {
      msg.textContent = "Please search for a valid city 😩"
    }
  }
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const inputValue = input.value;
  listItems = list.querySelectorAll('.ajax-section .city');
  listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";

      if (inputValue.includes(",")) {
        if (inputValue.split(",")[1].length > 2) {
          inputValue = inputValue.split(",")[0];
          content = el.querySelector(".city-name span").textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputValue.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent
        } ...otherwise be more specific by providing the country code as well 😉`;
      resetAndFocus();
      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  fetchData(url);

  msg.textContent = "";
  resetAndFocus();
});

async function successCallBack(pos) {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  console.log(`Your current latitude is: ${lat}`);
  console.log(`Your current longitude is: ${lon}`);

  const urlLatLon = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(urlLatLon);
  const data = await response.json();
  const myPosition = data[0].name;

  const urlMyPosition = `https://api.openweathermap.org/data/2.5/weather?q=${myPosition}&appid=${apiKey}&units=metric`;
  fetchData(urlMyPosition);
  resetAndFocus();
}

function errorCallBAck() {
  msg.textContent = "Non ti sto trovando..."
}

buttonPosition.addEventListener("click", e => {
  if (count == 0) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallBack, errorCallBAck);
    }
  } else {
    msg.textContent = "You already know the wheater in your locality!"
  }
  count++;
})



