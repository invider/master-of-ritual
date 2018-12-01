// declare a dot actor
var Game = function(init){
    //  copyying parameters from init to this
    sys.augment(this, init);

    this.dt = 0;
    this.islandMap = [];
    this.islands = env.tuning.islands;
    for (let i = 0; i < this.islands; i++){
        this.generateIsland()
    }

    this.turn = 1
    this.team = []
};
/**
 *
 * @param index
 * @returns {Island}
 */
Game.prototype.getIslandByIndex = function(index){
    lib.asserts.assertTrue(this.islandMap[index], `No island with index: ${index}`);
    return this.islandMap[index];
};

Game.prototype.getCurrentIsland = function() {
    return this.getIslandByIndex(lab.myIsland.currentIsland)
}

Game.prototype.spacePressed = function(){
    if (!lab.game.focus.player.shopping) {
        lib.sfx(res.sfx.list, 0.7)
    } else {
        lib.sfx(res.sfx.close, 0.7)
    }
    lab.game.focus.player.shopping = !lab.game.focus.player.shopping;
};

Game.prototype.enterPressed = function(){
    if (lab.game.focus.player.shopping){
        lab.priceList.buy();
    } else if (lab.game.focus.player.targeting){
        lab.game.focus.player.targeting = false;
        var island = this.getIslandByIndex(lab.targetIsland.currentIsland);
        lab.game.focus.player.targetListener.targeted(island, lab.targetIsland.target);
    } else {
        this.endTurn();
    }
};


Game.prototype.getIslandsMaxSizes = function(){
    let res = {
        x: 0,
        y: 0
    };
    this.islandMap.forEach(o => {
        let size = o.getScreenSize();
        res.x = Math.max(res.x, size.x);
        res.y = Math.max(res.y, size.y);
    })
    return res;
};


Game.prototype.spawn = function() {

    let team = 0
    let island = 0
    this.teams = env.tuning.players

    // spawn human players
    let humans = this.teams - env.tuning.computers
    for (let i = 0; i < humans; i++) {
        sys.spawn('Team', {
            id: team++,
            name: 'Player ' + (i+1),
            computer: false,
            startIsland: island++,
        }, this.team)
    }

    // spawn computers
    for (let i = 0; i < env.tuning.computers; i++) {
        sys.spawn('Team', {
            id: team++,
            name: 'Computer ' + (i+1),
            computer: true,
            startIsland: island++,
        }, this.team)
    }

    this.focus = this.team[0]
    this.control = this.team[0]
};

Game.prototype.genIslandParams = function(){
    for (let i = 0; i < 10000; i++){

        const params = lib.arrayTools.randomElement(res.islands);
        if (this.islandMap.find(o => o.params === params) === undefined){
            return params;
        }
    }
    throw new Exception("Error, cannot find params");
};

Game.prototype.generateIsland = function () {
    let params = this.genIslandParams()
    let island = new dna.Island(params);
    island.params = params;
    console.log("Generating island..");
    island.id = this.islandMap.length
    this.islandMap.push(island);
};

Game.prototype.move = function(dir) {
    if (this.focus) {
        if (this.focus.player.targeting){
            lab.targetIsland.moveTarget(dir);
        } else if (this.focus.player.shopping) {
            lab.priceList.move(dir);
        } else {
            this.focus.player.move(dir)
        }
    }
};

Game.prototype.showPlayerTurn = function() {
	sys.spawn('text/fadeText', {
		font: '32px zekton',
		fillStyle: env.tuning.team[this.control.id].color,
		x: ctx.width * 0.7,
		y: ctx.height * 0.5 - 40,
		align: 'center',
		text: env.tuning.team[this.control.id].name + ' Player Turn',
		dx: -200,
		dy: 0,
		ttl: 3,
		tti: 1,
		ttf: 1,
	})
}

Game.prototype.showNextTurn = function() {
	sys.spawn('text/fadeText', {
		font: '32px zekton',
		fillStyle: env.tuning.turnLabelColor,
		x: ctx.width * 0.8,
		y: ctx.height * 0.5,
		align: 'center',
		text: 'Turn ' + this.turn,
		dx: 0,
		dy: -100,
		ttl: 3,
		tti: 1,
		ttf: 1,
	})
}

Game.prototype.switchCurrentIsland = function(targetId) {
    let curId = lab.myIsland.currentIsland
    lab.myIsland.currentIsland = targetId
    lab.targetIsland.currentIsland = curId
}

Game.prototype.nextTurn = function() {
    this.turn++
    this.showNextTurn()

    // notify
    this.islandMap.forEach(isl => isl.turn())
}

Game.prototype.nextPlayerTurn = function() {
    lab.banner.hide()
    this.showPlayerTurn()
    this.wait = false
}

Game.prototype.endTurn = function() {
    let nextPlayer = this.control.id + 1
    if (nextPlayer >= this.teams) {
        nextPlayer = 0
        this.nextTurn()
    }
    this.focus = this.team[nextPlayer]
    this.control = this.team[nextPlayer]
	this.control.player.startTurn()
    lab.myIsland.focus()
    lab.targetIsland.refocus()
    this.wait = true
    lab.banner.show()
}

module.exports = Game;
