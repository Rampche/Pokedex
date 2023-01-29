//! Variables
//? Values
let pokemonId = document.querySelector('.number');
let pokemonName = document.querySelector('.name');
let pokemonType1 = document.querySelector('.type1');
let pokemonType2 = document.querySelector('.type2');
let pokemonDesc = document.querySelector('.description');
let pokemonHeight = document.querySelector('.height__value');
let pokemonWeight = document.querySelector('.weight__value');
let pokemonSprite = document.querySelector('.pokemon__sprite');
let pokeName;
let pokemonIndex;
const resp = false;

//? Buttons
const searchBtn = document
  .querySelector('.search__btn')
  .addEventListener('click', searchPokemon);

const searchInput = document.querySelector('#search__input');

const lowerName = searchInput.value.toLowerCase();

//! Fetch
//Obtain data from the api
const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  ).catch((error) => console.log(error));
  if (!apiResponse.ok) {
    searchInput.className = 'error';
    document.querySelector('#wrong-choice').style.display = 'block';
    document.querySelector('.fa-solid').style.display = 'inline-block';
  }

  const data = await apiResponse.json();
  return data;
};

//Obtain description from PokeApi V2
const fetchDescription = async (pokemon) => {
  const apiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
  ).catch((error) => console.log(error));

  const dataDesc = await apiResponse.json();

  return dataDesc;
};
fetchDescription();

//Show the pokemon data on the screen
const showPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);
  const dataDesc = await fetchDescription(pokemon);
  const flavorTextEntries = dataDesc['flavor_text_entries'];

  //Filter to get a array with only the flavor texts in english.
  const filteredFlavorTextEntries = flavorTextEntries.filter(
    (element) => element.language.name === 'en'
  );

  //Assignment of a const to get the first english flavor text.
  const flavorTextEntry =
    filteredFlavorTextEntries.length > 0 ? filteredFlavorTextEntries[0] : {};

  //New const to reassing the first english FT
  englishDescription = flavorTextEntry['flavor_text']
    .replace(/\s+/g, ' ')
    .replace(/(\r\n|\n|\r)/gm, ' '); //Used the replaces to remove blank spaces and other problems with the text.

  pokemonDesc.innerHTML = englishDescription;
  pokemonId.innerHTML = data.id;
  pokemonName.innerHTML = data.name;
  pokemonHeight.innerHTML = `${data.height / 10}m`;
  pokemonWeight.innerHTML = `${data.weight / 10}Kg`;
  pokemonSprite.src =
    data['sprites']['other']['official-artwork']['front_default'];

  //Array of pokemon types
  typesArr = data['types'];

  //Variables that will change the pokemon type
  let firstClassType = document.querySelector('#type-icon1');
  let secondClassType = document.querySelector('#type-icon2');

  if (typesArr.length < 2) {
    pokemonType1.innerText = data['types']['0']['type']['name'];
    pokemonType2.innerText = '';
    secondClassType.style.display = 'none';
    firstClassType.className = pokemonType1.innerHTML;
  } else {
    pokemonType1.innerText = data['types']['0']['type']['name'];
    pokemonType2.innerText = data['types']['1']['type']['name'];
    secondClassType.style.display = 'flex';
    firstClassType.className = pokemonType1.innerHTML;
    secondClassType.className = pokemonType2.innerHTML;
  }
};

showPokemon(1);

//? Functions

function checkNumber() {
  if (searchInput.value <= 0 || searchInput.value > 905) {
    searchInput.className = 'error';
    document.querySelector('#wrong-choice').style.display = 'block';
    document.querySelector('.fa-solid').style.display = 'inline-block';
  } else {
    searchInput.className = '';
    document.querySelector('#wrong-choice').style.display = 'none';
    document.querySelector('.fa-solid').style.display = 'none';
  }
}

function isEmpty() {
  if (searchInput.value === '') {
    searchInput.className = 'error';
  } else {
    searchInput.className = '';
  }
}

function searchPokemon(e) {
  e.preventDefault();

  //Change to lowercase the input names receiveds from the user.
  pokeName = searchInput.value.toLowerCase();

  showPokemon(pokeName);
  isEmpty();
  checkNumber();
}

searchInput.addEventListener('keyup', function (event) {
  pokeName = searchInput.value.toLowerCase();
  event.preventDefault();
  if (event.keyCode === 13) {
    isEmpty();
    checkNumber();
    showPokemon(pokeName);
  }
});

const next = document
  .querySelector('.right__arrow')
  .addEventListener('click', changeNext);

const prev = document
  .querySelector('.left__arrow')
  .addEventListener('click', changePrev);

function changeNext(newValue) {
  newValue = parseInt(pokemonId.innerText);
  newValue = newValue + 1;
  searchInput.value = newValue;
  showPokemon(newValue);
  if (newValue > 0 || newValue < 906) {
    searchInput.className = '';
    document.querySelector('#wrong-choice').style.display = 'none';
    document.querySelector('.fa-solid').style.display = 'none';
  }
}

function changePrev(newValue) {
  newValue = parseInt(pokemonId.innerText);
  newValue = newValue - 1;
  searchInput.value = newValue;
  showPokemon(newValue);
  if (newValue > 0 || newValue < 906) {
    searchInput.className = '';
    document.querySelector('#wrong-choice').style.display = 'none';
    document.querySelector('.fa-solid').style.display = 'none';
  }
}
