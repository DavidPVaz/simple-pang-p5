let Player = function (position) {
    this.position = position.copy(); //position has a 'x' and 'y' values from the vector
    this.acceleration = createVector(0.005, 0);
    this.velocity = createVector(8, 0);
    this.direction = 0;
    this.width = 40;
    this.height = 100;
    this.isDead = false;
    this.bullets = new BulletSystem();
};

Player.prototype.move = function (particles) {
    this.velocity.add(this.acceleration);
    this.position.x += this.direction * this.velocity.x;
    this.checkEdges();
    //this.checkCollision(particles);
};

Player.prototype.checkCollision = function (particles) {

};

Player.prototype.checkEdges = function () {

    //return this.position.x - this.width / 2 + this.direction > 0 && this.position.x + this.width / 2 + this.direction < screenWidth;
    if (this.position.y > screenHeight) {
        this.position.y = screenHeight;
    }

    if (this.position.x - this.width / 2 < 0) {
        this.position.x = (0 + this.width / 2);

    } else if (this.position.x + this.width / 2 > screenWidth) {
        this.position.x = (screenWidth - this.width / 2);
    }

};

Player.prototype.setDirection = function (direction) {
    this.direction = direction;
}

Player.prototype.loadBullets = function () {
    this.bullets.load(this.position.x, this.position.y - this.height);
};

Player.prototype.start = function (particles) {
    this.shoot(particles);
    this.show();
};

Player.prototype.shoot = function (particles) {
    this.bullets.run(particles);
};

Player.prototype.show = function () {
    noStroke();
    fill(20, 5, 200);
    rectMode(CENTER);
    rect(this.position.x, this.position.y - this.height / 2, this.width, this.height);
};



