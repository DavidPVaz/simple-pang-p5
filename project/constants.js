let width = Math.min(window.screen.availWidth, window.innerWidth);
let height = Math.min(window.screen.availHeight, window.innerHeight)

export default {
    WIDTH : width,
    HEIGHT : height,
    SPACE : 32,
    PLAYER_STARTING_X : width / 2,
    PLAYER_STARTING_Y : height,
    PLAYER_STARTING_RADIUS : 20,
    SYSTEM_STARTING_X : width / 2,
    SYSTEM_STARTING_Y : height / 6
};
