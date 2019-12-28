import Bullet from './bullet.js';

let BulletSystem = function () {
    this.bullets = [];
};


//externals
BulletSystem.prototype.load = function (position, radius) {
    this.bullets.push(new Bullet(position, radius));
};

BulletSystem.prototype.run = function (particles) {

    for (let i = this.bullets.length - 1; i >= 0; i--) {

        let bullet = this.bullets[i];

        bullet.run();

        for (let j = 0; j < particles.length; j++) {
            if (bullet.hits(particles[j])) {
                this.bullets.splice(i, 1);
                particles[j].die();
            }
        }

        if (bullet.goOutOfBounds()) {
            this.bullets.splice(i, 1);
        }
    }

};

export default BulletSystem;
