'use strict'

let Zombie = function(st) {
    dna.Character.call(this, st)

    this.w = 1
    this.h = 1

    this.tiles = res.sprite
    this.startTilex = 46
    this.endTilex = 60
    this.framerate = 6
}

sys.extend(Zombie, dna.Character)

module.exports = Zombie 
