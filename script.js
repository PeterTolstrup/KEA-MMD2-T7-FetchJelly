window.addEventListener("DOMContentLoaded", init);

const beerURL = "https://api.punkapi.com/v2/beers";

let beerTemplate;
let beerContainer;

function init() {
  beerTemplate = document.querySelector(".beer_template");

  beerContainer = document.querySelector(".beer_container");

  fetch(beerURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showBeers(json);
    });
}

function showBeers(beerJSON) {
  let beerClone;

  console.log("beerJSON", beerJSON[0]);

  beerJSON.forEach((beer) => {
    beerClone = beerTemplate.cloneNode(true).content;
    beerClone.querySelector(".beer_link").href = `beer.html?id=${beer.id}`;
    beerClone.querySelector(".beer_abv_data").textContent = beer.abv;

    if (beer.abv >= 5.5) {
      beerClone.querySelector(".beer_strong").classList.remove("hide");
      beerClone.querySelector(".beer_article").classList.add("strong");
    } else if (beer.abv <= 4.4) {
      beerClone.querySelector(".beer_article").classList.add("mild");
    }

    if (beer.method.twist) {
      beerClone.querySelector(".beer_twist").classList.remove("hide");
      beerClone.querySelector(".beer_article").classList.add("twist");
    }

    beerClone.querySelector(".beer_image").src = beer.image_url;
    beerClone.querySelector(".beer_image").alt = `Picture of a ${beer.name} beer`;
    beerClone.querySelector(".beer_name").textContent = beer.name;
    beerClone.querySelector(".beer_tagline").textContent = beer.tagline;
    beerClone.querySelector(".beer_description").textContent = beer.description;

    beerContainer.appendChild(beerClone);
  });
}
