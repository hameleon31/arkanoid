module Core {
    export class CanvasManager {
        private canvas;
        private context;
        public blocks: Block[] = [];

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
            this.context.lineWidth = 1;
            this.context.strokeStyle = 'black';
            this.context.stroke();
        }

        public drawPlatform(platform: Platform): void {
            this.context.fillStyle = platform.color;
            this.context.beginPath();
            this.context.fillRect(platform.x, platform.y, platform.width, platform.height);
            this.context.closePath();
        }

        public drawBlock(block: Block, add: boolean = false): void {
            this.context.fillStyle = block.color;
            this.context.beginPath();
            this.context.fillRect(block.x1, block.y1, block.x2, block.y2);
            this.context.closePath();            
            if (add) {
                this.blocks.push(block);
            }
        }

        public drawBlocks(): void {            
            for (var key in this.blocks) {
                this.drawBlock(this.blocks[key]);
            }
        }

        public touchBlock(ball: Ball): boolean {
            if (this.blocks.length < 1) return false;
            for (var key in this.blocks) {
                var block: Block = this.blocks[key];
                var top: number = Math.floor(Math.abs(ball.y - ball.radius - block.y2));
                var onTop: boolean = top >= 0 && top <=2; 
                var overTop: boolean = (ball.y - ball.radius) <= block.y2;
                var overRight: boolean = (ball.x - ball.radius) <= block.x2 + block.x1;    
                var overLeft: boolean = (ball.x + ball.radius) >= block.x1;

                if (onTop && overRight && overLeft) {
                    ball.jumpY();
                    this.pushBlock(key);
                    return true;
                } else if (!onTop && overTop && overRight && overLeft) {
                    ball.jumpX();
                    this.pushBlock(key);
                    return true;
                }
            }   
            return false;         
        }

        private pushBlock(key: number): void {
            var block: Block = this.blocks[key];
            if (block.alive()) {
                this.blocks[key].push();
            } else  {
                this.blocks.splice(key, 1);
            }
        }
    }
}

  