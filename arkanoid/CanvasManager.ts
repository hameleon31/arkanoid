module Core {
    export class CanvasManager {
        private canvas;
        private context;
        constructor(canvasId: string) {
            this.canvas = document.getElementById(canvasId);
            this.context = this.canvas.getContext("2d");
        }

        public width(): number {
            return this.canvas.width;
        }

        public height(): number {
            return this.canvas.height;
        }

        public getCanvas() {
            return this.canvas;
        }

        public getContext() {
            return this.context;
        }

        public clear(): void {
            this.context.clearRect(0, 0, this.width(), this.height());
        }

        public drawBall(ball: Ball): void {
            this.context.beginPath();
            this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
            this.context.fillStyle = ball.color;
            this.context.fill();
            //context.lineWidth = 5;
            //context.strokeStyle = 'blue';
            //context.stroke();
        }

        public drawPlatform(platform: Platform): void {
            this.context.fillStyle = platform.color;
            this.context.beginPath();
            this.context.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.context.closePath();
        }

    }
}

  