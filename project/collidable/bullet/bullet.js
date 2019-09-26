let Bullet = function (position, radius) {
    Collidable.call(this, position, radius);

    this.speed = 5;
};

Bullet.prototype = Object.create(Collidable.prototype);
Bullet.prototype.constructor = Bullet;

//internals
Bullet.prototype.show = function () {
    noStroke();
    fill(247, 67, 12);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Bullet.prototype.move = function () {
    this.position.y -= this.speed;
};


//externals
Bullet.prototype.goOutOfBounds = function () {
    return this.position.y <= 0;
}

Bullet.prototype.run = function() {
    this.show();
    this.move();
}