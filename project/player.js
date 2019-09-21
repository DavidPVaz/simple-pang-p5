let Player = function (position) {
    this.position = position.copy(); //position has a 'x' and 'y' values from the vector
    this.width = 40;
    this.height = 100;
    this.isDead = false;
    this.speed = 10;
};

Player.prototype.show = function () {
    fill(255);
    rectMode(CENTER);
    rect(this.position.x, this.position.y - this.height / 2, this.width, this.height);
};

Player.prototype.move = function (direction) {
    this.position.x += direction * this.speed;
};