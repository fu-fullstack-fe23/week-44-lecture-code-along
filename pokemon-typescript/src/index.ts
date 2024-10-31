import {PokemonBasic, Pokemon} from './models/interfaces';

window.addEventListener('load', () : void => {
    sectionSetup();
    navSetup();
    pokedexSetup();
});

async function pokedexSetup() : Promise<void> {
    const pokemonBasicList : PokemonBasic[] = await fetchAllPokemons();
    const pokemonPromises : Promise<Pokemon | null>[] = [];

    for(let i = 0; i < 151; i++) {
        pokemonPromises.push(fetchPokemonDetails(pokemonBasicList[i].url));
    }

    const pokemonList : Pokemon[] = (await Promise.all(pokemonPromises)).filter(pokemon => pokemon !== null);
    console.log(pokemonList);
    renderPokedex(pokemonList);
}

function renderPokedex(pokemonList : Pokemon[]) : void {
    const sectionRef = document.querySelector('#pokedexContainer') as HTMLElement;

    pokemonList.forEach(pokemon => {
        const cardRef = createCard(pokemon);
        sectionRef.appendChild(cardRef);
    });
}

function createCard(pokemon : Pokemon) : HTMLElement {
    const cardRef = document.createElement('article') as HTMLElement;
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
            <p class="card-stat">Attack: ${ pokemon.stats[1].base_stat }</p>
            <p class="card-stat">Defense: ${ pokemon.stats[2].base_stat } </p>
            <p class="card-stat">Sp. Attack: ${ pokemon.stats[3].base_stat } </p>
            <p class="card-stat">Sp. Defense: ${ pokemon.stats[4].base_stat } </p>
            <p class="card-stat">HP: ${ pokemon.stats[0].base_stat } </p>
            <p class="card-stat">Speed: ${ pokemon.stats[5].base_stat } </p>
            <p class="card-stat card-stat--span-two">Total: ${ calculateTotal(pokemon) } </p>
        </div>
    `;

    cardRef.innerHTML = cardTemplate;

    return cardRef;
}

function calculateTotal(pokemon : Pokemon) : number {
    let total : number = 0;
    pokemon.stats.forEach(stat => total += stat.base_stat);

    return total;
}

function capitalizeWords(str: string): string {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

async function fetchPokemonDetails(url : string) : Promise<Pokemon | null> {
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw ('Någonting gick VÄLDIGT snett!');
        } else {
            const data : Pokemon = await response.json();
            console.log(data);
            return data;
        }
    } catch(error) {
        console.log(error);
        return null;
    }
}

async function fetchAllPokemons() : Promise<PokemonBasic[]> {
    try {
        const response : Response = await fetch('https://santosnr6.github.io/Data/pokemons2.json');
        if(!response.ok) {
            throw ('Någonting gick snett!');
        } else {
            let data : PokemonBasic[] = await response.json();
            return data;
        }
    } catch(error) {
        console.log(error);
       return []; 
    }
    
}

function navSetup() : void {
    const navItemRefs = document.querySelectorAll('.nav-item') as NodeListOf<HTMLElement>;
    navItemRefs.forEach(navItem => {
        navItem.addEventListener('click', (event : MouseEvent) : void => {
            toggleSectionDisplay((event.target as HTMLElement).dataset.id);
        });
    });
}

function toggleSectionDisplay (section : string | undefined) : void {
    const pokedexSectionRef = document.querySelector('#pokedexSection') as HTMLElement;
    const searchSectionRef = document.querySelector('#searchSection') as HTMLElement;
    const generatorSectionRef = document.querySelector('#generatorSection') as HTMLElement;

    if(section) {
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

function sectionSetup() : void {
    const sectionRefs = document.querySelectorAll('.section') as NodeListOf<HTMLElement>;
    sectionRefs.forEach(section => section.classList.add('d-none'));
}