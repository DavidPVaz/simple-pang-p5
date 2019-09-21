
let ParticleSystem = function (position) {
    this.origin = position.copy();
    this.particles = [];
    this.numberOfParticles = 8;
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
};
