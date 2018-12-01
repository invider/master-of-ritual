'use strict'

let Mob = function(st) {
    dna.Character.call(this, st);
    this.speed = 0.5;
    this.damage = 3;
};

sys.extend(Mob, dna.Character);

Mob.prototype.calcDiff = function(diff){
    if (diff < 0) {
        return -1;
    } else if (diff > 0){
        return 1;
    }
    return 0;
};

Mob.prototype.evo = function(dt){
    dna.Character.prototype.evo.call(this, dt);
    let master = lab.camera.master;
    if (master) {
        this.x += this.calcDiff(master.x - this.x) * this.speed * dt;
        this.y += this.calcDiff(master.y - this.y) * this.speed * dt;
    }
};

module.exports = Mob;
