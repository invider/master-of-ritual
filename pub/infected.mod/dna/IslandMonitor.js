// declare a dot actor
var IslandMonitor = function(init){
    this.dt = 0;
    this.fontSize = 24;
    this.currentIsland = 0;
    this.islandYOffset = 40
    //  copyying parameters from init to this
    sys.augment(this, init);
};


IslandMonitor.prototype.draw = function(){
    ctx.save();

    var island = lab.game.getIslandByIndex(this.currentIsland)
    /*
    ctx.beginPath();
    ctx.lineWidth = 1;
    //ctx.strokeStyle = '#00FF10';
    ctx.strokeStyle = '#ffffff';
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    */

    ctx.font = `${this.fontSize}px ${env.tuning.font}`;
    ctx.fillStyle = "#00c5ff"
    ctx.textAlign = 'left'
    ctx.textBaseline = 'bottom'
    ctx.fillText(`Island: ${island.params.name} (${island.params.islandWidth}X${island.params.islandHeight})`,this.x, this.y + this.fontSize);

    ctx.translate(this.x, this.y + this.islandYOffset);
    island.draw();

    ctx.restore();
};

module.exports = IslandMonitor;
