/* 
    Initializing variables. 
    dictionary stores a list of all possible words for the game.
    currentWord will be set to the word to be guessed at the start of each round. 
    displayWord initializes as a string of spaces with length equal to currentWord at game start. 
    As the user makes correct guesses, the corresponding spaces will be filled in by letters.
*/

const dictionary = [
    "ampersand", "analysis",
    "banter", "beloved", "bitterness",
    "counter", "cosmic", 
    "dandelion", "destitute", "delegate", 
    "elephant", "elevator",
    "flexible", "flippant", "function", 
    "gigantic", "gorgeous", "griddle",
    "hellion", "holistic", "horseradish", 
    "illumination", "interior",
    "janitor", "jasper",
    "kibble", "kumquat",
    "lopsided", "lexicon", "lampshade",
    "masterful", "middleman",
    "nearsighted", "notation",
    "operative", "ornery",
    "panther", "perennial",
    "quagmire",
    "raspberry", "rental", 
    "seismic", "splendid", 
    "taboo", "thimble",
    "underhanded",
    "validation", "venerated",
    "watermelon", "whistle",
    "yesterday",
    "zeppelin"
];
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const lettersGuessed = [];
let currentWord = "";
let displayWord = "";
let guesses = 0;
let gameStarted = false;
let wins = 0;

// Initialzing DOM elements
const beginState = document.getElementById("gameStart");
const loseState = document.getElementById("gameOver");
const winState = document.getElementById("winText");
const winsDisplay = document.getElementById("winCount");
const showWord = document.getElementById("display");
const letterList = document.getElementById("usedLetters");
const guessesDisplay = document.getElementById("guessesCount");

document.onkeyup = function (event) {
    if(!gameStarted) {
        gameStarted = true;
        guesses = 5;
        currentWord = dictionary[Math.floor(Math.random()*dictionary.length)]; // Sets current word to a random member of dictionary.
        displayWord = ""
        // Populates displayWord with spaces equal to currentWord's length.
        for(i = 0; i < currentWord.length; i++) {
            displayWord += "_";
        }
        const prevLength = lettersGuessed.length; // The following block clears the lettersGuessed array.
        for(i = 0; i < prevLength; i++) {
            lettersGuessed.pop();
        }

        // Displays and hides DOM elements appropriately
        beginState.classList.add("hidden");
        loseState.classList.add("hidden");
        winState.classList.add("hidden");
        winsDisplay.classList.remove("hidden");
        showWord.classList.remove("hidden");
        letterList.classList.remove("hidden");
        guessesDisplay.classList.remove("hidden");
    }
    else {
        const userGuess = event.key;
        if(!lettersGuessed.includes(userGuess) && alphabet.includes(userGuess)) {
            lettersGuessed.push(userGuess);
            let correctGuess = false; // will be set to true if user's guess matches a character in currentWord.
            for(i = 0; i < currentWord.length; i++) {
                if(userGuess === currentWord[i]) {
                    correctGuess = true;
                    displayWord = displayWord.substring(0,i) + userGuess + displayWord.substring(i+1);
                }
            }
            if(!correctGuess) {
                guesses--;
            }
            // Checks if user has completely solved the word
            if(displayWord === currentWord) {
                gameStarted = false;
                wins++;
                winsDisplay.textContent = "Wins: " + wins;
                winState.classList.remove("hidden");
            }
            if(guesses === 0) {
                gameStarted = false;
                displayWord = currentWord;
                loseState.classList.remove("hidden");
            }
            
        }
    }
    showWord.textContent = displayWord;
    usedLetters.textContent = lettersGuessed;
    guessesDisplay.textContent = "Guesses: " + guesses;
}