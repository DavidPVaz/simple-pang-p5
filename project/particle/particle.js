import constants from '../constants.js';

const { WIDTH, HEIGHT } = constants;

let Particle = (function() {

    let privateMethodsMap = new WeakMap();

    let Particle = function(position, radius) {
        this.acceleration = createVector(0, 0.1);
        this.velocity = createVector(random(-3, 3), random(-2.5, 0));
        this.position = position.copy();
        this.dead = false;
        this.radius = radius;

        let move = () => {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        };

        let show = () => {
            stroke(500);
            strokeWeight(5);
            fill(239, 147, 9);
            ellipseMode(CENTER);
            ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
        };

        let checkEdges = () => {

            if (this.position.y > (HEIGHT - this.radius)) {
                this.position.y = (HEIGHT - this.radius);
                this.velocity.y *= -1;
            }

            if (this.position.x < (0 + this.radius)) {
                this.position.x = (0 + this.radius);
                this.velocity.x *= -1;
            }

            if (this.position.x > (WIDTH - this.radius)) {
                this.position.x = (WIDTH - this.radius);
                this.velocity.x *= -1;
            }
        };

        privateMethodsMap.set(this, {
            move,
            show,
            checkEdges
        });
    };

    Particle.prototype.run = function() {
        privateMethodsMap.get(this).show();
        privateMethodsMap.get(this).move();
        privateMethodsMap.get(this).checkEdges();
    };

    Particle.prototype.die = function() {
        this.dead = true;
    };

    Particle.prototype.isDead = function() {
        return this.dead;
    };

    Particle.prototype.getRadius = function() {
        return this.radius;
    };

    return Particle;

})();

export default Particle;
