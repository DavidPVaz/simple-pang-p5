
let ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];
    this.numberOfParticles = 8;
};

ParticleSystem.prototype.addParticles = function() {
    for (let i = 0; i < this.numberOfParticles; i++) {
        this.particles.push(new Particle(this.origin));
    }

    this.numberOfParticles = 0;
};

ParticleSystem.prototype.resetParticles = function() {
    this.numberOfParticles = 8;
}

ParticleSystem.prototype.getParticles = function () {
    return this.particles;
}

ParticleSystem.prototype.run = function() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
        let particle = this.particles[i];
        particle.run();
        particle.checkEdges();

        if (particle.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};
