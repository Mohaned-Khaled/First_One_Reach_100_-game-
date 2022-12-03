'use strict';

// Selecting Elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentValue, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentValue = 0;
  activePlayer = 0;
  playing = true;

  for (let i = 0; i < scores.length; i++) {
    document.querySelector(`#score--${i}`).textContent = 0;
    document.querySelector(`.player--${i}`).classList.remove('player--winner');
    document.querySelector(`#current--${i}`).textContent = 0;
  }
  player0El.classList.add(`player--active`);
};
init();

const switchPlayer = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentValue = 0;
};

// Rolling dice Function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a Random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display DIce
    diceEl.classList.remove('hidden');
    diceEl.src = `./imgs/dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // add dice to current score
      currentValue += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentValue;
    } else {
      // switch to other player
      switchPlayer();
    }
  }
});

// for hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active's player score
    scores[activePlayer] += currentValue;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the other player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
