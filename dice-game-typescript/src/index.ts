
const buttonRef = document.querySelector('button');
const diceRef = document.querySelector('#diceElem');
let throws : number = 0;
let currentGoal : number = 1;
let lastThrow : number = 1;

type Dice = {
    sides : number,
    throw : () => number
}

const dice : Dice = {
    sides : 6,
    throw : () => {
        return Math.floor(Math.random() * dice.sides + 1);
    }
}

buttonRef?.addEventListener('click', () : void => {
    let result : number = dice.throw();

    diceRef?.classList.remove(`dots-${lastThrow}`);
    diceRef?.classList.add(`dots-${result}`);

    throws++;

    if(result === currentGoal) {
        const diceDotsRef = document.querySelector(`.dots-${result}`);
        diceDotsRef?.classList.remove('faded');
        
        if(currentGoal < 6) {
            currentGoal++;
        } else if(currentGoal === 6) {
            const msgRef =document.querySelector('#winningMessage') as HTMLHeadingElement;
            msgRef.textContent = `Wohoo! Du vann på ${throws} kast!`;

            throws = 0;
            currentGoal = 1;
            resetUI(6);
        }
    }

    lastThrow = result;
});

function resetUI(nmbrOfDices : number) : void {
    for(let i = 1; i <= nmbrOfDices; i++) {
        document.querySelector(`dots-${i}`)?.classList.add('faded');
    }
}