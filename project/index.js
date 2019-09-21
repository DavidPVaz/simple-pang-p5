let system;
let player;
const screenWidth = 1665;
const screenHeight = 860;

function setup() {
    createCanvas(screenWidth, screenHeight);//(1665, 860);
    system = new ParticleSystem(createVector(screenWidth / 2, screenHeight / 6));
    player = new Player(createVector(width / 2, height));
}

function draw() {
    background(10, 10, 10);

    system.addParticles();
    system.run();

    player.start(system.getParticles());

    if (keyCode === RIGHT_ARROW && keyIsPressed) {
        player.move(1);
    } else if (keyCode === LEFT_ARROW && keyIsPressed) {
        player.move(-1);
    }

}

function keyPressed() {

    switch (keyCode) {
        case BACKSPACE:
            player.loadBullets();
            break;
    }
}