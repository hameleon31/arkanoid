module Core {
    export class GameManager {

        public over: boolean;
        public toLeft: boolean;
        public toRight: boolean;
        public score: number;
        public id: number;
        public delay: boolean;

        public scoreText: JQuery;
        public speedText: JQuery;

        constructor() {
            this.over = false;
            this.toLeft = true;
            this.toRight = true;
            this.score = -1;
            this.id = 0;
            this.delay = true;            
        }      
        
        public gameOver(): void {
            this.score = 0;
            this.scoreText.html("0");
            this.speedText.html("0.00");
            this.over = true;
        }  

        public loadDOM(): void {
            this.scoreText = jQuery('#score > h2 > span');
            this.speedText = jQuery('#speed > h2 > span');
        }



    }
}

   