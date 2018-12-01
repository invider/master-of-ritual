let PortalNextLvl = function(dat) {
    sys.augment(this, dat)
    this.active = true;
};

PortalNextLvl.prototype.evo = function(dt) {

};

PortalNextLvl.prototype.hit = function(char) {
      debugger;
    if (this.active && char instanceof dna.Master){
        lab.game.nextLevel();
    }
};


PortalNextLvl.prototype.draw = function() {
    if (this.active) {
        res.tileset.draw(15, this.x, this.y, 1, 1);
    }
};

module.exports = PortalNextLvl;
