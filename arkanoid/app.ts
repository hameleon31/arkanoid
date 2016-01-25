/// <reference path="libs/jquery.d.ts" />

var canvas,
    context,
    w: number,
    h: number,
    gameOver: boolean = false,
    toLeft: boolean = true,
    toRight: boolean = true,
    score: number = -1,
    speed: number = 2.0,
    acceleration: number = 1.1,
    gameId: number = 0,
    delay: boolean = true;

var ball;
var platform;

//main objects
var BALL = function (x, y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.color = "blue";
    self.colors = ["blue", "yellow", "black", "green", "maroon"];
    self.radius = 15;
    self.vx = speed;
    self.vy = speed;
    self.changeColor = function () {
        var rand = Math.floor((Math.random() * self.colors.length) + 1);
        self.color = self.colors[rand - 1];
    }
};

var PLATFORM = function (x, y) {
    var self = this;
    self.x = x;
    self.y = y;
    self.color = "red";
    self.width = 100;
    self.heigth = 5;
    self.vx = 5;
};

function pause() {
    if (delay) {
        startGame();
    } else {
        window.cancelAnimationFrame(gameId);
    }
    delay = !delay;
}

// listeners
document.addEventListener("keydown", function (event) {
    switch (event.keyCode) {
        case 37: toLeft = true; toRight = false; break;
        case 39: toLeft = false; toRight = true; break;
        case 40: toLeft = false; toRight = false; break;
        case 32: if (gameId == 0) startGame(); break;
        case 13: pause(); break;
        default: toLeft = false; toRight = false; break;
    }
});

document.addEventListener("keyup", function (event) {
    toLeft = false;
    toRight = false;
});


window.onload = initWindow;

// prepare everything for game
function initWindow() {
    canvas = document.getElementById("canvas");
    w = canvas.width;
    h = canvas.height;
    context = canvas.getContext("2d");

    ball = new BALL(w / 2, h - 35);
    platform = new PLATFORM(w / 2, h - 20);
    platform.x -= platform.width / 2; 
    
    //paint ball	
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
    context.fillStyle = ball.color;
    context.fill();
    //context.lineWidth = 5;
    //context.strokeStyle = 'blue';
    //context.stroke();
	
    //paint platform
    context.fillStyle = platform.color;
    context.beginPath();
    context.fillRect(platform.x, platform.y, platform.width, platform.heigth);
    context.closePath();
}

function startGame() {
    if (!gameOver) {
        context.clearRect(0, 0, w, h);

        ball.x += ball.vx;
        ball.y += ball.vy;
        
        // touch to the wall
        if ((ball.x + ball.radius + ball.vx) > w || (ball.x - ball.radius + ball.vx) < 0) {
            console.log("touch to the wall");
            ball.vx *= -1;
        }
        // touch to the ceil
        if ((ball.y - ball.radius + ball.vy) < 0) {
            console.log("touch to the ceil");
            ball.vy *= -1;
        }
        else if ((ball.y + ball.radius + ball.vy) >= (h - platform.heigth - 10) &&
            (ball.y + ball.radius + ball.vy) < h) {
            if ((ball.x + ball.radius) > platform.x && (ball.x + ball.radius) <= (platform.x + platform.width)) {
                ball.vy *= -1;
                score += 1;
                ball.vx *= acceleration;
                ball.vy *= acceleration;
                jQuery('#score > h2 > span').html(String(score));
                jQuery('#speed > h2 > span').html(String(Math.abs(ball.vx.toFixed(2))));
                ball.changeColor();

            } else {
                // out of the platform - Game over
                score = 0;
                ball.vx = speed;
                ball.vy = speed;
                jQuery('#score > h2 > span').html("0");
                jQuery('#speed > h2 > span').html("0.00");
                gameOver = true;
            }
        }
        
        // platform moving
        if (toRight && platform.x + platform.width < w) {
            platform.x += platform.vx;
        }
        if (toLeft && platform.x > 0) {
            platform.x -= platform.vx;
        }
        
        //paint ball
        context.fillStyle = ball.color;
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
        
        //paint platform
        context.fillStyle = platform.color;
        context.beginPath();
        context.fillRect(platform.x, platform.y, platform.width, platform.heigth);
        context.closePath();

        //gameId = window.webkitRequestAnimationFrame(startGame);
    } else {
        clearInterval(gameId);
        alert("Game Over");
    }
}

gameId = setInterval(startGame, 1);
