const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');
const gameMusic = document.querySelector('#game-music');
const hitSound = document.querySelector('#hit-sound');

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else {
    return randomInteger(600, 1200);
  }
}

/**
 * Chooses a random hole from a list of holes.
 */
function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

/**
 * Calls the showUp function if time > 0 and stops the game if time = 0.
 */
function gameOver() {
  if (time > 0) {
    const timeoutId = showUp();
    return timeoutId;
  } else {
    const gameStopped = stopGame();
    return gameStopped;
  }
}

/**
 * Calls the showAndHide() function with a specific delay and a hole.
 */
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
 * The purpose of this function is to show and hide the mole given
 * a delay time and the hole where the mole is hidden.
 */
function showAndHide(hole, delay){
  toggleVisibility(hole);
  
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

/**
 * Adds or removes the 'show' class that is defined in styles.css to 
 * a given hole. It returns the hole.
 */
function toggleVisibility(hole){
  hole.classList.toggle('show');
  return hole;
}

/**
 * This function increments the points global variable and updates the scoreboard.
 */
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

/**
 * This function clears the score by setting `points = 0`.
 */
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
 * Updates the control board with the timer if time > 0
 */
function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
  }
  return time;
}

/**
 * Starts the timer using setInterval.
 */
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

/**
 * This is the event handler that gets called when a player
 * clicks on a mole.
 */
function whack(event) {
  // Play hit sound
  hitSound.currentTime = 0;
  hitSound.play();
  updateScore();
  return points;
}

/**
 * Adds the 'click' event listeners to the moles.
 */
function setEventListeners(){
  for (let i = 0; i < moles.length; i++) {
    moles[i].addEventListener('click', whack);
  }
  return moles;
}

/**
 * This function sets the duration of the game.
 */
function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

/**
 * This function is called when the game is stopped.
 */
function stopGame(){
  clearInterval(timer);
  
  // Stop background music
  gameMusic.pause();
  gameMusic.currentTime = 0;
  
  return "game stopped";
}

/**
 * This function starts the game.
 */
function startGame(){
  clearScore();
  stopGame();
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  
  // Start background music
  gameMusic.currentTime = 0;
  gameMusic.play();
  
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
