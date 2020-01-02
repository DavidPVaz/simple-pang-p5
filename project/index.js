import Game from './game/game.js';

document.onreadystatechange = function() {

    setupWindowGame(Game.setup, Game.draw, Game.keyPressed, Game.keyReleased);

    function setupWindowGame(...args) {
        window.setup = args[0] || null;
        window.draw = args[1] || null;
        window.keyPressed = args[2] || null;
        window.keyReleased = args[3] || null;
    }

}
