import Game from './game/game.js';

document.onreadystatechange = function() {

    if (window.sessionStorage.readyToRunGame) {
        Object.assign(window, Game);
    }
};


window.onload = function () {

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

window.screen.orientation.onchange = async function() {
    this.type.startsWith('landscape')
        ? await document.querySelector('#defaultCanvas0').webkitRequestFullscreen() 
        : document.webkitExitFullscreen();
};
