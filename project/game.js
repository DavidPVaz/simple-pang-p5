import ParticleSystem from './particle/particleSystem.js';
import Player from './collidable/player/player.js';
import constants from './constants.js';

let particleSystem, player;
let rightIsBeingPressed, leftIsBeingPressed = false;
const { WIDTH, HEIGHT, SYSTEM_STARTING_X, SYSTEM_STARTING_Y, PLAYER_STARTING_X, PLAYER_STARTING_Y, PLAYER_STARTING_RADIUS, SPACE } = constants;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    particleSystem = new ParticleSystem(createVector(SYSTEM_STARTING_X, SYSTEM_STARTING_Y));
    player = new Player(createVector(PLAYER_STARTING_X, PLAYER_STARTING_Y), PLAYER_STARTING_RADIUS);
    console.log(player);
}

function draw() {
    background(54, 49, 53);
    particleSystem.addParticles();
    particleSystem.run();
    particleSystem.printLevel();

    player.show();
    player.move();
    player.run(particleSystem.getParticles());
    player.setDirection(leftIsBeingPressed && !rightIsBeingPressed ? -1 : rightIsBeingPressed && !leftIsBeingPressed ? 1 : 0);
}

function keyPressed() {
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

function keyReleased() {
    switch (keyCode) {
        case LEFT_ARROW:
            leftIsBeingPressed = false;
            break;
        case RIGHT_ARROW:
            rightIsBeingPressed = false;
            break;
    }
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;
