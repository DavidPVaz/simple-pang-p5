let system;
let screenWidth = 1665;
let screenHeight = 860;

function setup() {
    createCanvas(screenWidth, screenHeight);//(1665, 860);
    system = new ParticleSystem(createVector(screenWidth / 2, screenHeight / 5));
    system.numberOfParticles = 7;
}

function draw() {
    background(10, 10, 10);

    if (system.numberOfParticles > 0) {
        system.addParticle();
        system.numberOfParticles--;
    }
    system.run();
}

// A simple Particle class
let Particle = function (position) {
    this.acceleration = createVector(0, 0.04);
    this.velocity = createVector(random(-3, 3), random(-2.5, 0));
    this.position = position.copy();
    this.lifespan = 200;
    this.size = 160;
};

Particle.prototype.checkEdges = function () {
    if (this.position.y > (screenHeight - this.size / 2)) {
        // A little dampening when hitting the bottom
        this.velocity.y *= -0.95;
        this.position.y = (screenHeight - this.size / 2);
    }

    if (this.position.x < (0 + this.size / 2)) {
        this.velocity.x *= -0.95;
        this.position.x = (0 + this.size / 2);
    }

    if (this.position.x > (screenWidth - this.size / 2)) {
        this.velocity.x *= -0.95;
        this.position.x = (screenWidth - this.size / 2);
    }
};

Particle.prototype.run = function () {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
};

// Method to display
Particle.prototype.display = function () {
    stroke(500);
    strokeWeight(4); // ellipes borders
    fill(255, 100, 80); // RGB
    ellipse(this.position.x, this.position.y, this.size, this.size);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
    return this.lifespan <= 0;
};


let ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function () {
    for (let i = this.particles.length - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.run();
        particle.checkEdges();

        if (particle.isDead()) {
            this.particles.splice(i, 1);
        }
    }
}

