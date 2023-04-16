let allPokemonNamesUrls = [];  // #1 through #1010 in arrays [0...99],...,[900...999],[1000...1009]
let allPokemonObjects = [];   // #1 is in array 0 and so on
let furtherPokemonStartId = 31;
let searchIsActive = false;

let selected_allPokemonUrls = [];
let selected_allPokemonObjects = [];

async function init() {
    if(searchIsActive) {
        await load_allPokemonNamesUrls();
        await searchAllPokemonNamesUrls(); 
    } else {
        await load_allPokemonNamesUrls();
        await load_first30_pokemonObjects();
    }
 }

async function load_allPokemonNamesUrls() {
    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=1010&offset=0';
    allPokemonNamesUrls = (await (await fetch(url)).json()).results;
 }

async function load_first30_pokemonObjects() {
    allPokemonObjects = [];
    for (let i = 1; i < 31; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let currentPokemonObject = await response.json();
        allPokemonObjects.push(currentPokemonObject);
    }
    render_first31_pokemons_overview();
}

async function load_further20_pokemonObjects() {  // is called with a button (or when the page is scrolled downwords - not implemented yet)
    for (let i = furtherPokemonStartId; i < (furtherPokemonStartId+20); i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i;
        let response = await fetch(url);
        let currentPokemonObject = await response.json();
        allPokemonObjects.push(currentPokemonObject);
    }
    render_further20_pokemon_overview(furtherPokemonStartId);
    furtherPokemonStartId += 20;
}

function render_first31_pokemons_overview() {
    let content_container = document.getElementById('all_pokemon_sprite_container');
    content_container.innerHTML = ``;
    for (let i = 0; i < allPokemonObjects.length; i++) {
        let pokemont_sprite_src = allPokemonObjects[i]['sprites']['other']['official-artwork']['front_shiny'];
        let pokemont_sprite_name = allPokemonObjects[i]['name'];
        content_container.innerHTML += `<div class="pokemon_sprite_container">
                                            <img src="${pokemont_sprite_src}" class="pokemon_sprite_image" onclick="show_infocard_container(${i})">  
                                            <div class="pokeman_sprite_name">${pokemont_sprite_name}</div>
                                        </div>
                            `;
    }
}

function show_infocard_container(i) {
    let content_infocard = document.getElementById('infocard_container');
        content_infocard.classList.remove('d_none');
    let pokemont_sprite_name = allPokemonObjects[i]['name'];
    let pokemont_sprite_src = allPokemonObjects[i]['sprites']['other']['official-artwork']['front_shiny'];
    let pokemont_sprite_type = allPokemonObjects[i]['types'][0]['type']['name'];
    let pokemont_sprite_weight = allPokemonObjects[i]['weight'];
    let pokemont_sprite_height = allPokemonObjects[i]['height'];
    let pokemont_sprite_stats0 = allPokemonObjects[i]['stats'][0]['base_stat'];
    let pokemont_sprite_stats1 = allPokemonObjects[i]['stats'][1]['base_stat'];
    let pokemont_sprite_stats2 = allPokemonObjects[i]['stats'][2]['base_stat'];
    content_infocard.innerHTML += `
        <div id="infocard_container" class="infocard_container">
            <div class="infocard_upperPart">
                <h1 id="pokemon_name">${pokemont_sprite_name}</h1>
                <div class="small_sprite_container"><img src="${pokemont_sprite_src}" class="pokemon_sprite_small_image"></div>
            </div>
            <div class="infocard_lowerPart">
                <table>
                    <tr>
                        <td>Type:</td><td id="type">${pokemont_sprite_type}</td>
                    </tr>
                    <tr>
                        <td>Height:</td><td id="height">${pokemont_sprite_height} dm</td>
                    </tr>
                    <tr>
                        <td>Weight:</td><td id="weight">${pokemont_sprite_weight} kg</td>
                    </tr>
                    <tr>
                        <td>Hp:</td><td id="abilities">${pokemont_sprite_stats0} Hp</td>
                    </tr>
                    <tr>
                        <td>Attack:</td><td id="abilities">${pokemont_sprite_stats1} At</td>
                    </tr>
                    <tr>
                        <td>Defense:</td><td id="abilities">${pokemont_sprite_stats2} De</td>
                    </tr>
                </table>
            </div>
        </div>   
        `;
        event.stopPropagation();
}

async function render_further20_pokemon_overview(pokemonStartId) {
    let content_container = document.getElementById('all_pokemon_sprite_container')
    for (let i = pokemonStartId; i < (pokemonStartId+20); i++) {
        const pokemont_sprite_src = allPokemonObjects[i]['sprites']['other']['official-artwork']['front_shiny'];
        const pokemont_sprite_name = allPokemonObjects[i]['name'];
        content_container.innerHTML += `<div class="pokemon_sprite_container">
                                <img src="${pokemont_sprite_src}" class="pokemon_sprite_image" onclick="show_infocard_container(${i})">
                                <div class="pokeman_sprite_name">${pokemont_sprite_name}</div>
                            </div>
                            `;
    }
}

async function remove_infocard_container() {
    document.getElementById('infocard_container').classList.add('d_none');
}


/* ************** Pokemon-Selection ***************+ */


async function searchAllPokemonNamesUrls() {
    searchIsActive = true;
    await load_allPokemonNamesUrls();
    selected_allPokemonUrls = [];
    let searchString = document.getElementById('searchString')
    search = searchString.value.toLowerCase();
    if(search) {
        alert(search);
        for (let i = 0; i < allPokemonNamesUrls.length; i++) {
            if(allPokemonNamesUrls[i]['name'].toLowerCase().startsWith(search)) {
                selected_allPokemonUrls.push(allPokemonNamesUrls[i]['url']);
            }  
        }
        await selected_load_first_pokemonObjects();
    } else {
        searchIsActive = false;
        await init();
    }   
}

async function selected_load_first_pokemonObjects() {
    selected_allPokemonObjects = [];
    let number_of_selected_objects = selected_allPokemonUrls.length;
    for (let i = 0; i < number_of_selected_objects; i++) {
        let url = selected_allPokemonUrls[i];
        let response = await fetch(url);
        let currentPokemonObject = await response.json();
        selected_allPokemonObjects.push(currentPokemonObject);
    }
    await selected_render_first_pokemons_overview();
}

async function selected_render_first_pokemons_overview() {
    let content_container = document.getElementById('all_pokemon_sprite_container');
    content_container.innerHTML = ``;
    for (let i = 0; i < selected_allPokemonObjects.length; i++) {
        let pokemont_sprite_src = selected_allPokemonObjects[i]['sprites']['other']['official-artwork']['front_shiny'];
        let pokemont_sprite_name = selected_allPokemonObjects[i]['name'];
        content_container.innerHTML += `<div class="pokemon_sprite_container">
                                            <img src="${pokemont_sprite_src}" class="pokemon_sprite_image" onclick="show_infocard_container(${i})">  
                                            <div class="pokeman_sprite_name">${pokemont_sprite_name}</div>
                                        </div>
                            `;
    }
}