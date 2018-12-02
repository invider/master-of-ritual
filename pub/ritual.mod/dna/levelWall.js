let LevelWall = function(dat) {
    this.Z = 20
    this.aw = 1
    this.ah = 1

    sys.augment(this, dat)
};

LevelWall.prototype.evo = function(dt) {
};

LevelWall.prototype.draw = function() {
    res.tileset.draw(11, this.x-0.5, this.y-0.5, 1, 1);
};

module.exports = LevelWall;
