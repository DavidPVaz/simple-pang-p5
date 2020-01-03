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
        run();
        printLevel();
        checkCollision();

        player.run();
        player.shoot(particleSystem.getParticles());
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

    const run = function() {
        particleSystem.addParticles();
        particleSystem.run();
    };

    const printLevel = function() {
        noStroke();
        fill(255);
        textSize(50);
        text('Level: ' + nf(particleSystem.getLevel()), WIDTH * 0.02, HEIGHT * 0.08);
    };

    const checkCollision = function() {

        let particles = particleSystem.getParticles();

        for (let particle of particles) {
            if (player.hits(particle)) {
                noLoop();
                textSize(100);
                text('Game Over', WIDTH * 0.35, HEIGHT * 0.4);
                setTimeout(function(){
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
        keyReleased
    };

})();
