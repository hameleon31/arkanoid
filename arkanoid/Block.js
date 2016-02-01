var Core;
(function (Core) {
    var Block = (function () {
        function Block(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.lives = 3;
            this.colors = ['#595b7d', '#3036a6', '#171fbf', '#0611d0'];
            this.color = this.colors[this.lives];
        }
        Block.prototype.push = function () {
            if (this.alive()) {
                this.lives--;
                this.color = this.colors[this.lives];
            }
        };
        Block.prototype.alive = function () {
            return this.lives > 0;
        };
        return Block;
    })();
    Core.Block = Block;
})(Core || (Core = {}));
//# sourceMappingURL=Block.js.map