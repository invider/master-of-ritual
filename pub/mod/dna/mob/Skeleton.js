'use strict'

let Ghost = function(st) {
    dna.Mob.call(this, st)
    this.Z = 30

    this.w = 1
    this.h = 1
    this.aw = 0.4
    this.ah = 0.8

    this.tiles = res.skeleton
    this.startTilex = 0
    this.endTilex = 1
    this.framerate = 6
    this.speed = 0.1
    this.spawnOnDie = "bone"
};

sys.extend(Ghost, dna.Mob)

module.exports = Ghost 
