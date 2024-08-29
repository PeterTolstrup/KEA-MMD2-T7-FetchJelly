window.addEventListener("DOMContentLoaded", init);

const amout = 20;
const jellyURL = `https://jellybellywikiapi.onrender.com/api/Beans?pageSize=${amout}`;

let jellyTemplate;
let jellyContainer;

function init() {
  jellyTemplate = document.querySelector(".jelly_template");

  jellyContainer = document.querySelector(".jelly_container");

  fetch(jellyURL)
    .then(function (response) {
      console.log("response", response);
      return response.json();
    })
    .then(function (json) {
      console.log("json", json);
      showJelly(json.items);
    });
}

function showJelly(jellyJSON) {
  let jellyClone;

  console.log("jellyJSON[0]", jellyJSON[0]);

  jellyJSON.forEach((jelly) => {
    console.log("jelly", jelly);
    jellyClone = jellyTemplate.cloneNode(true).content;
    jellyClone.querySelector(".jelly_name").style.color = jelly.backgroundColor;

    jellyClone.querySelector(".jelly_article").href = `jelly.html?id=${jelly.id}`;

    jellyClone.querySelector(".jelly_image").src = jelly.imageUrl;
    jellyClone.querySelector(".jelly_image").alt = `Picture of a ${jelly.flavorName} jelly`;
    jellyClone.querySelector(".jelly_name").textContent = jelly.flavorName;
    jellyClone.querySelector(".jelly_tagline").textContent = jelly.groupName[0];
    jellyClone.querySelector(".jelly_description").textContent = jelly.description;

    jellyContainer.appendChild(jellyClone);
  });
}
