'use strict'

let Ghost = function(st) {
    dna.Mob.call(this, st)

    this.w = 1
    this.h = 1
    this.aw = 0.48
    this.ah = 0.8
    this.solid = false

    this.tiles = res.ghost
    this.startTilex = 0
    this.endTilex = 4
    this.framerate = 6
    this.spawnOnDie = false

    sys.augment(this, env.tuning.ghost)
    sys.augment(this, st)
};

sys.extend(Ghost, dna.Mob)

module.exports = Ghost 
