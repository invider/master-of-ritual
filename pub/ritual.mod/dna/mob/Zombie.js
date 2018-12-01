'use strict'

let Zombie = function(st) {
    dna.Mob.call(this, st);

    this.w = 1;
    this.h = 1;

    this.tiles = res.zombie;
    this.startTilex = 0;
    this.endTilex = 1;
    this.framerate = 6;
    this.speed = 0.2;
}

sys.extend(Zombie, dna.Mob);

module.exports = Zombie;
