let character2 : Character = {
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

interface Character1 {
    name : string,
    age : number,
    weaponry : string[],
    spouse : string,
    address : Address1,
    enemies : Enemy1[],
    hund? : string
}

interface Address1 {
    residence : string,
    kingdom : string
}

interface Enemy1 {
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
