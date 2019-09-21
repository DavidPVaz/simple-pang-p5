// A simple Particle class
let Particle = function (position, radius) {
    this.acceleration = createVector(0, 0.1);
    this.velocity = createVector(random(-3, 3), random(-2.5, 0));
    this.position = position.copy();
    this.isDead = false;
    this.radius = radius;
};


Particle.prototype.run = function () {
    this.update();
    this.show();
};

// Method to update position
Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

// Method to display
Particle.prototype.show = function () {
    stroke(500);
    strokeWeight(4); // ellipes borders
    fill(255, 100, 80); // RGB
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Particle.prototype.checkEdges = function () {
    if (this.position.y > (screenHeight - this.radius)) {
        // A little dampening when hitting the bottom
        this.velocity.y *= -1;
        this.position.y = (screenHeight - this.radius);
    }

    if (this.position.x < (0 + this.radius)) {
        this.velocity.x *= -1;
        this.position.x = (0 + this.radius);
    }

    if (this.position.x > (screenWidth - this.radius)) {
        this.velocity.x *= -1;
        this.position.x = (screenWidth - this.radius);
    }
};

Particle.prototype.die = function () {
    this.isDead = true;
};
