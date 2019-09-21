let BulletSystem = function () {
    this.bullets = [];
};

BulletSystem.prototype.load = function (x, y) {
    this.bullets.push(new Bullet(x, y));
};

BulletSystem.prototype.run = function () {

    for (let i = this.bullets.length - 1; i >= 0; i--) {
        let bullet = this.bullets[i];
        bullet.show();
        bullet.move();
    }

};