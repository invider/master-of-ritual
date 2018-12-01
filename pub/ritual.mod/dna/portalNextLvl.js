let PortalNextLvl = function(dat) {
    sys.augment(this, dat)
    this.active = true;
    this.collidable = true;
};

PortalNextLvl.prototype.evo = function(dt) {

};

PortalNextLvl.prototype.hit = function(char) {
    if (this.active && dna.mob.Master && char instanceof dna.mob.Master){
        lab.game.nextLevel();
    }
};

PortalNextLvl.prototype.draw = function() {
    if (this.active) {
        res.tileset.draw(15, this.x-0.5, this.y-0.5, 1, 1);
    }
};

module.exports = PortalNextLvl;
