import Game from './game/game.js';
import { isMobile, addMobileControls } from './game/mobile.js';

document.onreadystatechange = function() {

    if (window.sessionStorage.readyToRunGame) {
        Object.assign(window, Game);
    }
};

window.onload = function() {

    window.sessionStorage.readyToRunGame ? addMobileControls() : addMenuButton(); 

    function addMenuButton() {

        const button = document.createElement('BUTTON');
        button.id = 'play';
        button.innerHTML = "PLAY";
        document.body.appendChild(button);

        button.onclick = function() {
            window.sessionStorage.setItem("readyToRunGame", true);
            window.location.reload(true);
        };
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
};

