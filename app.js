/**
 * @description The raw dinosaur data, an array of dinosaur objects
 */
const ALL_DINOSAURS = {
  Dinos: [
    {
      species: "Triceratops",
      weight: 13000,
      height: 114,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "First discovered in 1889 by Othniel Charles Marsh",
    },
    {
      species: "Tyrannosaurus Rex",
      weight: 11905,
      height: 144,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "The largest known skull measures in at 5 feet long.",
    },
    {
      species: "Anklyosaurus",
      weight: 10500,
      height: 55,
      diet: "herbavor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Anklyosaurus survived for approximately 135 million years.",
    },
    {
      species: "Brachiosaurus",
      weight: 70000,
      height: "372",
      diet: "herbavor",
      where: "North America",
      when: "Late Jurasic",
      fact: "An asteroid was named 9954 Brachiosaurus in 1991.",
    },
    {
      species: "Stegosaurus",
      weight: 11600,
      height: 79,
      diet: "herbavor",
      where: "North America, Europe, Asia",
      when: "Late Jurasic to Early Cretaceous",
      fact: "The Stegosaurus had between 17 and 22 seperate places and flat spines.",
    },
    {
      species: "Elasmosaurus",
      weight: 16000,
      height: 59,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Elasmosaurus was a marine reptile first discovered in Kansas.",
    },
    {
      species: "Pteranodon",
      weight: 44,
      height: 20,
      diet: "carnivor",
      where: "North America",
      when: "Late Cretaceous",
      fact: "Actually a flying reptile, the Pteranodon is not a dinosaur.",
    },
    {
      species: "Pigeon",
      weight: 0.5,
      height: 9,
      diet: "herbavor",
      where: "World Wide",
      when: "Holocene",
      fact: "All birds are living dinosaurs.",
    },
  ],
};

/**
 * @description Create Dino class to create dinos
 * @constructor
 * @param {object} dinoObj - object holding a specific dino's details
 * @param {object} humanData - object holdings form input values
 * @returns {object} a new dino with properties relative to the human's
 */
class Dinosaur {
  constructor(dinoObj, humanData) {
    const { species, weight, height, diet, where, when, fact } = dinoObj;
    this.species = species;
    this.speciesLowercase = species.toLowerCase();
    this.height = Number(height);
    this.weight = Number(weight);
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.heightRatio = "height ratio";
    this.weightRatio = "weight ratio";
    this.dietDescription = "What kind of diet did they have?";

    this.compareHeight(humanData);
    this.compareWeight(humanData);
    this.compareDiet(humanData);
  }

  // Create Dino Compare Method 1
  compareHeight(humanData) {
    const { feet, inches } = humanData;
    const humanHeightIn = feet * 12 + inches;
    this.heightRatio = (this.height / humanHeightIn).toFixed(1);
  }

  // Create Dino Compare Method 2
  compareWeight(humanData) {
    this.weightRatio = (this.weight / humanData.weight).toFixed(1);
  }

  // Create Dino Compare Method 3
  compareDiet(humanData) {
    let diet;
    const hasSameDiet = humanData.diet.toLowerCase() === this.diet;
    if (hasSameDiet) {
      this.dietDescription = `You are both ${humanData.diet}s, pretty cool!`;
    } else {
      this.dietDescription = `You're a ${humanData.diet} but the ${this.species} was a ${this.diet}.`;
    }
  }
}

/**
 * @description formats dino data relative to human data
 * @param {array} dinosData of dino objects
 * @param {object} humanData form input values from user
 * @returns {array} of dinos with formatted properties
 */
// Create Dino Objects
function getDinosaurs(dinosData, humanData) {
  let dinosaurs = dinosData["Dinos"].map(
    (dinoData) => new Dinosaur(dinoData, humanData)
  );
  console.log(dinosaurs);
  return dinosaurs;
}

/**
 * @description Collects all the form input values from the DOM
 * @returns {object} containing the (human) form input values
 */
// Create Human Object
function getHumanData() {
  const [name, feet, inches, weight] = document.querySelectorAll("input");
  const diet = document.querySelector("select");

  return {
    name: name.value,
    feet: Number(feet.value),
    inches: Number(inches.value),
    weight: Number(weight.value),
    diet: diet.value,
  };
}

/**
 * @description clears the form from the DOM
 */
