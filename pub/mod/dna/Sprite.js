'use strict'

let Sprite = function(st) {
    this.Z = 10

    this.x = ctx.width/2
    this.y = ctx.height/2
    this.w = 1
    this.h = 1
    this.aw = 1
    this.ah = 1

    this.tilex = false
    this.startTilex = 0 // tilex is an index from tilemap
    this.endTilex = 0
    this.tilexTime = 0
    this.framerate = 1

    sys.augment(this, st)
}

Sprite.prototype.nextFrame = function(dt) {
    if (!this.tilex) this.tilex = this.startTilex

    if (this.framerate > 0) {
        this.tilexTime += dt
        if (this.tilexTime > 1/this.framerate) {
            this.tilexTime -= 1/this.framerate
            this.tilex ++

            if (this.tilex > this.endTilex) {
                this.tilex = this.startTilex
            }
        }
    }
};

Sprite.prototype.draw = function() {

    ctx.save()
    // translate to center coordinates
    ctx.translate(this.x, this.y)

    if (this.img) {
        ctx.drawImage(this.img, 0, 0, this.w, this.h)
    } else if (this.tiles) {
        if (sys.isArray(this.tiles)) {
            ctx.drawImage(this.tiles[this.tilex],
                0, 0, this.w, this.h)
        } else {
            if (this.lastDx <= 0) {
                this.tiles.draw(this.tilex, -this.w/2, -this.h/2, this.w, this.h)
            } else {
                // flip
                ctx.save()
                var rad = 2 * Math.PI
                ctx.scale(-1, 1);
                this.tiles.draw(this.tilex, -this.w/2, -this.h/2, this.w, this.h)
                ctx.restore()
            }
        }
    }

    ctx.restore()
}

Sprite.prototype.evo = function(dt) {
    this.nextFrame(dt)
}

module.exports = Sprite
