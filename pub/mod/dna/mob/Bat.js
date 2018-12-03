'use strict'

let Bat = function(st) {
    dna.Mob.call(this, st)

    this.w = 1
    this.h = 1
    this.aw = 0.8
    this.ah = 0.5

    this.tiles = res.bat
    this.startTilex = 0
    this.endTilex = 3
    this.framerate = 6
    this.spawnOnDie = "wing"

    sys.augment(this, env.tuning.bat)
    sys.augment(this, st)
};


sys.extend(Bat, dna.Mob)

module.exports = Bat 
