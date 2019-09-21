// A simple Particle class
let Particle = function (position) {
    this.acceleration = createVector(0, 0.04);
    this.velocity = createVector(random(-3, 3), random(-2.5, 0));
    this.position = position.copy();
    this.lifespan = 200;
    this.size = 160;
};

Particle.prototype.checkEdges = function () {
    if (this.position.y > (screenHeight - this.size/2)) {
        // A little dampening when hitting the bottom
        this.velocity.y *= -0.95;
        this.position.y = (screenHeight - this.size/2);
      }

    if (this.position.x < (0 + this.size/2)) {
        this.velocity.x *= -0.95;
        this.position.x = (0 + this.size/2);
    }

    if (this.position.x > (screenWidth - this.size/2)) {
        this.velocity.x *= -0.95;
        this.position.x = (screenWidth - this.size/2);
    }
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
    ellipse(this.position.x, this.position.y, this.size, this.size);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
    return this.lifespan <= 0;
};
