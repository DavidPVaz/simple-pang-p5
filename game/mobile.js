const mobileAgents = ['android', 'iphone', 'ipad', 'blackberry', 'windows phone', 'webos'];
const keys = { 
    up : 38,
    left: 37, 
    right: 39, 
    shoot: 32
};

const touchStartHandlers = Object.keys(keys).map(function(control) {
    return function() {
        document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: keys[control] }));
    };
});

const touchEndHandlers = Object.keys(keys).map(function(control) {
    return function() {
        document.dispatchEvent(new KeyboardEvent('keyup', { keyCode: keys[control] }));
    };
});

function isMobile() {
    return mobileAgents.some(function(userAgent) {
        return !!window.navigator.userAgent.match(new RegExp(`${userAgent}`, 'i'));
    });
}

function addMobileControls() {

    Object.keys(keys).forEach(function(control, index){

        let button = document.createElement('BUTTON');
        button.id = control;
        button.ontouchstart = touchStartHandlers[index];
        button.ontouchend = touchEndHandlers[index];
        document.body.appendChild(button);
    });
}

function removeMobileControls() {

    Object.keys(keys).forEach(function(control) {

        let button = document.querySelector(`#${control}`); 
        
        if (!button) {
            return;
        }

        button.parentNode.removeChild(button);
    });
}

export { isMobile, addMobileControls, removeMobileControls };
