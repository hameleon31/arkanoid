/// <reference path="libs/jquery.d.ts" />
/// <reference path="GameManager.ts" />
/// <reference path="CanvasManager.ts" />
/// <reference path="Ball.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Block.ts" />

var game: Core.GameManager = new Core.GameManager();
var ball: Core.Ball;
var platform: Core.Platform;
var canvasManager: Core.CanvasManager;

function pause() {
    if (game.delay) {
        clearInterval(game.id);
    } else {
        game.id = setInterval(play, 10);
    }
    game.delay = !game.delay;
}

// listeners
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: game.toLeft = true; game.toRight = false; break;
        case 39: game.toLeft = false; game.toRight = true; break;
        case 40: game.toLeft = false; game.toRight = false; break;
        case 13: pause(); break;
        case 32:
            if (game.id == 0) {
                game.id = setInterval(play, 10);
            };
            break;        
        default: game.toLeft = false; game.toRight = false; break;
    }
});

document.addEventListener("keyup", function (event) {
    game.toLeft = false;
    game.toRight = false;
});


window.onload = initWindow;

// prepare everything for game
function initWindow() {
    game.loadDOM();
    canvasManager = new Core.CanvasManager("canvas");
    var w: number = canvasManager.width();
    var h: number = canvasManager.height();
    ball = new Core.Ball(w / 2, h - 35);
    platform = new Core.Platform(w / 2, h - 20);    
    canvasManager.drawBall(ball);
    canvasManager.drawPlatform(platform);
    canvasManager.drawBlock(new Core.Block(50, 0, 100, 30), true);
    canvasManager.drawBlock(new Core.Block(300, 0, 350, 30), true);
}


// main function: call it every 10ms by setInterval()
function play() {
    if (!game.over) {

        if (canvasManager.countBlocks() < 1) {
            alert('Congratulations! You have reached to the next level');
            game.stop();
        }

        var w: number = canvasManager.width();
        var h: number = canvasManager.height();
        canvasManager.clear();
        ball.move()
        if (canvasManager.touchBlock(ball)) {
            
        } else {
            if (ball.touchWall(w)) {
                ball.jumpX();
            }
            if (ball.touchCeil()) {
                ball.jumpY();
            } else if (ball.touchFloor(h, platform)) {
                if (ball.touchPlatform(h, platform)) {
                    ball.jumpY();
                    game.score += 1;
                    ball.accelerate();
                    game.scoreText.html(String(game.score));
                    game.speedText.html(String(Math.abs(ball.vx).toFixed(2)));
                    ball.changeColor();
                } else {
                    game.gameOver();
                }
            }
        }
        
        // platform moving
        if (game.toRight && platform.x + platform.width < w) {
            platform.moveRight();
        }
        if (game.toLeft && platform.x > 0) {
            platform.moveLeft();
        }
        canvasManager.drawBall(ball);
        canvasManager.drawPlatform(platform);
        canvasManager.drawBlocks();
    } else {
        game.stop();
        alert("Game Over");
    }
}

