let Altar = function(dat) {
    sys.augment(this, dat)
};

Altar.prototype.evo = function(dt) {
};

Altar.prototype.draw = function() {
    res.tileset.draw(12, this.x, this.y, 1, 1);
};

module.exports = Altar;
