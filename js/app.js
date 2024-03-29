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


// =====================
// Starter code comment:
// =====================
// Enemies our player must avoid
// var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // this.sprite = 'images/enemy-bug.png';
// };


let People = function(coordX, coordY) {
    // The People constructor function uses two parameters for the X and Y
    // coordinates of the sprites, while the initial speed of the sprites
    // is set to 100 and also, a random sprite is assigned to each object.
    // During reset, i.e. when the sprites disappear from the screen,
    // their coordinates change and also, the image of each object changes
    // as an attempt to make the game a little more interesting.
    this.x = coordX;
    this.y = coordY;
    this.speed = 100;
    this.sprite = game.randomPerson();

    this.reset = function() {
        this.x = game.randomNumber(-984, -75);
        this.y = game.randomOption(60, 140, 220);
        this.sprite = game.randomPerson();
    }

    // Alternative reset() method using the initial coordinates 
    // for each sprite, although this approach makes the game more easy.

    // this.starterX = coordX;
    // this.starterY = coordY;

    // this.reset = function() {
    //     this.x = this.starterX;
    //     this.y = this.starterY;
    // }

}


// =====================
// Starter code comment:
// =====================
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
// };


People.prototype.update = function(dt) {
    // Depending on the level, the speed varies from
    // 150 up to 250 while the level 4 (speed 0) is used 
    // to pause the sprites at the end of the game, when 
    // the modal appears.
    // Also, a conditional statement checks when an
    // object goes out of the canvas, in order to reset it.
    if (game.level === 1) {
            allPeople.forEach(function(person) {
            person.speed = 150;
        });

    } else if (game.level === 2) {
            allPeople.forEach(function(person) {
            person.speed = 200;
        });

    } else if (game.level === 3) {
            allPeople.forEach(function(person) {
            person.speed = 250;
        });

    } else if (game.level === 4) {
            allPeople.forEach(function(person) {
            person.speed = 0;
        });
    }

    this.x = this.x + (this.speed * dt);

    if (this.x >= 909 ) {
        this.reset();
    }

    this.checkCollisions();

};


People.prototype.checkCollisions = function() {
    // The collisions are checked based on the distance between the People objects
    // and the player object. With some trial and error, the distance of 43 pixels
    // was selected and using absolute values, to simplify the code, we check whether
    // a collison took place and then, we reset the player object and we also increase
    // the number of resets and we display the new value.
    if ((Math.abs(player.x - this.x) <= 43) && (Math.abs(player.y - this.y) <= 43)) {
        player.reset();
        game.resets++; 
        game.displayResets();
    }

};


// =====================
// Starter code comment:
// =====================
// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// };


People.prototype.render = function() {
    // Drawing the people on the screen using the provided method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


// =====================
// Starter code comment:
// =====================
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


let Player = function(coordX, coordY) {
    // The Player constructor function uses the coordX and coordY
    // parameters for the X and Y position of the player while
    // the reset method places the player randomly on 3 different
    // positions, either on the left, center, or right of the canvas.
    // Using the method game.randomOption() the X coordinate during
    // reset could be either 200, 400 or 600, while the Y coordinate
    // remains constant at 400.
    this.x = coordX;
    this.y = coordY;
    this.sprite = 'images/char-princess-girl.png';

    this.reset = function() {
        this.x = game.randomOption(200, 400, 600);
        this.y = 400;
    }
}


Player.prototype.update = function(dt) {
    // This method checks whether the player has reached
    // the top row of the tiles and if the level is 1 or 2,
    // then the player resets and the level increases.
    // On level 3 though, the level increases to level 4,
    // which uses a speed of 0 to stop the sprites,
    // and the modal is displayed.
    if (this.y <= -40 && game.level <= 2) {
            this.reset();
            game.level++;
            game.displayLevel();

    } else if (this.y <= -40 && game.level === 3) {
            game.level++;
            game.stop();
            game.displayModal();
    }

};


Player.prototype.render = function(){
    // Drawing the player on the screen using the provided method
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};


Player.prototype.handleInput = function(evt) {
    // The game.level=4 is a level where the speed is set to 0
    // and is used to pause the sprites when the modal appears.
    // To also avoid the player from moving during that time,
    // the condition game.level<=3 is checked and only then
    // the player is able to move around the boundaries of 
    // the canvas, as have been set in the following conditional
    // statements. Also, the variable game.moves counts the
    // movements of the player and the value is displayed
    // on the screen using the method game.displayMoves().
    if (evt === 'left' && this.x > 0 && game.level <= 3) {
        this.x -= 25;
        game.moves++;
        game.displayMoves();

    } else if (evt === 'right' && this.x < 800 && game.level <= 3) {
        this.x += 25;
        game.moves++;
        game.displayMoves();

    } else if (evt === 'up' && this.y > -40 && game.level <= 3) {
        this.y -= 25;
        game.moves++;
        game.displayMoves();

    } else if (evt === 'down' && this.y < 400 && game.level <= 3) {
        this.y += 25;
        game.moves++;
        game.displayMoves();
    }
     
};


// =====================
// Starter code comment:
// =====================
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const game = new Game();
// First, we instantiate the game object, which provides
// a few useful methods for the implementation of the game.


const numberOfPeople = 8;
const allPeople = [];

for (let i = 0; i < numberOfPeople; i++) {
    // In this loop we instantiate the People objects.
    // Firstly, we provide a variable for the number
    // of objects we would like to instantiate and then,
    // we store those objects in the allPeople array.
    // Using the game.randomNumber() we assign a random
    // coordinate for the horizontal axis between
    // -984 and -75, which corresponds to a range of 909,
    // the horizontal size of the canvas. We assign negative
    // coordinates otherwise the objects would suddenly
    // appear on the canvas, should they were assigned 
    // with positive coordinates.
    // As for the vertical axis, using the method
    // game.randomOption() we assign a random lane
    // for each one of the objects at the Y coordinates 
    // of 60, 140 or 220.
    const xCoordinate = game.randomNumber(-984, -75);
    const yCoordinate = game.randomOption(60, 140, 220);

    allPeople[i] = new People(xCoordinate, yCoordinate);

}


const player = new Player(game.randomOption(200, 400, 600), 400);
// We instantiate the player object at the coordinate y=400 while,
// the x coordinate is a random number from 200, 400 or 600 so that
// the player will start either on the left, center or right side
// of the canvas, using the method game.randomOption()


// =====================
// Starter code comment:
// =====================
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


// ===============================================
// Changes made to the stater code of js/engine.js
// ===============================================
//
// Changing the Canvas size:
// =========================
// Line 27: canvas.width = 909;
// Line 28: canvas.height = 586;
// 
// Changing the columns for the blocks:
// ====================================
// Line 117: numRows = 6,
// Line 118: numCols = 9,
//
// Renaming allEnemies array and enemy parameter:
// ==============================================
// Line 93: allPeople.forEach(function(person) {
//          person.update(dt);
//          });
//
// Line 152: allPeople.forEach(function(person) {
//           person.render();
//           });
//
// Image edit and update:
// ======================
// Line 109: var rowImages = [
//           'images/water-block-new.png',   // Top row is water
//
// Updating the Resources.load():
// ==============================
// Line 171: Resources.load([
//              'images/water-block-new.png',
//              'images/stone-block.png',
//              'images/grass-block.png',
//              'images/char-cat-girl.png',
//              'images/char-horn-girl.png',
//              'images/char-boy.png',
//              'images/char-pink-girl.png',
//              'images/char-princess-girl.png'
//            ]);
//
