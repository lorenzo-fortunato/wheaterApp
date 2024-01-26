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

buttonClear.addEventListener("click", e => {
  const unordered = document.querySelector(".cities");
  unordered.innerHTML = "";
  msg.textContent = "";
  count = 0;
})

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



