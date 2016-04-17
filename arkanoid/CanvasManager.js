var Core;
(function (Core) {
    var CanvasManager = (function () {
        function CanvasManager(canvasId) {
            this.blocks = [];
            this.canvas = document.getElementById(canvasId);
            this.context = this.canvas.getContext("2d");
        }
        CanvasManager.prototype.width = function () {
            return this.canvas.width;
        };
        CanvasManager.prototype.height = function () {
            return this.canvas.height;
        };
        CanvasManager.prototype.getCanvas = function () {
            return this.canvas;
        };
        CanvasManager.prototype.getContext = function () {
            return this.context;
        };
        CanvasManager.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width(), this.height());
        };
        CanvasManager.prototype.countBlocks = function () {
            return this.blocks.length;
        };
        CanvasManager.prototype.drawBall = function (ball) {
            this.context.beginPath();
            this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = ball.color;
            this.context.fill();
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        };
        CanvasManager.prototype.drawPlatform = function (platform) {
            this.context.fillStyle = platform.color;
            this.context.beginPath();
            this.context.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.context.closePath();
        };
        CanvasManager.prototype.drawBlock = function (block, add) {
            if (add === void 0) { add = false; }
            this.context.fillStyle = block.color;
            this.context.beginPath();
            this.context.fillRect(block.x1, block.y1, block.x2, block.y2);
            this.context.closePath();
            if (add) {
                this.blocks.push(block);
            }
        };
        CanvasManager.prototype.drawBlocks = function () {
            for (var key in this.blocks) {
                this.drawBlock(this.blocks[key]);
            }
        };
        CanvasManager.prototype.touchBlock = function (ball) {
            if (this.blocks.length < 1)
                return false;
            for (var key in this.blocks) {
                var block = this.blocks[key];
                var top = Math.floor(Math.abs(ball.y - ball.radius - block.y2));
                var onTop = top >= 0 && top <= 2;
                var overTop = (ball.y - ball.radius) <= block.y2;
                var overRight = (ball.x - ball.radius) <= block.x2 + block.x1;
                var overLeft = (ball.x + ball.radius) >= block.x1;
                if (onTop && overRight && overLeft) {
                    ball.jumpY();
                    this.pushBlock(key);
                    return true;
                }
                else if (!onTop && overTop && overRight && overLeft) {
                    ball.jumpX();
                    this.pushBlock(key);
                    return true;
                }
            }
            return false;
        };
        CanvasManager.prototype.pushBlock = function (key) {
            var block = this.blocks[key];
            if (block.alive()) {
                this.blocks[key].push();
            }
            else {
                this.blocks.splice(key, 1);
            }
        };
        return CanvasManager;
    })();
    Core.CanvasManager = CanvasManager;
})(Core || (Core = {}));
//# sourceMappingURL=CanvasManager.js.map