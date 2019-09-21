let Bullet = function (x, y) {
    this.position = createVector(x, y);
    this.radius = 10;
    this.speed = 5;
};

Bullet.prototype.show = function () {
    noStroke();
    fill(200, 0, 200);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

Bullet.prototype.move = function () {
    this.position.y -= 1 * this.speed;
};


Bullet.prototype.hits = function (particle) {
    
    let distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

    return distance < this.radius + particle.radius;
    
};