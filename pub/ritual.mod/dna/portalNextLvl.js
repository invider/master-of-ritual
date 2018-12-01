let PortalNextLvl = function(dat) {
    sys.augment(this, dat)
    this.active = true;
};

PortalNextLvl.prototype.evo = function(dt) {

};

PortalNextLvl.prototype.hit = function(char) {
    if (dna.Master && this.active && char instanceof dna.Master){
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
