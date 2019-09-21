let Player = function (position) {
    this.position = position.copy(); //position has a 'x' and 'y' values from the vector
    this.width = 40;
    this.height = 100;
    this.isDead = false;
    this.speed = 10;
    this.bullets = new BulletSystem();
};

Player.prototype.move = function (direction) {
    this.position.x += direction * this.speed;
};

Player.prototype.start = function (particles) {
    this.shoot(particles);
    this.show();
};

Player.prototype.shoot = function (particles) {
    this.bullets.run(particles);
}

Player.prototype.show = function () {
    fill(255);
    rectMode(CENTER);
    rect(this.position.x, this.position.y - this.height / 2, this.width, this.height);
};

Player.prototype.loadBullets = function () {
    this.bullets.load(this.position.x, this.position.y - this.height);
};

