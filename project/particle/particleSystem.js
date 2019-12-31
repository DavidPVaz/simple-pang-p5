import Particle from './particle.js';
import constants from '../constants.js';

const { WIDTH, HEIGHT } = constants;

const ParticleSystem = (function() {

    const privateMethodsMap = new WeakMap();

    const ParticleSystem = function(position) {
        this.origin = position.copy();
        this.particles = [];
        this.numberOfParticles = 2;
        this.incrementParticles = 2;
        this.initialRadius = 80;
        this.level = 1;

        const resetParticles = () => {
            this.incrementParticles += Math.round(this.incrementParticles / 2);
            this.numberOfParticles = this.incrementParticles;
        };

        const doubleUp = particle => {

            if (particle.getRadius() <= 30) {
                return;
            }

            for (let i = 0; i < 2; i++) {
                this.particles.push(new Particle(particle.position, particle.radius / 1.5));
            }
        };

        privateMethodsMap.set(this, {
            resetParticles,
            doubleUp
        });
    };

    ParticleSystem.prototype.run = function() {

        this.particles.forEach((particle, index) => {

            particle.run();

            if (particle.isDead()) {
                privateMethodsMap.get(this).doubleUp(particle);
                this.particles.splice(index, 1);
            }
        });

        if (this.particles.length === 0) {
            privateMethodsMap.get(this).resetParticles();
            this.level++;
        }
    };

    ParticleSystem.prototype.printLevel = function() {
        noStroke();
        fill(255);
        textSize(50);
        text('Level: ' + nf(this.level), WIDTH * 0.02, HEIGHT * 0.08);
    };

    ParticleSystem.prototype.addParticles = function() {

        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this.origin, this.initialRadius));
        }

        this.numberOfParticles = 0;
    };

    ParticleSystem.prototype.getParticles = function() {
        return this.particles;
    };

    return ParticleSystem;

})();

export default ParticleSystem;
