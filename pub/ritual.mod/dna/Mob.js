'use strict'

let Mob = function(st) {
    dna.Character.call(this, st);
    this.speed = 0.5;
    this.damage = 3;
    this.lastX = 0;
    this.lastY = 0;
    this.distanceThreshold = 3;
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

Mob.prototype.hit = function(el, dt){
    /*
    if (el instanceof dna.levelWall){
        this.x = this.lastX;
        this.y = this.lastY;
    }
    */
};

Mob.prototype.evo = function(dt){
    dna.Character.prototype.evo.call(this, dt);
    //this.lastX = this.x;
    //this.lastY = this.y;
    let master = lab.camera.master;
    if (master && lib.objUtil.distance(this, master) <= this.distanceThreshold) {
        // try to move towards master
        this.tryToMove(
            this.calcDiff(master.x - this.x) * this.speed * dt,
            this.calcDiff(master.y - this.y) * this.speed * dt)

    }

};

module.exports = Mob;
