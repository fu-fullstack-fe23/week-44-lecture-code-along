"use strict";
const buttonRef = document.querySelector('button');
const diceRef = document.querySelector('#diceElem');
let throws = 0;
let currentGoal = 1;
let lastThrow = 1;
const dice = {
    sides: 6,
    throw: () => {
        return Math.floor(Math.random() * dice.sides + 1);
    }
};
buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.addEventListener('click', () => {
    let result = dice.throw();
    diceRef === null || diceRef === void 0 ? void 0 : diceRef.classList.remove(`dots-${lastThrow}`);
    diceRef === null || diceRef === void 0 ? void 0 : diceRef.classList.add(`dots-${result}`);
    throws++;
    if (result === currentGoal) {
        const diceDotsRef = document.querySelector(`.dots-${result}`);
        diceDotsRef === null || diceDotsRef === void 0 ? void 0 : diceDotsRef.classList.remove('faded');
        if (currentGoal < 6) {
            currentGoal++;
        }
        else if (currentGoal === 6) {
            const msgRef = document.querySelector('#winningMessage');
            msgRef.textContent = `Wohoo! Du vann på ${throws} kast!`;
            throws = 0;
            currentGoal = 1;
            resetUI(6);
        }
    }
    lastThrow = result;
});
function resetUI(nmbrOfDices) {
    var _a;
    for (let i = 1; i <= nmbrOfDices; i++) {
        (_a = document.querySelector(`dots-${i}`)) === null || _a === void 0 ? void 0 : _a.classList.add('faded');
    }
}
