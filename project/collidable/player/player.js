import Collidable from '../collidable.js';
import BulletSystem from '../bullet/bulletSystem.js';
import constants from '../../constants.js';

const { WIDTH, HEIGHT } = constants;

let Player = function (position, radius) {
    Collidable.call(this, position, radius);

    this.gravity = 4;
    this.upForce = this.gravity * 12;
    this.velocity = createVector(10, this.gravity);
    this.direction = 0;
    this.isDead = false;
    this.bullets = new BulletSystem();
};

Player.prototype = Object.create(Collidable.prototype);
Player.prototype.constructor = Player;

//internals

Player.prototype.fall = function () {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
}

Player.prototype.checkEdges = function () {

    if (this.position.y > HEIGHT) {
        this.position.y = HEIGHT;
        this.velocity.y = 0;
    } else if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y *= -0.5;
    } else if (this.position.x - this.radius < 0) {
        this.position.x = 0 + this.radius;
    } else if (this.position.x + this.radius > WIDTH) {
        this.position.x = WIDTH - this.radius;
    }

};

Player.prototype.checkCollision = function (particles) {

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];

        if (this.hits(particle)) {
            noLoop();
        }
    }
};

Player.prototype.shoot = function (particles) {
    this.bullets.run(particles);
};

Player.prototype.show = function () {
    noStroke();
    fill(54, 202, 239);
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y - this.radius, this.radius * 2, this.radius * 2);
};


//externals
Player.prototype.setDirection = function (direction) {
    this.direction = direction;
};

Player.prototype.jump = function () {
    if (this.velocity.y === 0) {
        this.velocity.y -= this.upForce;
        this.velocity.x += this.direction;
    }
};

Player.prototype.loadBullet = function () {
    this.bullets.load(createVector(this.position.x, this.position.y - this.radius * 2), this.radius / 2);
};

Player.prototype.start = function (particles) {
    this.checkCollision(particles);// needs to be invoked by game
    this.shoot(particles);
    this.show();
};

Player.prototype.move = function () {
    this.position.x += this.direction * this.velocity.x;
    this.fall();
    this.checkEdges();
};

export default Player;