'use strict'

let Zombie = function(st) {
    dna.Mob.call(this, st);

    this.w = 1;
    this.h = 1;
    this.aw = 0.4
    this.ah = 0.85

    this.tiles = res.zombie;
    this.startTilex = 0;
    this.endTilex = 1;
    this.framerate = 6;
    this.spawnOnDie = "eye"

    this.spotSfx = res.sfx.hey
    this.deathSfx = res.sfx.oo

    sys.augment(this, env.tuning.zombie)
    sys.augment(this, st)
}

sys.extend(Zombie, dna.Mob);

module.exports = Zombie;
