import Game from './game/game.js';
import { isMobile, controls } from './game/mobile.js';

document.onreadystatechange = function() {

    if (window.sessionStorage.readyToRunGame) {
        Object.assign(window, Game);
    }
};

window.onload = function() {

    window.sessionStorage.readyToRunGame ? clearMenuButton() : addMenuButton(); 

    function addMenuButton() {

        const button = document.createElement('BUTTON');
        button.id = 'play';
        button.innerHTML = "PLAY";
        document.body.appendChild(button);

        button.onclick = function() {
            window.sessionStorage.setItem("readyToRunGame", true);
            window.location.reload(true);
        };

        if (!isMobile()) {
            return;
        }

        removeMobileControls();
    }

    function clearMenuButton() {

        const button = document.querySelector("#play");

        if (!button) {
            return;
        }

        button.parentNode.removeChild(button);

        if (!isMobile()) {
            return;
        }

        addMobileControls();
    }

    function addMobileControls() {

        arrayWithTouchStartHandlers
        arrayWithTouchEndHandlers
        controls.forEach(function(control){

            let button = document.createElement('BUTTON');
            button.id = control;
            button.ontouchstart = arrayWithTouchStartHandlers[index];
            button.ontouchend = arrayWithTouchEndHandlers[index];
            document.body.appendChild(button);
        });
    }

    function removeMobileControls() {

        controls.forEach(function(control) {

            let button = document.querySelector(`#${control}`); 
            
            if (!button) {
                return;
            }
    
            button.parentNode.removeChild(button);
        });
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

