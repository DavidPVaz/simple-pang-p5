const width = window.innerWidth;
const height = window.innerHeight;
const mobileAgents = ['android', 'iphone', 'ipad', 'blackberry', 'windows phone', 'webos'];

export default {
    SPACE : 32,
    PLAYER_STARTING_X : width / 2,
    PLAYER_STARTING_Y : height,
    PLAYER_STARTING_RADIUS : 20,
    SYSTEM_STARTING_X : width / 2,
    SYSTEM_STARTING_Y : height / 6
};

export { mobileAgents };
