window.addEventListener("DOMContentLoaded", initBeer);

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

function initBeer() {
  fetch(`https://api.punkapi.com/v2/beers/${id}`)
    .then((response) => response.json())
    .then((json) => {
      showSingleBeer(json);
    });
}

function showSingleBeer(beer) {
  console.log("beer", beer);

  document.querySelector("h1").textContent = beer[0].name;
  document.querySelector("header p").textContent = beer[0].tagline;

  document.querySelector(".single_beer_describtion").textContent = beer[0].description;
  document.querySelector(".single_beer_tips").textContent = beer[0].brewers_tips;

  document.querySelector(".single_beer_info img").src = beer[0].image_url;
  document.querySelector(".single_beer_info p").textContent = `Beer by ${beer[0].contributed_by}`;

  console.log("food_pairing", beer[0].food_pairing);

  let foodPairingList = document.querySelector(".single_beer_info ul");
  beer[0].food_pairing.forEach((paring) => {
    const item = document.createElement("li");
    item.textContent = paring;
    foodPairingList.appendChild(item);
  });
}
