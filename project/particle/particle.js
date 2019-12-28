import constants from '../constants.js';

const { WIDTH, HEIGHT } = constants;

let Particle = function(position, radius) {
    this.acceleration = createVector(0, 0.1);
    this.velocity = createVector(random(-3, 3), random(-2.5, 0));
    this.position = position.copy();
    this.dead = false;
    this.radius = radius;
};

Particle.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

Particle.prototype.show = function() {
    stroke(500);
    strokeWeight(5);
    fill(239, 147, 9);
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Particle.prototype.checkEdges = function() {

    if (this.position.y > (HEIGHT - this.radius)) {
        this.position.y = (HEIGHT - this.radius);
        this.velocity.y *= -1;
    }

    if (this.position.x < (0 + this.radius)) {
        this.position.x = (0 + this.radius);
        this.velocity.x *= -1;
    }

    if (this.position.x > (WIDTH - this.radius)) {
        this.position.x = (WIDTH - this.radius);
        this.velocity.x *= -1;
    }
};

Particle.prototype.die = function() {
    this.dead = true;
};

Particle.prototype.run = function() {
    this.show();
    this.move();
    this.checkEdges();
};

Particle.prototype.isDead = function() {
    return this.dead;
};

Particle.prototype.getRadius = function() {
    return this.radius;
};

export default Particle;