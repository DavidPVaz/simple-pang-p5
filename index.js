import Game from './game/game.js';
import { mobileAgents } from './game/constants.js';

document.onreadystatechange = function() {

    if (window.sessionStorage.readyToRunGame) {
        Object.assign(window, Game);
    }
};

window.onload = function() {

    window.sessionStorage.readyToRunGame 
        ? (async function() {
            clearButton();
            await lockOrientationInLandscape();
        })()

        : (function() {
            unlockOrientation();
            addButton();
        })();

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

    async function lockOrientationInLandscape() {

        if (!isMobile()) {
            return;
        }

        await window.screen.orientation.lock('landscape-primary');
    }

    function unlockOrientation() {

        if (!isMobile()) {
            return;
        }

        window.screen.orientation.unlock();
    }

    function isMobile() {
        return mobileAgents.some(function(userAgent) {
            return !!window.navigator.userAgent.match(new RegExp(`${userAgent}`, 'i'));
        });
    }
};

window.onorientationchange = async function() {

    const canvas = document.querySelector('#defaultCanvas0');

    if (canvas && !isFullScreen()) {
        await canvas.requestFullscreen();
        return;
    }

    if (isFullScreen()) {
        await document.exitFullscreen();
    }
    
    function isFullScreen() {
        return window.screen.availWidth === window.innerWidth && window.screen.availHeight === window.innerHeight;
    }
}
