let Character = function(st) {
    this.alive = true
    this.x = ctx.width/2
    this.y = ctx.height/2
    this.dx = 0
    this.dy = 0
    this.tilex = false
    this.startTilex = 0 // tilex is an index from tilemap
    this.endTilex = 0
    this.tilexTime = 0
    this.framerate = 1

    sys.augment(this, st)

}

Character.prototype.move = function(dt) {
    this.x += this.dx * dt
    this.y += this.dy * dt
}

Character.prototype.nextFrame = function(dt) {
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
}

Character.prototype.evo = function(dt) {
    this.move(dt)
    this.nextFrame(dt)
}

Character.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x-this.w/2, this.y-this.h/2)

    if (this.img) {
        ctx.drawImage(this.img, 0, 0, this.w, this.h)
    } else if (this.tiles) {
        if (sys.isArray(this.tiles)) {
            ctx.drawImage(this.tiles[this.tilex],
                0, 0, this.w, this.h)
        } else {
            this.tiles.draw(this.tilex, 0, 0, this.w, this.h)
        }
    }
    // debug - draw border frame
    //ctx.strokeStyle = '#00ff00'
    //ctx.strokeRect(0, 0, this.w, this.h)
    ctx.restore()
}

module.exports = Character
