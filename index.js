import Game from './game/game.js';

document.onreadystatechange = function() {

    window.sessionStorage.readyToRunGame ? setupWindowGame(Game.setup, Game.draw, Game.keyPressed, Game.keyReleased) : setupWindowGame();

    function setupWindowGame(...args) {
        window.setup = args[0] || null;
        window.draw = args[1] || null;
        window.keyPressed = args[2] || null;
        window.keyReleased = args[3] || null;
    }
};


window.onload = function() {

    window.sessionStorage.readyToRunGame ? clearButton() : addButton();

    function addButton() {
        let btn = document.createElement("BUTTON");
        btn.setAttribute("id", "play");
        btn.innerHTML = "PLAY";
        document.body.appendChild(btn);

        btn.addEventListener("click", function() {
            window.sessionStorage.setItem("readyToRunGame", true);
            window.location.reload(true);
        });
    }

    function clearButton() {
        let btn = document.querySelector("#play");
        btn.parentNode.removeChild(btn);
    }
};
