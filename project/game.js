import ParticleSystem from './particle/particleSystem.js';
import Player from './collidable/player/player.js';
import constants from './constants.js';

let particleSystem;
let player;
let { rightIsBeingPressed, leftIsBeingPressed, upIsBeingPressed } = constants;
const { WIDTH, HEIGHT, SYSTEM_STARTING_X, SYSTEM_STARTING_Y, PLAYER_STARTING_X, PLAYER_STARTING_Y, PLAYER_STARTING_RADIUS, SPACE } = constants;

function setup() {
    createCanvas(WIDTH, HEIGHT);//(1665, 860);
    particleSystem = new ParticleSystem(createVector(SYSTEM_STARTING_X, SYSTEM_STARTING_Y));
    player = new Player(createVector(PLAYER_STARTING_X, PLAYER_STARTING_Y), PLAYER_STARTING_RADIUS);
}

function draw() {
    background(54, 49, 53);
    particleSystem.addParticles();
    particleSystem.run();
    particleSystem.printLevel();

    player.start(particleSystem.getParticles());
    player.move(particleSystem.getParticles());
}

function keyPressed() {
    switch (keyCode) {
        case LEFT_ARROW:
            player.setDirection(-1);
            leftIsBeingPressed = true;
            break;
        case RIGHT_ARROW:
            player.setDirection(1);
            rightIsBeingPressed = true;
            break;
        case SPACE:
            player.loadBullet();
            break;
        case UP_ARROW:
            upIsBeingPressed = true;
            player.jump();
            break;
    }
}

function keyReleased() {
    if (keyCode !== SPACE && !upIsBeingPressed && !rightIsBeingPressed || keyCode !== SPACE && !upIsBeingPressed && !leftIsBeingPressed) {
        player.setDirection(0);
    }

    switch (keyCode) {
        case LEFT_ARROW:
            leftIsBeingPressed = false;
            break;
        case RIGHT_ARROW:
            rightIsBeingPressed = false;
            break;
        case UP_ARROW:
            upIsBeingPressed = false;
            break;
    }
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.keyReleased = keyReleased;

