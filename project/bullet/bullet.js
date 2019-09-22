let Bullet = function (x, y) {
    this.position = createVector(x, y);
    this.radius = 10;
    this.speed = 5;
    this.initialY1 = height;
    this.initialY2 = height * 2;
};

Bullet.prototype.show = function () {
    noStroke();
    fill(200, 0, 200);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Bullet.prototype.move = function () {
    this.position.y -= this.speed;
};

/*
Bullet.prototype.showLine = function () {
    stroke(126);
    line(this.position.x, this.initialY1, this.position.x, this.initialY2);
};

Bullet.prototype.moveLine = function () {

    if (this.initialY1 > 0) {
        this.initialY1 -= this.speed;
        this.initialY2 -= this.speed;
    }
};
*/

Bullet.prototype.hits = function (particle) {

    let distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

    return distance < this.radius + particle.radius;

};

Bullet.prototype.goOutOfBounds = function () {
    return this.position.y <= 0;
}