let LevelWall = function(dat) {
    sys.augment(this, dat)
};

LevelWall.prototype.evo = function(dt) {
};

LevelWall.prototype.draw = function() {
    res.tileset.draw(11, this.x-0.5, this.y-0.5, 1, 1);
};

module.exports = LevelWall;
