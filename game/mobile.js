const mobileAgents = ['android', 'iphone', 'ipad', 'blackberry', 'windows phone', 'webos'];
const keys = { 
    up : { code: 'ArrowUp' , which: 38},
    left: { code: 'ArrowLeft' , which: 37 }, 
    right: { code: 'ArrowRight' , which: 39 }, 
    shoot: { code: 'Space' , which: 32 }
};

function getEventOptions(code, which) {
    return {
        key: code === 'Space' ? ' ' : code,
        code,
        keyCode: which,
        which,
        bubbles: true,
        cancelable: true
    };
}

const touchStartHandlers = Object.keys(keys).map(function(control) {
    return function() {
        document.body.dispatchEvent(new KeyboardEvent('keydown', getEventOptions(keys[control].code, keys[control].which)));
    };
});

const touchEndHandlers = Object.keys(keys).map(function(control) {
    return function() {
        document.body.dispatchEvent(new KeyboardEvent('keyup', getEventOptions(keys[control].code, keys[control].which)));
    };
});

function isMobile() {
    return mobileAgents.some(function(userAgent) {
        return !!window.navigator.userAgent.match(new RegExp(`${userAgent}`, 'i'));
    });
}

function addMobileControls() {

    if (!isMobile()) {
        return;
    }

    Object.keys(keys).forEach(function(control, index){

        let button = document.createElement('BUTTON');
        button.id = control;
        button.innerHTML = control.substring(0, 1);
        button.addEventListener('touchstart', touchStartHandlers[index], { passive: true });
        button.addEventListener('touchend', touchEndHandlers[index], { passive: true });
        document.body.appendChild(button);
    });
}

export { isMobile, addMobileControls };
