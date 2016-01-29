module Core {
    export class Ball {
        public x: number;
        public y: number;
        public vx: number;
        public vy: number;
        public radius: number;
        public color: string;
        public colors: string[];

        constructor(x: number, y: number, speed: number = 2, color: string = 'blue') {
            this.x = x;
            this.y = y;
            this.vx = speed;
            this.vy = speed;
            this.radius = 15;
            this.color = color;
            this.colors = ["blue", "yellow", "black", "green", "maroon"];
        }

        public changeColor(): void{
            var rand = Math.floor((Math.random() * this.colors.length) + 1);
            this.color = this.colors[rand - 1];
        }

        public touchWall(w: number): boolean {
            return (this.x + this.radius + this.vx) > w || (this.x - this.radius + this.vx) < 0;
        }

        public touchCeil(): boolean {
            return (this.y - this.radius + this.vy) < 0;
        }

        public touchFloor(h: number, platform: Platform): boolean {
            var flag: boolean = (this.y + this.radius + this.vy) >= (h - platform.height - 10) &&
                (this.y + this.radius + this.vy) < h;
            return flag;
        }

        public touchPlatform(h: number, platform: Platform): boolean {
            var flag: boolean = (this.x + this.radius) > platform.x &&
                (this.x + this.radius) <= (platform.x + platform.width)
            return flag;
        }

        public move(): void {
            this.x += this.vx;
            this.y += this.vy;
        }

        public jumpX(): void { this.vx *= -1; }

        public jumpY(): void { this.vy *= -1; }

        public accelerate() {
            ball.vx *= 1.1;
            ball.vy *= 1.1;
        }
    }
}

 