module Core {
    export class Block {
        public x1: number;
        public y1: number;
        public x2: number;
        public y2: number;
        public color: string;
        public colors: string[];
        public lives: number;

        constructor(x1: number, y1: number, x2: number, y2: number) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.lives = 3;
            this.colors = ['#595b7d', '#3036a6', '#171fbf', '#0611d0'];
            this.color = this.colors[this.lives];
        }

        public push(): void {
            if (this.alive()) {
                this.lives--;
                this.color = this.colors[this.lives];
            }
        }

        public alive(): boolean {
            return this.lives > 0;
        }
    }
}

  