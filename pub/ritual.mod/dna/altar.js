//  @depends(dna/Character)
let Altar = function(dat) {
    dna.Character.call(this, dat);
    this.Z = 20;
    this.collidable = true;
    this.goals = [];
    this.tiles = res.altar;
    this.startTilex = 0;
    this.endTilex = 6;
    this.framerate = 6;
};
sys.extend(Altar, dna.Character);

Altar.prototype.hit = function(char) {
    if (this.checkGoal() && dna.mob.Master && char instanceof dna.mob.Master){
        lab.game.nextLevel();
    }
};

Altar.prototype.countMasterItems = function(type){
    let count = 0;
    for (let k in lab.camera.master.inventory){
        let item = lab.camera.master.inventory[k];
        if (item.name === type){
            count ++;
        }
    }
    return count;
};
Altar.prototype.checkGoal = function () {
    for (let k in this.goals){
        let goal = this.goals[k];
        if (this.countMasterItems(goal.type) < goal.count){
            return false;
        }
    }
    return true;
};
Altar.prototype.evo = function(dt){
    if (this.checkGoal()){
        this.tiles = res.altar_active;
    } else {
        this.tiles = res.altar;
    }
    dna.Character.prototype.evo.call(this, dt);
};

module.exports = Altar;
