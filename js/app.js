//
//    __  __          __      _    
//   |  \/  |___ _ _ / _|_  _( )___
//   | |\/| / -_) '_|  _| || |/(_-<
//   |_|  |_\___|_| |_|  \_, | /__/
//                       |__/      
//    ___                           
//   | __| _ ___  __ _ __ _ ___ _ _ 
//   | _| '_/ _ \/ _` / _` / -_) '_|
//   |_||_| \___/\__, \__, \___|_|  
//               |___/|___/         
//     ___                
//    / __|__ _ _ __  ___ 
//   | (_ / _` | '  \/ -_)
//    \___\__,_|_|_|_\___|
// 
//                       
// The starter code for this game uses a player
// and enemies, represented by bugs.
// In this slightly different version though, 
// instead of enemies, we use people who are
// walking next to the sea, and the player,
// represented by a queen, tries to reach
// the sea while practicing social distancing.
// As such, the Enemy constructor function 
// and the allEnemies array of the game, 
// have been renamed and are now called
// People and allPeople respectively.
// As for the game, it has 3 levels with
// increasing difficulty, as the speed
// increases from one level to the other,
// and to keep aware the player that the
// level has changed, during the change
// of the level, the background color also
// changes and at the end of level 3, a modal
// appears with some information about the game.

let Game = function() {
    // The Game constructor function, for the game object,
    // includes all the additional functionality
    // needed to implement this game, like providing
    // methods for random numbers, selecting random sprites,
    // updating information on the screen, implementing a modal,
    // and also, a method to initialize the game.

    this.level = 1;
    this.moves = 0;
    this.resets = 0;
    // The game has 3 levels with increasing speed, varying from 150 up to 250
    // The moves stores the number of moves of the player
    // The resets stores the number of collisions

    this.randomNumber = function(min, max) {
        // The randomNumber() algorithm has been slightly adapted from the following algorithm:
        // Original algorithm: Math.floor(Math.random() * (max - min + 1) + min)
        // https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
        // In this case though, the  algorithm was slightly simplified by replacing the Math.floor()
        // with the Math.round() and as such, the +1 was removed as it was no longer needed.
        // The adapted algorithm, like the original, returns random numbers from min (inclusive) up to max (inclusive).
        const randomInteger = Math.round(Math.random() * (max - min) + min);
        return randomInteger;
    }

    this.randomOption = function(...values) {
        // Using the rest parameter, we can call this function with any number
        // of arguments and the function will return just one value from those 
        // arguments, which will be randomly chosen.
        let optionsArray = values;
        let randomNumber = this.randomNumber(0, optionsArray.length - 1);
        const randomElement = optionsArray[randomNumber];
        return randomElement;
    }

    this.randomPerson = function() {
        // The methos is used to select a random sprite 
        // from the following array:
        const sprites = [
            'images/char-cat-girl.png', 
            'images/char-horn-girl.png', 
            'images/char-boy.png', 
            'images/char-pink-girl.png'
        ];
        const randomNumber = this.randomNumber(0, sprites.length - 1);
        const selectedSprite = sprites[randomNumber];
        return selectedSprite;
    }

    this.displayLevel = function() {
        // Updates the level on the screen and also, it 
        // changes the background color depending on the level
        let selectedClass = document.querySelector('.level');
        selectedClass.innerText = this.level;
        if (this.level === 1) {
            document.body.style.backgroundColor = "#fff0f5"; //LavenderBlush
        } else if (this.level === 2) {
            document.body.style.backgroundColor = "#eee8aa"; //PaleGoldenRod
        } else if (this.level === 3) {
            document.body.style.backgroundColor = "#ffebcd"; //BlanchedAlmond
        }
    }

    this.displayMoves = function() {
        // Updates the number of moves on the screen
        let selectedClass = document.querySelector('.moves');
        selectedClass.innerText = this.moves;            
    }

    this.displayResets = function() {
        // Updates the number of resets (collisions) on the screen
        let selectedClass = document.querySelector('.resets');
        selectedClass.innerText = this.resets;
    }

    this.stop = function() {
        // At the end of the game, when the modal appears, the level increases
        // to 4 (which corresponds to a speed of 0) so that the sprites
        // will stop moving, while the modal is visible.
        this.level = 4;
    }

    this.displayModal = function() {
        // The modal was based on this valuable tutorial, although
        // it has been greatly adapted in order to become much simpler:
        // https://css-tricks.com/considerations-styling-modal/
        let modalElements = document.querySelectorAll(".modal-element");
        for (let i = 0; i < modalElements.length; i++) {
            modalElements[i].classList.remove("modal-element-hidden");
        }
        modalElements[0].classList.add("modal-overlay");
        modalElements[1].classList.add("modal-window");
        modalElements[2].classList.add("modal-header");
        modalElements[3].classList.add("modal-content");
        modalElements[4].classList.add("modal-content");
        modalElements[5].classList.add("modal-button");
        modalElements[2].innerText = "Congratulations!";
        modalElements[3].innerText = "The princess Queen would like to thank you because you helped her reach the sea, while practicing social distancing!";
        modalElements[4].innerText = "Worth mentioning also that you have managed to complete this royal task, with just " + game.moves + " moves and " + game.resets + " restarts!";
    }

    this.closeModal = function() {
        // To close the modal, all classes are removed and then, 
        // the "modal-element-hidden" class is added to every element
        // and also, the "modal-element" class is added, as it is used 
        // to select the modal elements.
        // The "modal-element-#num" classes, are only used in the html file
        // to help visually identify each modal element, but are not
        // uded in the JavaScript code.
        let modalElements = document.querySelectorAll(".modal-element");
        for (let i = 0; i < modalElements.length; i++) {
            modalElements[i].className = ("modal-element modal-element-hidden");
        }
    }

    this.initialize = function() {
        // The initialize function is triggered when the OK button is pressed
        // on the modal and it closes the modal, while also resets the values
        // for the level, moves and resets.
        // The value for the level though is set to 0, instead of 1, because just 
        // before the modal appears, the player sprite is on the top of the canvas,
        // and thus, as soon as the modal closes, the player sprite resets to it's
        // starter position, an action that triggers an increase to the next level.
        // And for this reason, the level is set to 0 so as soon as the modal
        // closes, the level will advance to level 1.
        this.closeModal();
        this.level = 0;
        this.displayLevel();
        this.moves = 0;
        this.displayMoves();
        this.resets = 0;
        this.displayResets();
    }

}




// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
