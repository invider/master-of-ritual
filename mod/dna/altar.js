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
Altar.prototype.getGoalsText = function(){
    let res = ["You need to sacrifice:"]
    for (let k in this.goals){
        let goal = this.goals[k];
        let name = goal.type;
        res.push(`${name} X${goal.count}`)
    }
    return res.join("\n");
};

Altar.prototype.hit = function(char) {
    if (dna.mob.Master && char instanceof dna.mob.Master){
        if (this.checkGoal()) {
            lab.game.nextLevel();
            lib.sfx(res.sfx.wawa1, 0.5)
        } else {
            if (!lab['goal-text']) {

                let goalsText = this.getGoalsText();

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
                    font: '24px ' + env.tuning.textFont,
                    color: '#60FF20',
                })
                lib.sfx(res.sfx.tada1, 0.7)
            }
        }
    }

};

Altar.prototype.checkGoal = function () {
    for (let k in this.goals){
        let goal = this.goals[k];
        if (lab.camera.master.countItems(goal.type) < goal.count){
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
