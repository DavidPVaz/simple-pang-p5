let system;
let player;
let bullet;
const screenWidth = 1665;
const screenHeight = 860;

function setup() {
    createCanvas(screenWidth, screenHeight);//(1665, 860);
    system = new ParticleSystem(createVector(screenWidth / 2, screenHeight / 6));
    player = new Player(createVector(width / 2, height));
    bullet = new Bullet(createVector(player.position.x, player.position.y - (player.height / 2)));
}

function draw() {
    background(10, 10, 10);

    if (system.numberOfParticles > 0) {
        system.addParticle();
        system.numberOfParticles--;
    }
    bullet.show();
    bullet.move();
    player.show();
    system.run();
}

function keyPressed() {

    switch (keyCode) {
        case RIGHT_ARROW:
            player.move(1);
            break;
        case LEFT_ARROW:
            player.move(-1);
            break;
    }
}
