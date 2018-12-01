let PortalNextLvl = function(dat) {
    sys.augment(this, dat)
    this.active = true;
    this.collidable = true;
};

PortalNextLvl.prototype.evo = function(dt) {

};

PortalNextLvl.prototype.hit = function(char) {
    if (this.active && dna.mob.Master && char instanceof dna.mob.Master){
        debugger
        lab.game.nextLevel();
    }
};

PortalNextLvl.prototype.draw = function() {
    if (this.active) {
        res.tileset.draw(15, this.x, this.y, 1, 1);
    }
};

module.exports = PortalNextLvl;
