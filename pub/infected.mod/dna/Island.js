
let INFECTION_DEEP = 32

/**
 * @param params
 * @constructor
 */
var Island = function(params){
    this.params = params;
    this.map = [];
    this.plant = [];
    this.slime = [];

    this.landTileSize = 32;
    for (let x = 0; x < this.params.islandWidth; x++){
        for (let y = 0; y < this.params.islandHeight; y++){
            this.map.push(new dna.Land())
        }
    }

    for (let i = 0; i < 15; i++) {
        this.dropSpore(lib.math.rndi(dna.Spore.TYPES))
    }
};

Island.prototype.findFreePlaceOnRadius = function(x, y, r) {
    var fromX = Math.max(x - r, 0);
    var fromY = Math.max(y - r, 0);
    var toX = Math.min(x + r, this.params.islandWidth - 1);
    var toY = Math.min(y + r, this.params.islandHeight - 1);
    let res = []
    for (var i = fromX; i< toX; i++){
        for (var j = fromY; j< toY; j++){

            if (lib.math.distance(x,y,i,j) <=r && !this.isOccupied(x, y)){
                res.push({x:i, y:j});
            }
        }
    }
    return res;
};

Island.prototype.dropSporeInRadius = function(type, x, y, r) {
    let places = this.findFreePlaceOnRadius(x, y, r);
    if (places.length == 0){
        return;
    }
    let place = lib.arrayTools.randomElement(places);
    this.plant[this.landIndex(place)] = new dna.Spore(type, this, this.landIndex(x, y));
}

Island.prototype.dropSpore = function(type, x, y) {
    let place
    if (x == undefined){
        place = lib.math.rndi(this.params.islandWidth * this.params.islandHeight);
    } else {
        place = this.landIndex(x, y)
    }
    this.plant[place] = new dna.Spore(type, this, place)
}

Island.prototype.dropTree = function(cons) {
    let index = lib.math.rndi(this.params.islandWidth * this.params.islandHeight)
    this.plant[index] = new cons({
        island: this,
        index: index,
    })
}

Island.prototype.plantTree = function(x, y, cons, team) {
    let index = this.landIndex(x, y)
    this.plant[index] = new cons({
        island: this,
        index: index,
        team:  team,
        x: x,
        y: y,
    })
    this.plant[index].planted();
    return this.plant[index]
};

Island.prototype.putSlime  = function(x, y, team) {
    this.slime[this.landIndex(x, y)] = new dna.Slime({
        team: team,
    })
}

Island.prototype.infectLand = function(x, y, team) {
    let slime = this.slime[this.landIndex(x, y)]
    if (slime && slime.team === team) return false
    this.putSlime(x, y, team)
    return true
}

Island.prototype.infectAttempt = function(x, y, team, t) {
    if (t > INFECTION_DEEP) return false
    let sx = x + lib.math.rndi(3)-1
    let sy = y + lib.math.rndi(3)-1
    if (!this.inland(sx, sy)) {
        return this.infectAttempt(x, y, team, t+1)
    }
    if (this.infectLand(sx, sy, team)) return true;
    else return this.infectAttempt(sx, sy, team, t+1);
}

Island.prototype.infect = function(x, y, team) {
    this.infectAttempt(x, y, team, 1)
}

Island.prototype.removeSlime = function(x, y) {
    this.slime[this.landIndex(x, y)] = false
}

Island.prototype.removePlant = function(index) {
    this.plant[index] = false
};

Island.prototype.touch = function(x, y, subject) {
    let plant = this.plant[this.landIndex(x, y)]
    if (plant && plant.touch) {
        plant.touch(subject)
        return true
    }
    return false
};

Island.prototype.evo = function(delta){
};

Island.prototype.turn = function() {
    this.plant.forEach(p => {
        if (p && p.turn) p.turn()
    })
};

Island.prototype.inland = function(x, y) {
    if (y === undefined) {
        return x >= 0 && x < this.params.islandWidth * this.params.islandHeight;
    }
    return x >= 0 && x <= this.params.islandWidth && y >= 0 && y < this.params.islandHeight
}

Island.prototype.landIndex = function(x, y){
    if (y === undefined){
        y = x.y;
        x = x.x;
    }
    return y * this.params.islandWidth + x
};

Island.prototype.getScreenSize = function(x, y){
    x = (x === undefined ? this.params.islandWidth: x);
    y = (y === undefined ? this.params.islandHeight: y);
    return {x: this.landTileSize * x, y: this.landTileSize * y}
};

Island.prototype.isWalkable = function(x, y){
    let walkable = 0 <= x && x < this.params.islandWidth && 0 <= y && y < this.params.islandHeight
    if (walkable) {
        let plant = this.plant[this.landIndex(x, y)]
        if (plant && plant.solid) return false
    }
    return walkable
};

Island.prototype.isOccupied = function(x, y){
    let occupied = 0 <= x && x < this.params.islandWidth && 0 <= y && y < this.params.islandHeight;
    if (occupied) {
        let plant = this.plant[this.landIndex(x, y)];
        if (plant) return false;
    }
    return occupied;
};

Island.prototype.isTargetable = function(x, y){
    return 0 <= x && x < this.params.islandWidth && 0 <= y && y < this.params.islandHeight
};

Island.prototype.drawTile = function(x, y, e) {
    ctx.save();

    ctx.translate(x * this.landTileSize, y * this.landTileSize );
    ctx.scale(this.landTileSize, this.landTileSize);
    e.draw();

    ctx.restore();
};

Island.prototype.drawSquare = function(x, y){
    let index = this.landIndex(x, y);

    // draw land, slime and plants
    this.drawTile(x, y, this.map[index])
    if (this.slime[index]) this.drawTile(x, y, this.slime[index])
    if (this.plant[index]) this.drawTile(x, y, this.plant[index])
};

Island.prototype.adjustCoordinates = function(x, y){
    if (x >= this.params.islandWidth){
        x = this.params.islandWidth - 1;
    }
    if (x < 0){
        x = 0;
    }
    if (y >= this.params.islandHeight){
        y = this.params.islandHeight - 1;
    }
    if (y < 0){
        y = 0;
    }
    return {
        x:x,
        y:y
    }
};

Island.prototype.harvest = function(x, y, player) {
    let ix = this.landIndex(x, y)
    let plant = this.plant[ix]
    if (plant && plant.harvestable) {
        player.addSpore(plant.type)
        this.plant[ix] = false
    }
}

Island.prototype.draw = function(){
    ctx.save()

    // draw land/slime/plants
    for (let x = 0; x < this.params.islandWidth; x++){
        for (let y = 0; y < this.params.islandHeight; y++){
            this.drawSquare(x, y);
        }
    }
    
    // draw artifacts

    // draw players
    let island = this
    lab.game.team.forEach(function (t) {
        if (t.player.islandId === island.id) {
            island.drawTile(t.player.x, t.player.y, t.player)
        }
    })

    ctx.restore()
};

module.exports = Island;
