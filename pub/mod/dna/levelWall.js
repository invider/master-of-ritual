// @depends(dna/Sprite)
let LevelWall = function(st) {
    dna.Sprite.call(this, st);
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

// LevelWall.prototype.draw = function() {
//
//     res.wall.draw(0, this.x-0.5, this.y-0.5, 1, 1);
//     //
//     // if (env.debug) {
//     //     if (this.status) {
//     //         ctx.fillStyle = '#FF0000'
//     //         ctx.font = '0.1px kenney-rocket-square'
//     //         ctx.textAlign = 'center'
//     //         ctx.textBaseline = 'bottom'
//     //
//     //         ctx.fillText(this.status, this.x, this.y)
//     //     }
//     // }
// };

module.exports = LevelWall;
