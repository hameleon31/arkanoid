module Core {
    export class Platform {
        public x: number;
        public y: number;
        public vx: number;
        public height: number;
        public width: number;
        public color: string;
        public colors: string[];

        constructor(x: number, y: number, speed: number = 3, color: string = 'blue') {
            this.x = x;
            this.y = y;
            this.vx = speed;
            this.width = 100;
            this.height = 5;
            this.color = color;
            this.colors = ["blue", "yellow", "black", "green", "maroon"];
            this.x -= this.width / 2; 
        }

        public changeColor() {
            var rand = Math.floor((Math.random() * this.colors.length) + 1);
            this.color = this.colors[rand - 1];
        }

        public moveLeft() {
            this.x -= this.vx;
        }

        public moveRight() {
            this.x += this.vx;
        }

        
    }
}

  