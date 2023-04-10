let allPokemonNamesUrls = [];  // #1 through #1010 in arrays [0...99],...,[900...999],[1000...1009]
let allPokemonObjects = [];   // #1 is in array 0 and so on

async function init() {
    await load_allPokemonNamesUrls();
    await load_first30_pokemonObjects();
    /* await load_further20_pokemonObjects(31); */  // is called when the page is scrolled downwords
    await render_first31_pokemon_overview();
}

async function load_allPokemonNamesUrls() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=0';
    allPokemonNamesUrls = (await (await fetch(url)).json()).results;
 }

async function load_first30_pokemonObjects() {
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
    render_further20_pokemon_overview(pokemonStartId);
}

async function render_first31_pokemon_overview() {
    let content_container = document.getElementById('all_pokemon_sprite_container');
    let content_infocard = document.getElementById('infocard_container');
    content_container.innerHTML += ``;
    content_infocard.innerHTML += ``;
    for (let i = 0; i < allPokemonObjects.length; i++) {
        const pokemont_sprite_src = allPokemonObjects[i]['sprites']['other']['official-artwork']['front_shiny'];
        const pokemont_sprite_name = allPokemonObjects[i]['name'];
        content_container.innerHTML += `<div class="pokemon_sprite_container">
                                <img src="${pokemont_sprite_src}" class="pokemon_sprite_image" onclick="show_infocard_container()">
                                <div class="pokeman_sprite_name">${pokemont_sprite_name}</div>
                            </div>
                            `;
        content_infocard.innerHTML += `
            <div class="infocard_container">
                <div class="infocard_upperPart">
                    <h2 id="pokemon_name">name</h2>
                </div>
                <div class="infocard_lowerPart">
                    <table>
                        <tr>
                            <td>Name:</td><td id="name">name</td>
                        </tr>
                        <tr>
                            <td>Type:</td><td id="type">type</td>
                        </tr>
                        <tr>
                            <td>Height:</td><td id="height">height</td>
                        </tr>
                        <tr>
                            <td>Weight:</td><td id="weight">weight</td>
                        </tr>
                        <tr>
                            <td>Abilities:</td><td id="abilities">abilities</td>
                        </tr>
                    </table>
                </div>
             </div>
        `;
    }
}

async function render_further20_pokemon_overview(pokemonStartId) {
    let content_container = document.getElementById('all_pokemon_sprite_container')
    for (let i = pokemonStartId; i < (pokemonStartId+20); i++) {
        const pokemont_sprite_src = allPokemonObjects[i]['sprites']['other']['official-artwork']['front_shiny'];
        const pokemont_sprite_name = allPokemonObjects[i]['name'];
        content_container.innerHTML += `<div class="pokemon_sprite_container">
                                <img src="${pokemont_sprite_src}" class="pokemon_sprite_image" onclick="show_infocard_container()">
                                <div class="pokeman_sprite_name">${pokemont_sprite_name}</div>
                            </div>
                            `;
    }
}

async function render_infocard() {
    let content = document.getElementById('infocard_container');
}

function show_infocard_container() {
    document.getElementById('infocard_container').classList.toggle('d_none');
}

/* function remove_infocard_container() {
    document.getElementById('infocard_container').classList.add('d_none');
}

addEventListener(onmousedown, () => {}) */

/////////////////////////// Test with 4 given Pokemon /////////////////////////////////////////

/* let all_pokemon = [];

let pokemons = ['pikachu', 'charmander', 'pikachu', 'wigglytuff'];

async function load_pokemons() {
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = pokemons[i];
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    let response = await fetch(url);
    let current_pokemon = await response.json();
    all_pokemon.push(current_pokemon);
    console.log('loaded pokemon:' , current_pokemon);
    render_pokemon_infocard(current_pokemon);
    }
}

function render_pokemon_infocard(current_pokemon) {
    /*   for (let i = 0; i < pokemons.length; i++) {
          const pokemon = pokemons[i];
  
          document.getElementById('small_charts').innerHTML = current_pokemon['name']; */
/*       document.getElementById('pokemon_name').innerHTML = current_pokemon['name'];
      document.getElementById('pokemon_small_image').src = current_pokemon['sprites']['other']['official-artwork']['front_shiny'];
      document.getElementById('type').innerHTML = allPokemonObjects['types']['other']['official-artwork']['front_shiny'];
      document.getElementById('height').src = current_pokemon['sprites']['other']['official-artwork']['front_shiny'];
      document.getElementById('weight').src = current_pokemon['sprites']['other']['official-artwork']['front_shiny'];
  }
 */


/*   document.getElementById('pokemon_sprite').src = await allPokemonObjects[1]['sprites']['other']['official-artwork']['front_shiny'];
 */