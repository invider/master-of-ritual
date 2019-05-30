// @depends(dna/Sprite)
/**
 * @alias dna.LevelWall
 * @param st
 * @constructor
 */
let LevelWall = function(st) {
    dna.Sprite.call(this, st);
    this.solid = true
    this.Z = 20
    this.w = 1
    this.h = 1
    this.aw = 1
    this.ah = 1
    this.status = Math.random() > 0.2? 'wall': "torch";

    if (this.status === "wall"){
        this.tiles = res.wall;
        this.startTilex = 0;
        this.endTilex = 0
    } else {
        this.tiles = res.torch;
        this.startTilex = 0;
        this.endTilex = 3
    }
    this.framerate = 4

};

sys.extend(LevelWall, dna.Sprite);

module.exports = LevelWall;