function hideForm() {
  const form = document.querySelector("#dino-compare");
  form.style.display = "none";
}

/**
 * @description Chooses a random fact for a specific tile
 * @param {object} tileData dino or human or pigeon object
 * @returns {string} a formatted fact string
 */
function getRandomFact(tileData) {
  if (tileData.species === "human") return;
  if (tileData.species === "Pigeon") return tileData.fact;

  const randomIndex = Math.floor(Math.random() * Math.floor(6));

  switch (randomIndex) {
    case 0:
      return tileData.dietDescription;
    case 1:
      return tileData.fact;
    case 2:
      return `The ${tileData.species} was ${tileData.heightRatio} ${
        tileData.heightRatio > 1 ? "taller" : "shorter"
      } than you.`;
    case 3:
      return `The ${tileData.species} was ${tileData.weightRatio} times ${
        tileData.weightRatio > 1 ? "taller" : "shorter"
      } than you.`;
    case 4:
      return `The ${tileData.species} existed during the ${tileData.when} period.`;
    default:
      return `The ${tileData.species} lived in ${tileData.where}.`;
  }
}

/**
 * @description Generate grid tiles & append them to DOM
 * @param {array} dinos dinos data array
 * @param {object} human form input values
 */
function displayGrid(dinos, human) {
  const grid = document.querySelector("#grid");

  const tileData = [...dinos.slice(0, 4), human, ...dinos.slice(4)];
  const tiles = tileData
    .map((tile) => {
      return `
        <div class="grid-item">
          <h3>${tile.species || tile.name}</h3>
          <img src="images/${tile.speciesLowercase || "human"}.png">
          <p style="${
            typeof tile.fact === "undefined" ? "display: none" : ""
          }">${getRandomFact(tile)}</p>
        </div>`;
    })
    .join("");

  grid.innerHTML = tiles;
}

/**
 * @description clears form inputs & error messages
 * from the DOM
 */
function clearForm() {
  const fields = document.querySelectorAll("input");
  const validation = document.querySelector(".validation");
  const validationSpecific = document.querySelector(".validation-specific");
  fields.forEach((field) => (field.value = ""));
  validation.innerHTML = "";
  validationSpecific.innerHTML = "";
}

/**
 * @description adds the refresh button to the DOM, under the grid
 */
function displayRefreshBtn() {
  const form = document.querySelector("#dino-compare");
  const refreshBtn = document.createElement("div");
  refreshBtn.innerHTML = `<h1>Start over</h1>`;
  refreshBtn.classList.add("start-over");
  refreshBtn.classList.add("btn");
  document.querySelector("footer").prepend(refreshBtn);

  refreshBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    refreshBtn.style.display = "none";
    form.style.display = "block";
  });
}

/**
 * @description a flag that comfirms the form is complete or incomplete
 * @param {object} human for input values
 * @returns {boolean}
 */
function isFormComplete(human) {
  const errorField = document.querySelector(".validation-specific");
  const { name, feet, inches, weight } = human;
  let isComplete = false;
  if (!name) {
    errorField.innerHTML = `<p>Please fill out your name, human</p>`;
  } else if (feet < 1) {
    errorField.innerHTML = `<p>Feet must be a number greater than 0</p>`;
  } else if (inches < 0) {
    errorField.innerHTML = `<p>Inches must be a number 0 or greater</p>`;
  } else if (weight < 1) {
    errorField.innerHTML = `<p>Weight must be a number greater than 0</p>`;
  } else {
    isComplete = true;
  }
  return isComplete;
}

/**
 * @description an IIFE to get human data from form on btn-click intializes form validation functionality & displays the grid
 */
(function () {
  const container = document.querySelector(".validation");
  const compareBtn = document.querySelector("#btn");
  clearForm();

  // On button click, prepare and display infographic
  compareBtn.addEventListener("click", function () {
    const humanData = getHumanData();
    if (isFormComplete(humanData)) {
      const dinoArray = getDinosaurs(ALL_DINOSAURS, humanData);

      // Remove form from screen
      hideForm();
      displayGrid(dinoArray, humanData);
      displayRefreshBtn();
      clearForm();
    } else {
      // attach appropriate error messages
      container.innerHTML = `<span class="error">Please complete all fields</span>`;
    }
  });
})();
