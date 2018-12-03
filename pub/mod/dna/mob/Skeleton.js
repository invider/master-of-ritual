'use strict'

let Ghost = function(st) {
    dna.Mob.call(this, st)

    this.w = 1
    this.h = 1
    this.aw = 0.4
    this.ah = 0.8

    this.tiles = res.skeleton
    this.startTilex = 0
    this.endTilex = 1
    this.framerate = 6
    this.spawnOnDie = "bone"

    sys.augment(this, env.tuning.skeleton)
    sys.augment(this, st)
};

sys.extend(Ghost, dna.Mob)

module.exports = Ghost 
