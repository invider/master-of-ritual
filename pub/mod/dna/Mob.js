'use strict'

// @depends(dna/Character)

let Mob = function(st) {
    dna.Character.call(this, st);

    this.lastX = 0;
    this.lastY = 0;
    this.showHoods = true;
    this.spawnOnDie = "wing";

    sys.augment(this, st)
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

Mob.prototype.die = function(){
    dna.Character.prototype.die.call(this);
    if (this.spawnOnDie){
        let params = {
            x: this.x,
            y: this.y,
            w: 1,
            h: 1,
            itemType: this.spawnOnDie
        };
        sys.spawn("Item", params, "camera");
    }
};

Mob.prototype.evo = function(dt){
    dna.Character.prototype.evo.call(this, dt);

    let master = lab.camera.master;
    if (master) {
        let distanceToTarget = lib.objUtil.distance(this, master)

        if (distanceToTarget <= this.scan) {
            // try to move towards master
            this.tryToMove(
                this.calcDiff(master.x - this.x) * this.speed * dt,
                this.calcDiff(master.y - this.y) * this.speed * dt)
        }

        if (this.cooling < 0 && distanceToTarget <= this.range) {
            // attack
            master.applyDamage(this.attack, this)
            this.cooling = this.cooldown
        }

    }
};

module.exports = Mob;
