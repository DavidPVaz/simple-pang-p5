import Collidable from '../collidable.js';

const Bullet = (function() {

    const privateMethodsMap = new WeakMap();

    let Bullet = function(position, radius) {
        Collidable.call(this, position, radius);

        this.speed = 5;

        const show = () => {
            noStroke();
            fill(247, 67, 12);
            ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
        };

        const move = () => {
            this.position.y -= this.speed;
        };

        privateMethodsMap.set(this, {
            show,
            move
        });
    };

    Bullet.prototype = Object.create(Collidable.prototype);
    Bullet.prototype.constructor = Bullet;

    Bullet.prototype.run = function() {
        privateMethodsMap.get(this).show();
        privateMethodsMap.get(this).move();
    };

    Bullet.prototype.goOutOfBounds = function() {
        return this.position.y <= 0;
    };

    return Bullet;

})();

export default Bullet;
