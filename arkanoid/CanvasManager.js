var Core;
(function (Core) {
    var CanvasManager = (function () {
        function CanvasManager(canvasId) {
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
        CanvasManager.prototype.drawBall = function (ball) {
            this.context.beginPath();
            this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = ball.color;
            this.context.fill();
            //context.lineWidth = 5;
            //context.strokeStyle = 'blue';
            //context.stroke();
        };
        CanvasManager.prototype.drawPlatform = function (platform) {
            this.context.fillStyle = platform.color;
            this.context.beginPath();
            this.context.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.context.closePath();
        };
        return CanvasManager;
    })();
    Core.CanvasManager = CanvasManager;
})(Core || (Core = {}));
//# sourceMappingURL=CanvasManager.js.map