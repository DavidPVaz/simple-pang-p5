const mobileAgents = ['android', 'iphone', 'ipad', 'blackberry', 'windows phone', 'webos'];
const controls = ['up', 'left', 'right', 'shoot'];

function isMobile() {
    return mobileAgents.some(function(userAgent) {
        return !!window.navigator.userAgent.match(new RegExp(`${userAgent}`, 'i'));
    });
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

export { isMobile, addMobileControls, removeMobileControls };
