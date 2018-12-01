'use strict'

let Master = function(st) {
    dna.Character.call(this, st)

    this.w = 2
    this.h = 2

    this.tiles = res.sprite
    this.startTilex = 0
    this.endTilex = 7
    this.framerate = 9
}

sys.extend(Master, dna.Character)

module.exports = Master
