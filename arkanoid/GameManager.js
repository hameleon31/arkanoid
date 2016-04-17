var Core;
(function (Core) {
    var GameManager = (function () {
        function GameManager() {
            this.over = false;
            this.toLeft = true;
            this.toRight = true;
            this.score = -1;
            this.id = 0;
            this.delay = true;
        }
        GameManager.prototype.gameOver = function () {
            this.score = 0;
            this.scoreText.html("0");
            this.speedText.html("0.00");
            this.over = true;
        };
        GameManager.prototype.loadDOM = function () {
            this.scoreText = jQuery('#score > h2 > span');
            this.speedText = jQuery('#speed > h2 > span');
        };
        GameManager.prototype.stop = function () {
            clearInterval(this.id);
        };
        return GameManager;
    })();
    Core.GameManager = GameManager;
})(Core || (Core = {}));
//# sourceMappingURL=GameManager.js.map