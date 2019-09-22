// A simple Particle class
let Particle = function (position, radius) {
    this.acceleration = createVector(0, 0.1);
    this.velocity = createVector(random(-3, 3), random(-2.5, 0));
    this.position = position.copy();
    this.isDead = false;
    this.radius = radius;
};


Particle.prototype.run = function () {
    this.move();
    this.show();
};

// Method to update position
Particle.prototype.move = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

// Method to display
Particle.prototype.show = function () {
    stroke(500);
    strokeWeight(5); // ellipes borders
    fill(239, 147, 9); // RGB
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Particle.prototype.checkEdges = function () {
    if (this.position.y > (screenHeight - this.radius)) {
        // A little dampening when hitting the bottom
        this.position.y = (screenHeight - this.radius);
        this.velocity.y *= -1;
    }

    if (this.position.x < (0 + this.radius)) {
        this.position.x = (0 + this.radius);
        this.velocity.x *= -1;
    }

    if (this.position.x > (screenWidth - this.radius)) {
        this.position.x = (screenWidth - this.radius);
        this.velocity.x *= -1;
    }
};

Particle.prototype.die = function () {
    this.isDead = true;
};
