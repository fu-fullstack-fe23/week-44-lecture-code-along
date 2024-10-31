var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
window.addEventListener('load', () => {
    sectionSetup();
    navSetup();
    pokedexSetup();
});
function pokedexSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemonBasicList = yield fetchAllPokemons();
        const pokemonPromises = [];
        for (let i = 0; i < 151; i++) {
            pokemonPromises.push(fetchPokemonDetails(pokemonBasicList[i].url));
        }
        const pokemonList = (yield Promise.all(pokemonPromises)).filter(pokemon => pokemon !== null);
        console.log(pokemonList);
        renderPokedex(pokemonList);
    });
}
function renderPokedex(pokemonList) {
    const sectionRef = document.querySelector('#pokedexContainer');
    pokemonList.forEach(pokemon => {
        const cardRef = createCard(pokemon);
        sectionRef.appendChild(cardRef);
    });
}
function createCard(pokemon) {
    const cardRef = document.createElement('article');
    cardRef.classList.add('pokemon-card');
    const cardTemplate = `
        <div class="card-top">
            <img src="${pokemon.sprites.front_default}" alt="Image of ${pokemon.name}}" class="card-sprite">
        </div>
        <div class="card-middle">
            <h2>${capitalizeWords(pokemon.name)}</h2>
            <h3>${pokemon.types.length === 2 ? capitalizeWords(pokemon.types[0].type.name) + ' / ' + capitalizeWords(pokemon.types[1].type.name) : capitalizeWords(pokemon.types[0].type.name)}</h3>
        </div>
        <div class="card-bottom">
            <p class="card-stat">Attack: ${pokemon.stats[1].base_stat}</p>
            <p class="card-stat">Defense: ${pokemon.stats[2].base_stat} </p>
            <p class="card-stat">Sp. Attack: ${pokemon.stats[3].base_stat} </p>
            <p class="card-stat">Sp. Defense: ${pokemon.stats[4].base_stat} </p>
            <p class="card-stat">HP: ${pokemon.stats[0].base_stat} </p>
            <p class="card-stat">Speed: ${pokemon.stats[5].base_stat} </p>
            <p class="card-stat card-stat--span-two">Total: ${calculateTotal(pokemon)} </p>
        </div>
    `;
    cardRef.innerHTML = cardTemplate;
    return cardRef;
}
function calculateTotal(pokemon) {
    let total = 0;
    pokemon.stats.forEach(stat => total += stat.base_stat);
    return total;
}
function capitalizeWords(str) {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}
function fetchPokemonDetails(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw ('Någonting gick VÄLDIGT snett!');
            }
            else {
                const data = yield response.json();
                console.log(data);
                return data;
            }
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
function fetchAllPokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://santosnr6.github.io/Data/pokemons2.json');
            if (!response.ok) {
                throw ('Någonting gick snett!');
            }
            else {
                let data = yield response.json();
                return data;
            }
        }
        catch (error) {
            console.log(error);
            return [];
        }
    });
}
function navSetup() {
    const navItemRefs = document.querySelectorAll('.nav-item');
    navItemRefs.forEach(navItem => {
        navItem.addEventListener('click', (event) => {
            toggleSectionDisplay(event.target.dataset.id);
        });
    });
}
function toggleSectionDisplay(section) {
    const pokedexSectionRef = document.querySelector('#pokedexSection');
    const searchSectionRef = document.querySelector('#searchSection');
    const generatorSectionRef = document.querySelector('#generatorSection');
    if (section) {
        switch (section) {
            case 'pokedex':
                pokedexSectionRef.classList.remove('d-none');
                searchSectionRef.classList.add('d-none');
                generatorSectionRef.classList.add('d-none');
                break;
            case 'search':
                pokedexSectionRef.classList.add('d-none');
                searchSectionRef.classList.remove('d-none');
                generatorSectionRef.classList.add('d-none');
                break;
            case 'generate':
                pokedexSectionRef.classList.add('d-none');
                searchSectionRef.classList.add('d-none');
                generatorSectionRef.classList.remove('d-none');
                break;
            default:
                console.log('Någonting gick väldigt, väldigt snett...');
        }
    }
}
function sectionSetup() {
    const sectionRefs = document.querySelectorAll('.section');
    sectionRefs.forEach(section => section.classList.add('d-none'));
}
