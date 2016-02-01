var Core;
(function (Core) {
    var Ball = (function () {
        function Ball(x, y, speed, color) {
            if (speed === void 0) { speed = 2; }
            if (color === void 0) { color = 'green'; }
            this.acceleration = 0.02;
            this.x = x;
            this.y = y;
            this.vx = speed;
            this.vy = speed;
            this.radius = 15;
            this.color = color;
            this.colors = ["#5e9c19", "#7eaf46", "#2f4e0c", "#aecd8c"];
        }
        Ball.prototype.changeColor = function () {
            var rand = Math.floor((Math.random() * this.colors.length) + 1);
            this.color = this.colors[rand - 1];
        };
        Ball.prototype.touchWall = function (w) {
            return (this.x + this.radius + this.vx) > w || (this.x - this.radius + this.vx) < 0;
        };
        Ball.prototype.touchCeil = function () {
            return (this.y - this.radius + this.vy) < 0;
        };
        Ball.prototype.touchFloor = function (h, platform) {
            var flag = (this.y + this.radius + this.vy) >= (h - platform.height - 10) &&
                (this.y + this.radius + this.vy) <= h;
            return flag;
        };
        Ball.prototype.touchPlatform = function (h, platform) {
            var flag = (this.x + this.radius) > platform.x &&
                (this.x + this.radius) <= (platform.x + platform.width);
            return flag;
        };
        Ball.prototype.move = function () {
            this.x += this.vx;
            this.y += this.vy;
        };
        Ball.prototype.jumpX = function () { this.vx *= -1; };
        Ball.prototype.jumpY = function () { this.vy *= -1; };
        Ball.prototype.accelerate = function () {
            ball.vx += ball.vx * this.acceleration;
            ball.vy += ball.vy * this.acceleration;
        };
        return Ball;
    })();
    Core.Ball = Ball;
})(Core || (Core = {}));
//# sourceMappingURL=Ball.js.map