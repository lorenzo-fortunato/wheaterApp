// *** HTTP call using fectchAPI ***

// function fetchData(myUrl) {
//   fetch(myUrl)
//         .then(res => res.json())
//         .then(data => {
//             const { main, name, sys, weather } = data;
//             const icon = `https://openweathermap.org/img/wn/${
//                 weather[0]["icon"]
//               }@2x.png`;

//             const li = document.createElement("li");
//             li.classList.add("city");
//             const markup = `
//                 <h2 class="city-name" data-name="${name},${sys.country}">
//                  <span>${name}</span>
//                  <sup>${sys.country}</sup>
//                 </h2>
//                 <div class="city-temp">
//                  ${Math.round(main.temp)}
 //                 <sup>°C</sup>
//                 </div>
//                 <figure>
//                  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
//                  <figurecaption>${weather[0]["description"]}</figcaption>
//                 </figure>`;

//             li.innerHTML = markup;
//             list.appendChild(li);
//         })
//         .catch(() => {
//             msg.textContent = "Please search for a valid city 😩"
//         });
// }




// *** HTTP call using async/await ***

// async function fetchData(myUrl) {
//   try {
//     const response = await fetch(myUrl);
//     const data = await response.json();
//     const { main, name, sys, weather } = data;
//             const icon = `https://openweathermap.org/img/wn/${
//                 weather[0]["icon"]
//               }@2x.png`;

//             const li = document.createElement("li");
//             li.classList.add("city");
//             const markup = `
//                 <h2 class="city-name" data-name="${name},${sys.country}">
//                  <span>${name}</span>
//                  <sup>${sys.country}</sup>
//                 </h2>
//                 <div class="city-temp">
//                  ${Math.round(main.temp)}
//                  <sup>°C</sup>
//                 </div>
//                 <figure>
//                  <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
//                  <figurecaption>${weather[0]["description"]}</figcaption>
//                 </figure>`;

//             li.innerHTML = markup;
//             list.appendChild(li);
//   } catch(error) {
//     msg.textContent = "Please search for a valid city 😩"
//   } 
// }