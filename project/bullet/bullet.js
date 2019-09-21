let Bullet = function(x, y) {
    this.position = createVector(x, y);
    this.width = 10;
    this.height = 20;
    this.speed = 5;
};

Bullet.prototype.show = function() {
    noStroke();
    fill(200, 0, 200);
    rect(this.position.x, this.position.y, this.width, this.height);
};

Bullet.prototype.move = function() {
    this.position.y -= 1 * this.speed;
}