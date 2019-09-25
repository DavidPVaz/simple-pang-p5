let system;
let player;
let rightIsBeingPressed = false;
let leftIsBeingPressed = false;
let upIsBeingPressed = false;
const WIDTH = 1665;
const HEIGHT = 860;
const SPACE = 32;
const PLAYER_STARTING_X = WIDTH / 2;
const PLAYER_STARTING_Y = HEIGHT;
const PLAYER_STARTING_RADIUS = 20;
const SYSTEM_STARTING_X = WIDTH / 2;
const SYSTEM_STARTING_Y = HEIGHT / 6;

function setup() {
    createCanvas(WIDTH, HEIGHT);//(1665, 860);
    system = new ParticleSystem(createVector(SYSTEM_STARTING_X, SYSTEM_STARTING_Y));
    player = new Player(createVector(PLAYER_STARTING_X, PLAYER_STARTING_Y), PLAYER_STARTING_RADIUS);
}

function draw() {

    background(54, 49, 53);
    system.addParticles();
    system.run();
    system.printLevel();

    player.start(system.getParticles());
    player.move(system.getParticles());

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