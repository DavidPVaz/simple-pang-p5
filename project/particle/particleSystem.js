
let ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];
    this.numberOfParticles = 2;
    this.incrementParticles = 2;
    this.initialRadius = 80;
    this.level = 1;
};

ParticleSystem.prototype.addParticles = function () {
    for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this.origin, this.initialRadius));
    }

    this.numberOfParticles = 0;
};

ParticleSystem.prototype.resetParticles = function () {
    this.incrementParticles += Math.round(this.incrementParticles / 2);
    this.numberOfParticles = this.incrementParticles;
}

ParticleSystem.prototype.getParticles = function () {
    return this.particles;
}

ParticleSystem.prototype.run = function () {
    for (let i = this.particles.length - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.run();
        particle.checkEdges();

        if (particle.isDead) {
            this.doubleUp(particle);
            this.particles.splice(i, 1);
        }
    }

    if (this.particles.length === 0) {
        this.resetParticles();
        this.level++;
    }
};

ParticleSystem.prototype.doubleUp = function (particle) {

    if (particle.radius <= 30) {
        return;
    }

    for (let i = 0; i < 2; i++) {
        this.particles.push(new Particle(particle.position, particle.radius / 1.5));
    }
};

ParticleSystem.prototype.getCurrentLevel = function () {
    return this.level;
};
