let LevelWall = function(dat) {
    this.Z = 20
    this.w = 1
    this.h = 1
    this.aw = 1
    this.ah = 1
    this.status = 'wall'

    sys.augment(this, dat)
};

LevelWall.prototype.evo = function(dt) {
};

LevelWall.prototype.draw = function() {

    res.tileset.draw(11, this.x-0.5, this.y-0.5, 1, 1);

    if (env.debug) {
        // debug - draw border and active frames
        //ctx.lineWidth = 0.01
        //ctx.strokeStyle = '#ff0000'
        //ctx.strokeRect(this.x-this.w/2, this.y-this.h/2, this.w, this.h)

        if (this.status) {
            ctx.fillStyle = '#FF0000'
            ctx.font = '0.1px kenney-rocket-square'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'

            ctx.fillText(this.status, this.x, this.y)
        }
    }
};

module.exports = LevelWall;
