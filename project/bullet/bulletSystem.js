let BulletSystem = function () {
    this.bullets = [];
};

BulletSystem.prototype.load = function (x, y) {
    this.bullets.push(new Bullet(x, y));
};

BulletSystem.prototype.run = function (particles) {

    for (let i = this.bullets.length - 1; i >= 0; i--) {

        let bullet = this.bullets[i];

        bullet.show();
        bullet.move();

        for (let j = 0; j < particles.length; j++) {
            if (bullet.hits(particles[j])) {
                console.log("HIT")
                this.bullets.splice(i, 1);
                particles[j].die();
            } else if (bullet.goOutOfBounds()) {
                this.bullets.splice(i, 1);
            }


        }
    }

};
