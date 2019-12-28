import Bullet from './bullet.js';

let BulletSystem = function() {
    this.bullets = [];
};

BulletSystem.prototype.load = function(position, radius) {
    this.bullets.push(new Bullet(position, radius));
};

BulletSystem.prototype.run = function(particles) {

    this.bullets.forEach((bullet, index) => {

        bullet.run();

        for (let particle of particles) {
            if (bullet.hits(particle)) {
                this.bullets.splice(index, 1);
                particle.die();
            }
        }
    });

    this.bullets = this.bullets.filter(function(bullet) {
        return !bullet.goOutOfBounds();
    });    
};

export default BulletSystem;
