'use strict'

let Zombie = function(st) {
    dna.Character.call(this, st);

    this.w = 1;
    this.h = 1;

    this.tiles = res.zombie;
    this.startTilex = 0;
    this.endTilex = 0;
    this.framerate = 6;
}

sys.extend(Zombie, dna.CharacterMob);

module.exports = Zombie;
