import ParticleSystem from '../particle/particleSystem.js';
import Player from '../collidable/player/player.js';
import constants from './constants.js';
import { isMobile } from './mobile.js';

let particleSystem, player;
let rightIsBeingPressed, leftIsBeingPressed = false;
const { 
    SYSTEM_STARTING_X, SYSTEM_STARTING_Y, PLAYER_STARTING_X, PLAYER_STARTING_Y, PLAYER_PC_RADIUS, PLAYER_MOBILE_RADIUS, SPACE, UP, LEFT, RIGHT 
} = constants;

export default (function() {

    const setup = function() {
        createCanvas(window.innerWidth, window.innerHeight);
        particleSystem = new ParticleSystem(createVector(SYSTEM_STARTING_X, SYSTEM_STARTING_Y), isMobile());
        player = new Player(createVector(PLAYER_STARTING_X, PLAYER_STARTING_Y), isMobile() ? PLAYER_MOBILE_RADIUS : PLAYER_PC_RADIUS);
    };

    const draw = function() {
        background(54, 49, 53);
        run();
        printLevel();
        checkCollision();

        player.run();
        player.shoot(particleSystem.getParticles());
        player.setDirection(leftIsBeingPressed && !rightIsBeingPressed ? -1 : rightIsBeingPressed && !leftIsBeingPressed ? 1 : 0);
    };

    const keyPressed = function() {
        switch (keyCode) {
            case LEFT:
                leftIsBeingPressed = true;
                break;
            case RIGHT:
                rightIsBeingPressed = true;
                break;
            case SPACE:
                player.loadBullet();
                break;
            case UP:
                player.jump();
                break;
        }
    };

    const keyReleased = function() {
        switch (keyCode) {
            case LEFT:
                leftIsBeingPressed = false;
                break;
            case RIGHT:
                rightIsBeingPressed = false;
                break;
        }
    };

    const windowResized = function() {
        resizeCanvas(window.innerWidth, window.innerHeight);
    };

    const run = function() {
        particleSystem.addParticles();
        particleSystem.run();
    };

    const printLevel = function() {
        noStroke();
        fill(255);
        textSize(window.innerHeight / 20);
        text('Level: ' + nf(particleSystem.getLevel()), window.innerWidth * 0.02, window.innerHeight * 0.05);
    };

    const checkCollision = function() {

        const particles = particleSystem.getParticles();

        for (let particle of particles) {
            if (player.hits(particle)) {
                noLoop();
                textSize(window.innerWidth / 12);
                text('Game Over', window.innerWidth * 0.3, window.innerHeight * 0.4);
                setTimeout(function() {
                    window.sessionStorage.removeItem("readyToRunGame");
                    window.location.reload(true); 
                }, 2000);
            }
        }
    };

    return {
        setup,
        draw,
        keyPressed,
        keyReleased,
        windowResized
    };

})();
