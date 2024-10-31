let character : Character = {
    name : 'Link',
    age : 27,
    weaponry : [
        'Master Sword',
        'Boomerang'
    ],
    spouse : 'Zelda',
    address : {
        residence : 'Hyrule Castle',
        kingdom : 'Hyrule'
    },
    enemies : [
        {
            name : 'Ganondorf',
            type : 'Gerudo',
            powerLevel : 900
        },
        {
            name : 'Bokgoblin',
            type : 'Goblin',
            powerLevel : 90
        }
    ] 
}

console.log(character.hund);


type Character = {
    name : string,
    age : number,
    weaponry : string[],
    spouse : string,
    address : Address,
    enemies : Enemy[],
    hund? : string
}

type Address = {
    residence : string,
    kingdom : string
}

type Enemy = {
    name : string,
    type : string,
    powerLevel : number
}


// let character2 : Character = {
//     name : 'Link',
//     age : 27,
//     weaponry : [
//         'Master Sword',
//         'Boomerang'
//     ],
//     spouse : 'Zelda' 
// }

// let character3 : Character = {
//     name : 'Link',
//     age : 27,
//     weaponry : [
//         'Master Sword',
//         'Boomerang'
//     ],
//     spouse : 'Zelda' 
// }
