'use strict'

let Ghost = function(st) {
    dna.Mob.call(this, st)

    this.w = 1
    this.h = 1

    this.tiles = res.ghost
    this.startTilex = 0
    this.endTilex = 4
    this.framerate = 6
    this.speed = 0.3
};

sys.extend(Ghost, dna.Mob)

module.exports = Ghost 
