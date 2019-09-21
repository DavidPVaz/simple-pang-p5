let Bullet = function (position) {
    this.position = position.copy();
    this.width = 8;
    this.height = 15;
    this.speed = 5;
};

Bullet.prototype.show = function () {
    fill(50, 0, 200);
    rect(this.position.x, this.position.y, this.width, this.height);
};

Bullet.prototype.move = function () {
    this.position.y -= 1 * this.speed;
}