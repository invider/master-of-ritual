var EnemyIslandMonitor = function(init){
    this.target = {
        x:0,
        y:0,
        type: 1
    };
    dna.IslandMonitor.call(this, init);
};
sys.extend(EnemyIslandMonitor, dna.IslandMonitor);

EnemyIslandMonitor.prototype.nextIsland = function() {
    this.currentIsland++;
    if (this.currentIsland >= lab.game.islands) {
        this.currentIsland = 0
    }
    if (this.currentIsland === lab.myIsland.currentIsland) {
        this.nextIsland()
    }
};

EnemyIslandMonitor.prototype.prevIsland = function() {
    this.currentIsland--;
    if (this.currentIsland < 0) {
        this.currentIsland = lab.game.islands - 1
    }
    if (this.currentIsland === lab.myIsland.currentIsland) {
        this.prevIsland()
    }
};

EnemyIslandMonitor.prototype.refocus = function() {
    // don't look at the same island as myIsland
    if (this.currentIsland === lab.myIsland.currentIsland) {
        this.nextIsland()
    }
};

EnemyIslandMonitor.prototype._showTarget = function(){
    let player = lab.game.control.player;
    if (player.targeting){
        return this.target;
    }
    return false;
};
EnemyIslandMonitor.prototype.getScreenCoords = function(x, y){
    var island = lab.game.getIslandByIndex(this.currentIsland);
    return island.getScreenSize(x, y);
};
EnemyIslandMonitor.prototype.moveTarget = function(direction){
    var oldX = this.target.x;
    var oldY = this.target.y;
    var island = lab.game.getIslandByIndex(this.currentIsland);
    switch(direction){
        case lib.consts.directions.UP:
            this.target.y --;
            break;
        case lib.consts.directions.DOWN:
            this.target.y ++;
            break;
        case lib.consts.directions.LEFT:
            this.target.x --;
            break;
        case lib.consts.directions.RIGHT:
            this.target.x ++;
            break;
    }
    if (!island.isTargetable(this.target.x, this.target.y)){
        this.target.x = oldX;
        this.target.y = oldY;
    }
};
EnemyIslandMonitor.prototype.draw = function() {
    this.__superProto__.draw.call(this);
    let target = this._showTarget();
    if (target){
        var island = lab.game.getIslandByIndex(this.currentIsland);
        var adjusted = island.adjustCoordinates(this.target.x, this.target.y);
        target.x = adjusted.x;
        target.y = adjusted.y;
        let coords = this.getScreenCoords(target.x, target.y);
        let size = this.getScreenCoords(1, 1);
        res.target.draw(target.type,
            coords.x + this.x,
            coords.y + this.y + this.islandYOffset,
            size.x,
            size.y);
    }

};

module.exports = EnemyIslandMonitor;
