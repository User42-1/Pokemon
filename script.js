let allPokemonNamesUrls = [];  // #1 through #1010 in arrays [0...99],...,[900...999],[1000...1009]
let allPokemonObjects = [];   // #1 is in array 0 and so on

load_allPokemonNamesUrls();
load_first40_pokemonObjects();
load_further20_pokemonObjects(41);  // is called when the page is scrolled downwords

async function load_allPokemonNamesUrls() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=0';
    allPokemonNamesUrls = (await (await fetch(url)).json()).results;
 }

async function load_first40_pokemonObjects() {
    for (let i = 1; i < 31; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let currentPokemonObject = await response.json();
        allPokemonObjects.push(currentPokemonObject);
    }
}

async function load_further20_pokemonObjects(pokemonStartId) {
    for (let i = pokemonStartId; i < (pokemonStartId+20); i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let currentPokemonObject = await response.json();
        allPokemonObjects.push(currentPokemonObject);
    }
}



/////////////////////////// Test with 4 given Pokemon /////////////////////////////////////////

let all_pokemon = [];

let pokemons = ['pikachu', 'charmander', 'pikachu', 'wigglytuff'];

async function load_pokemons() {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let current_pokemon = await response.json();
    all_pokemon.push(current_pokemon);
    console.log('loaded pokemon:' , current_pokemon);
    render_current_pokemonCard(current_pokemon);
    }
}

function render_current_pokemonCard(current_pokemon) {
    /*   for (let i = 0; i < pokemons.length; i++) {
          const pokemon = pokemons[i];
  
          document.getElementById('small_charts').innerHTML = current_pokemon['name']; */
      document.getElementById('pokemon_name').innerHTML = current_pokemon['name'];
      document.getElementById('pokemon_small_images').src = current_pokemon['sprites']['other']['official-artwork']['front_shiny'];
  }


