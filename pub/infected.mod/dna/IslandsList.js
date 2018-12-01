/**
 *
 * @param init
 * @constructor
 * @extends {Entity}
 */
var IslandsList = function(init){
    this.Z = 5
    this.fontSize = 30;
    this.scale = 0.3;
    this.islandsStep = 10;
    this.islandSize = 50;
    this.horizontal = false;
    //  copyying parameters from init to this
    sys.augment(this, init);
};

IslandsList.prototype.calcScale = function(){
    let maxSizes = lab.game.getIslandsMaxSizes();
    let max = Math.max(maxSizes.x, maxSizes.y);
    return this.islandSize / max;
};

IslandsList.prototype.drawSelector = function (x, y, color) {
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.strokeRect(x, y, this.islandSize, this.islandSize);
};

IslandsList.prototype.drawHighlighter = function (x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, this.islandSize, this.islandSize);
};

IslandsList.prototype.draw = function(){
    let currentX = 0;
    let currentY = 0;

    this.scale = this.calcScale();
    if (!this.horizontal) {
        currentX += (this.width - this.islandSize) / 2;
    } else {
        currentY += (this.height - this.islandSize) / 2;
    }
    ctx.strokeStyle = "#00aa00"
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    for (let i = 0; i < lab.game.islands; i++){
        var island = lab.game.getIslandByIndex(i);
        var islandSizes = island.getScreenSize();
        var offset = lib.geometry.getOffsetToCenterInner(this.islandSize, this.islandSize, islandSizes.x * this.scale, islandSizes.y * this.scale);

        if (i === lab.myIsland.currentIsland) {
            this.drawHighlighter(this.x + currentX, this.y + currentY, "#503070")
        } else if (i === lab.targetIsland.currentIsland) {
            this.drawHighlighter(this.x + currentX, this.y + currentY, "#303030")
        }

        ctx.save();
        ctx.translate(this.x + currentX + offset.x, this.y + currentY + offset.y);
        ctx.scale(this.scale, this.scale);
        island.draw();
        ctx.restore();

        if (i === lab.targetIsland.currentIsland){
            this.drawSelector(this.x + currentX, this.y + currentY, '#ff0000');
        } else if (i === lab.myIsland.currentIsland) {
            this.drawSelector(this.x + currentX, this.y + currentY, '#ffff00');
        }

        if (this.horizontal){
            currentX += this.islandsStep + this.islandSize;
        } else {
            currentY += this.islandsStep + this.islandSize;
        }
    }
};

module.exports = IslandsList;
