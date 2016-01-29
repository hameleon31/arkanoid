var Core;
(function (Core) {
    var Platform = (function () {
        function Platform(x, y, speed, color) {
            if (speed === void 0) { speed = 3; }
            if (color === void 0) { color = 'blue'; }
            this.x = x;
            this.y = y;
            this.vx = speed;
            this.width = 100;
            this.height = 5;
            this.color = color;
            this.colors = ["blue", "yellow", "black", "green", "maroon"];
            this.x -= this.width / 2;
        }
        Platform.prototype.changeColor = function () {
            var rand = Math.floor((Math.random() * this.colors.length) + 1);
            this.color = this.colors[rand - 1];
        };
        Platform.prototype.moveLeft = function () {
            this.x -= this.vx;
        };
        Platform.prototype.moveRight = function () {
            this.x += this.vx;
        };
        return Platform;
    })();
    Core.Platform = Platform;
})(Core || (Core = {}));
//# sourceMappingURL=Platform.js.map