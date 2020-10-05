const itemInput = document.querySelector("#input");
const addIngredient = document.querySelector(".add-ingredients");
const searchIngredients = document.querySelector(".search-ingredients");
const ingredientOutput = document.querySelector(".ingredient-output");
const remove = document.querySelector(".remove");
const clear = document.querySelector(".clear");
const search = document.querySelector(".search-ingredients");
const recipeOutput = document.querySelector(".output-section");
const smallMessage = document.querySelector(".small");

let imgOutput;
let arrayTitle = [];
let arrayImages = [];
removeItemArray = [];

let ingredients = [];

async function calculate(items) {
  const reponse = await fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&ranking=1&ignorePantry=false&ingredients=${ingredients[0]}%2C${ingredients[1]}%2C${ingredients[2]}
      )}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "8a64ae26eemsh93a45c3b1bb01fdp190d62jsn621c8d3c5ec5",
      },
    }
  )
    .then((response) => {
      response.json().then((data) => showdata(data));
    })

    .catch((err) => {
      console.log(err);
    });
}

clear.addEventListener("click", clearList);

addIngredient.addEventListener("click", function () {
  if (itemInput.value === "") {
    return showError();
  } else if (ingredients.length >= 5) {
    showError2();
  }
  ingredients.push(itemInput.value);

  addItemToDom(itemInput.value);

  itemInput.value = "";
});

function addItemToDom(item) {
  if (ingredients.length <= 5) {
    let newEl = document.createElement("li");
    newEl.classList.add("new-item");
    newEl.innerHTML = `<p class="new-item">${item}<button class="remove">x</button></p>`;
    ingredientOutput.appendChild(newEl);
  } else showError2();
  addEventListenerRemove();
}
function addEventListenerRemove() {
  const remove = document.querySelectorAll(".remove");

  remove.forEach((button) => button.addEventListener("click", removeItem));
}
function removeItem(e) {
  let ElValue = e.target.parentNode.textContent;

  removeItemString = e.target.parentNode.textContent;

  newString = removeItemString.slice(0, removeItemString.length - 2);
  arrayIndex = ingredients.indexOf(newString);

  ingredients.splice(arrayIndex, 1);
}

function clearList() {
  ingredientOutput.innerHTML = "";
  ingredients = [];
}

search.addEventListener("click", function () {
  // if ((ingredients = [])) {
  //   showError3();
  // } else recipeOutput.innerHTML = " ";
  calculate();
});

async function showdata(data) {
  data.forEach((array) => {
    recipeOutput.innerHTML += `<div class="output-content-container">
    <img class="output-img" src="${array.image}" alt="" />
    <div class="output-text-container"><p class="output-text">${array.title}</div>
  </div>`;
  });
}

function showError() {
  itemInput.classList.add("show");
  smallMessage.classList.add("show");
  setTimeout(function () {
    itemInput.classList.remove("show");
  }, 3000);
  setTimeout(function () {
    smallMessage.classList.remove("show");
  }, 3000);
}

function showError2() {
  itemInput.classList.add("show");
  smallMessage.classList.add("show");

  smallMessage.innerHTML = "You can only search 5 items";
  setTimeout(function () {
    itemInput.classList.remove("show");
  }, 3000);
  setTimeout(function () {
    smallMessage.classList.remove("show");
  }, 3000);
  setTimeout(function () {
    smallMessage.innerHTML = "Please enter your ingredients";
  }, 3000);
}
function showError3() {
  itemInput.classList.add("show");
  smallMessage.classList.add("show");

  smallMessage.innerHTML = "please add item to your ingredient list";
  setTimeout(function () {
    itemInput.classList.remove("show");
  }, 3000);
  setTimeout(function () {
    smallMessage.classList.remove("show");
  }, 3000);
  setTimeout(function () {
    smallMessage.innerHTML = "Please enter your ingredients";
  }, 3000);
}
