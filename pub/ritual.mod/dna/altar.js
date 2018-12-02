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
    this.showHoods = false;
};
sys.extend(Altar, dna.Character);

Altar.prototype.hit = function(char) {
    if (dna.mob.Master && char instanceof dna.mob.Master){
        if (this.checkGoal()) {
            lab.game.nextLevel();
        } else {
            if (!lab['goal-text']) {

                let goalsText = 'check your goals, stupid!'

                // show the story
                sys.spawn('text/scroll', {
                    name: 'goal-text',
                    Z: 100,
                    rx: 50,
                    ry: 100,
                    period: 1.5,
                    time: 10,       // how long display each line
                    fadein: 2.5,
                    fadeout: 4,
                    speed: -20,
                    txt: goalsText,
                    align: 'center',
                    font: '14px kenney-rocket-square',
                    color: '#60FF20',
                })
            }
        }
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
