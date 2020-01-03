import Collidable from '../collidable.js';
import BulletSystem from '../bullet/bulletSystem.js';
import constants from '../../game/constants.js';

const { WIDTH, HEIGHT } = constants;

const Player = (function() {

    const privateMethodsMap = new WeakMap();

    const Player = function(position, radius) {
        Collidable.call(this, position, radius);

        this.gravity = 4;
        this.upForce = this.gravity * 12;
        this.velocity = createVector(10, this.gravity);
        this.direction = 0;
        this.isDead = false;
        this.bullets = new BulletSystem();

        const show = () => {
            noStroke();
            fill(54, 202, 239);
            ellipseMode(CENTER);
            ellipse(this.position.x, this.position.y - this.radius, this.radius * 2, this.radius * 2);
        };

        const move = () => {
            this.position.x += this.direction * this.velocity.x;
        };

        const fall = () => {
            this.velocity.y += this.gravity;
            this.position.y += this.velocity.y;
        };

        const checkEdges = () => {

            if (this.position.y > HEIGHT) {
                this.position.y = HEIGHT;
                this.velocity.y = 0;
            }

            if (this.position.x - this.radius < 0) {
                this.position.x = 0 + this.radius;
            }

            if (this.position.x + this.radius > WIDTH) {
                this.position.x = WIDTH - this.radius;
            }
        };

        privateMethodsMap.set(this, {
            show,
            move,
            fall,
            checkEdges
        });
    };

    Player.prototype = Object.create(Collidable.prototype);
    Player.prototype.constructor = Player;

    Player.prototype.run = function() {
        privateMethodsMap.get(this).show();
        privateMethodsMap.get(this).move();
        privateMethodsMap.get(this).fall();
        privateMethodsMap.get(this).checkEdges();
    };

    Player.prototype.shoot = function(particles) {
        this.bullets.run(particles);
    };

    Player.prototype.setDirection = function(direction) {
        this.direction = direction;
    };

    Player.prototype.jump = function() {

        if (this.position.y === HEIGHT) {
            this.velocity.y -= this.upForce;
            this.velocity.x += this.direction;
        }
    };

    Player.prototype.loadBullet = function() {
        this.bullets.load(createVector(this.position.x, this.position.y - this.radius * 2), this.radius / 2);
    };

    return Player;

})();

export default Player;