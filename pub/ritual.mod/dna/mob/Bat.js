'use strict'

let Bat = function(st) {
    dna.Character.call(this, st)

    this.w = 1
    this.h = 1

    this.tiles = res.bat
    this.startTilex = 0
    this.endTilex = 0
    this.framerate = 6
};

sys.extend(Bat, dna.Character)

module.exports = Bat 
