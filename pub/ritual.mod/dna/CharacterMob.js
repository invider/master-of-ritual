'use strict'

let CharacterMob = function(st) {
    dna.Character.call(this, st);
    this.speed = 0.5;
};

sys.extend(CharacterMob, dna.Character);

CharacterMob.prototype.calcDiff = function(diff){
    if (diff < 0) {
        return -1;
    } else if (diff > 0){
        return 1;
    }
    return 0;
};

CharacterMob.prototype.evo = function(dt){
    debugger;
    dna.Character.prototype.evo.call(this, dt);
    let master = lab.camera.master;
    this.x += this.calcDiff(master.x - this.x ) * this.speed * dt;
    this.y += this.calcDiff(master.y - this.y) * this.speed * dt;
};

module.exports = CharacterMob;
