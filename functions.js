function resetAndFocus() {
    form.reset();
    input.focus();
}

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
    msg.textContent = "I'm not able to find you..."
  }