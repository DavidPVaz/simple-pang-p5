define(["./game", "p5"], function (Game, p5) {

    let game = new Game();
    let myP5 = new p5();

    myP5.setup = () => {
        game.setup();
    }
    
    myP5.draw = () => {
        game.start();
    }

    myP5.keyPressed = () => {
        game.checkForKeyPressed();
    }

    myP5.keyReleased = () => {
        game.checkForKeyReleased();
    }

    return myP5;
});