let Player = function (position) {
    this.position = position.copy(); //position has a 'x' and 'y' values from the vector
    this.gravity = 9.5;
    this.velocity = createVector(7, this.gravity);
    this.direction = 0;
    this.radius = 20;
    this.isDead = false;
    this.bullets = new BulletSystem();
};

Player.prototype.jump = function () {
    this.velocity.y -= this.gravity*8; 
    //this.position.y -= this.velocity.y;
};

Player.prototype.fall = function () {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
}

Player.prototype.move = function () {
    this.position.x += this.direction * this.velocity.x;
    this.fall();
    this.checkEdges();
};

Player.prototype.checkEdges = function () {

    //return this.position.x - this.width / 2 + this.direction > 0 && this.position.x + this.width / 2 + this.direction < screenWidth;
    if (this.position.y > screenHeight) {
        this.position.y = screenHeight;
        this.velocity.y = 0;
    }

    if (this.position.x - this.radius < 0) {
        this.position.x = 0 + this.radius;

    } else if (this.position.x + this.radius > screenWidth) {
        this.position.x = screenWidth - this.radius;
    }

};

Player.prototype.setDirection = function (direction) {
    this.direction = direction;
}

Player.prototype.loadBullets = function () {
    this.bullets.load(this.position.x, this.position.y - this.radius * 2);
};

Player.prototype.start = function (particles) {
    this.checkCollision(particles);
    this.shoot(particles);
    this.show();
};

Player.prototype.checkCollision = function (particles) {

    for (let i = 0; i < particles.length; i++) {
        let particle = particles[i];

        if (this.hits(particle)) {
            console.log("Player collided with particle");
            noLoop();
        }
    }
};

Player.prototype.hits = function (particle) {

    let distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);

    return distance < this.radius + particle.radius;

};

Player.prototype.shoot = function (particles) {
    this.bullets.run(particles);
};

Player.prototype.show = function () {
    noStroke();
    fill(20, 5, 200);
    ellipseMode(CENTER);
    ellipse(this.position.x, this.position.y - this.radius, this.radius * 2, this.radius * 2);
    //rectMode(CENTER);
    //rect(this.position.x, this.position.y - this.height / 2, this.width, this.height);
};



