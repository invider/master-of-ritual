'use strict'

let Zombie = function(st) {
    dna.Mob.call(this, st);
    this.Z = 30

    this.w = 1;
    this.h = 1;
    this.aw = 0.4
    this.ah = 0.85

    this.tiles = res.zombie;
    this.startTilex = 0;
    this.endTilex = 1;
    this.framerate = 6;
    this.speed = 0.2;
    this.spawnOnDie = "eye"
}

sys.extend(Zombie, dna.Mob);

module.exports = Zombie;
