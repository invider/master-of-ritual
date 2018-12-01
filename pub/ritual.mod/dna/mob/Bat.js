'use strict'

let Bat = function(st) {
    dna.Mob.call(this, st)

    this.w = 1
    this.h = 1

    this.tiles = res.bat
    this.startTilex = 0
    this.endTilex = 3
    this.framerate = 6
    this.speed = 0.6
};


sys.extend(Bat, dna.Mob)

module.exports = Bat 
