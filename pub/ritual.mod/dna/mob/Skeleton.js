'use strict'

let Ghost = function(st) {
    dna.Mob.call(this, st)

    this.w = 1
    this.h = 1

    this.tiles = res.skeleton
    this.startTilex = 0
    this.endTilex = 1
    this.framerate = 6
    this.speed = 0.1
};

sys.extend(Ghost, dna.Mob)

module.exports = Ghost 
