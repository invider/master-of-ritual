//  @depends(dna/Character)
let Altar = function(dat) {
    dna.Character.call(this, dat);
    this.active = true;
    this.collidable = true;

    this.tiles = res.altar;
    this.startTilex = 0;
    this.endTilex = 6;
    this.framerate = 6;
};
sys.extend(Altar, dna.Character);

Altar.prototype.hit = function(char) {
    if (this.active && dna.mob.Master && char instanceof dna.mob.Master){
        lab.game.nextLevel();
    }
};

Altar.prototype.evo = function(dt){
    if (this.active){
        this.tiles = res.altar_active;
    } else {
        this.tiles = res.altar;
    }
    dna.Character.prototype.evo.call(this, dt);
};

module.exports = Altar;
