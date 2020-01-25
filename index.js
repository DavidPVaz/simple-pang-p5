import Game from './game/game.js';
import { mobileAgents } from './game/constants.js';

document.onreadystatechange = function() {

    if (window.sessionStorage.readyToRunGame) {
        Object.assign(window, Game);
    }
};

window.onload = function() {

    window.sessionStorage.readyToRunGame ? clearButton() : addButton(); 

    function addButton() {

        const btn = document.createElement("BUTTON");
        btn.setAttribute("id", "play");
        btn.innerHTML = "PLAY";
        document.body.appendChild(btn);

        btn.addEventListener("click", function() {
            window.sessionStorage.setItem("readyToRunGame", true);
            window.location.reload(true);
        });
    }

    function clearButton() {

        const btn = document.querySelector("#play");

        if (!btn) {
            return;
        }

        btn.parentNode.removeChild(btn);
    }
};


window.screen.orientation.onchange = async function() {

    const canvas = document.querySelector('#defaultCanvas0');

    if (isMobile() && canvas) {

        try {
            await goFullScreenAndLock();
        } catch (error) {
            console.error(error);
        }
    }

    function goFullScreenAndLock() {
        return Promise.all([
            canvas.requestFullscreen(), 
            window.screen.orientation.lock(window.screen.orientation.type)
        ]);
    }

    function isMobile() {
        return mobileAgents.some(function(userAgent) {
            return !!window.navigator.userAgent.match(new RegExp(`${userAgent}`, 'i'));
        });
    }
};