let LevelWall = function(dat) {
    sys.augment(this, dat)
};

LevelWall.prototype.evo = function(dt) {
};

LevelWall.prototype.draw = function() {
    res.tileset.draw(11, this.x, this.y, 1, 1);
};

module.exports = LevelWall;
