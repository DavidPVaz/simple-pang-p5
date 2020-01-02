import ParticleSystem from '../particle/particleSystem.js';
import Player from '../collidable/player/player.js';
import constants from './constants.js';

let particleSystem, player;
let rightIsBeingPressed, leftIsBeingPressed = false;
const { WIDTH, HEIGHT, SYSTEM_STARTING_X, SYSTEM_STARTING_Y, PLAYER_STARTING_X, PLAYER_STARTING_Y, PLAYER_STARTING_RADIUS, SPACE } = constants;

export default (function() {

    const setup = function() {
        createCanvas(WIDTH, HEIGHT);
        particleSystem = new ParticleSystem(createVector(SYSTEM_STARTING_X, SYSTEM_STARTING_Y));
        player = new Player(createVector(PLAYER_STARTING_X, PLAYER_STARTING_Y), PLAYER_STARTING_RADIUS);
    }

    const draw = function() {
        background(54, 49, 53);
        particleSystem.addParticles();
        particleSystem.run();
        particleSystem.printLevel();

        player.show();
        player.move();
        player.run(particleSystem.getParticles());
        player.setDirection(leftIsBeingPressed && !rightIsBeingPressed ? -1 : rightIsBeingPressed && !leftIsBeingPressed ? 1 : 0);
    }

    const keyPressed = function() {
        switch (keyCode) {
            case LEFT_ARROW:
                leftIsBeingPressed = true;
                break;
            case RIGHT_ARROW:
                rightIsBeingPressed = true;
                break;
            case SPACE:
                player.loadBullet();
                break;
            case UP_ARROW:
                player.jump();
                break;
        }
    }

    const keyReleased = function() {
        switch (keyCode) {
            case LEFT_ARROW:
                leftIsBeingPressed = false;
                break;
            case RIGHT_ARROW:
                rightIsBeingPressed = false;
                break;
        }
    }

    return {
        setup,
        draw,
        keyPressed,
        keyReleased
    };

})();
