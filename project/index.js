let system;
let player;
let rightIsBeingPressed = false;
let leftIsBeingPressed = false;
const screenWidth = 1665;
const screenHeight = 860;
const SPACE = 32;

function setup() {
    createCanvas(screenWidth, screenHeight);//(1665, 860);
    system = new ParticleSystem(createVector(screenWidth / 2, screenHeight / 6));
    player = new Player(createVector(width / 2, height));
}

function draw() {
    background(200, 200, 200);

    system.addParticles();
    system.run();

    player.start(system.getParticles());
    player.move();

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
            player.loadBullets();
            break;
        case UP_ARROW:
            console.log("up pressed")
            player.jump();
            break;
    }
}

function keyReleased() {

    if (keyCode !== SPACE && !rightIsBeingPressed || keyCode !== SPACE && !leftIsBeingPressed) {
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
            console.log("up released");
            player.fall();
            break;
    }

}