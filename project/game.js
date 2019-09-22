let system;
let player;
let rightIsBeingPressed = false;
let leftIsBeingPressed = false;
let upIsBeingPressed = false;
const screenWidth = 1665;
const screenHeight = 860;
const SPACE = 32;
//const img;
/*
function preload() {
    img = loadImage('images/something.extension');
}
*/
function setup() {
    createCanvas(screenWidth, screenHeight);//(1665, 860);
    system = new ParticleSystem(createVector(screenWidth / 2, screenHeight / 6));
    player = new Player(createVector(width / 2, height));
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