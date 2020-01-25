const mobileAgents = ['android', 'iphone', 'ipad', 'blackberry', 'windows phone', 'webos'];
const controls = ['up', 'left', 'right', 'shoot'];

function isMobile() {
    return mobileAgents.some(function(userAgent) {
        return !!window.navigator.userAgent.match(new RegExp(`${userAgent}`, 'i'));
    });
}

export { isMobile };

export { controls }