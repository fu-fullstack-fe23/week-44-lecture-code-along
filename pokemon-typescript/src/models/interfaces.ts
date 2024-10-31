interface PokemonBasic {
    name : string,
    url : string
}

interface Pokemon {
    name : string,
    sprites : Sprites,
    types : Types[],
    stats: Stats[]
}

interface Stats {
    base_stat: number,
    stat : Stat
}

interface Stat {
    name : string
}

interface Types {
    type : Type
}

interface Type {
    name : string;
}

interface Sprites {
    front_default : string
}

export {PokemonBasic, Pokemon}