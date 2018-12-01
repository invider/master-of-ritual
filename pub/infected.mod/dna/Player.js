let Player = function(st) {
	this.SPEED = env.tuning.actionPoints;
    this.targeting = 0;
    this.targetListener = false;
    this.shopping = 0;
    this.spores = {

    };
    for (var k in dna.Spore.TYPE){
        this.spores[dna.Spore.TYPE[k]] = 10;
    }

    this.x = 0;
    this.y = 0;
    this.islandId = 0;
	this.actionPoints = this.SPEED;

    sys.augment(this, st);

    this.x += this.team;
    this.y += this.team;
    this.img = res[env.tuning.team[this.team].img]
}

Player.prototype.startTurn = function() {
	this.actionPoints = this.SPEED
};

Player.prototype.move = function(dir) {
    let tx = this.x
    let ty = this.y
    switch(dir) {
    case 1: tx--; break;
    case 2: ty--; break;
    case 3: tx++; break;
    case 4: ty++; break;
    }

    // check the posibility to move
    let island = lab.game.islandMap[this.islandId]
    let walkable = island.isWalkable(tx, ty)
    if (walkable) {
        this.x = tx
        this.y = ty
        lib.sfx(res.sfx.step, 0.5)

        // try to harvest
        island.harvest(tx, ty, this)

    } else {
        // try to touch
        let touched = island.touch(tx, ty, this)

        lib.sfx(res.sfx.hit, 0.5)
    }

    this.actionPoints--
    if (this.actionPoints <= 0) {
        lab.game.endTurn()
    }
}

Player.prototype.addSpore = function(type) {
    // TODO harvest sfx if on main or target screen
    this.spores[type]++
    lib.sfx(res.sfx.pickup, 0.5)
}

Player.prototype.slime = function() {
    let island = lab.game.islandMap[this.islandId]
    //island.putSlime(this.x, this.y, this.team)
    island.infect(this.x, this.y, this.team)
}

Player.prototype.evo = function(dt) {
}

Player.prototype.draw = function() {
    /** @type Island */
    let island = lab.game.islandMap[this.islandId];
    if (!island.isWalkable(this.x, this.y)){
        var coords = island.adjustCoordinates(this.x, this.y);
        this.x = coords.x;
        this.y = coords.y;
    }

    ctx.imageSmoothingEnabled = false
    ctx.drawImage(this.img, 0, 0, 1, 1)

    // color frame
    ctx.beginPath()
    ctx.strokeStyle = env.tuning.team[this.team].color
    ctx.lineWidth = 1/16
    ctx.rect(0, 0, 1, 1)
    ctx.stroke()
}

module.exports = Player

