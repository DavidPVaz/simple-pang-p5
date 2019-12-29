let Collidable = function(position, radius) {
    this.position = position.copy();
    this.radius = radius;
};

Collidable.prototype.hits = function(particle) {
    let distance = dist(this.position.x, this.position.y, particle.position.x, particle.position.y);
    return distance < this.radius + particle.radius;
};

export default Collidable;
