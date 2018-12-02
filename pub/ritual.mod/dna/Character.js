let Character = function(st) {
    this.Z = 30
    this.alive = true
    this.solid = true // indicates, that we can't pass through the walls
    this.collidable = true // indicates if we can hit other mobs
    this.x = ctx.width/2
    this.y = ctx.height/2
    this.w = 1
    this.h = 1
    this.aw = 1
    this.ah = 1
    this.dx = 0
    this.dy = 0
    this.tilex = false
    this.startTilex = 0 // tilex is an index from tilemap
    this.endTilex = 0
    this.tilexTime = 0
    this.framerate = 1

    sys.augment(this, st)
}

Character.prototype.tryToMove = function(dx, dy) {
    // calculate expected move coordinates
    if (dx === 0 && dy === 0) return 

    let nx = this.x + dx
    let ny = this.y + dy

    // if not solid, otherwise not hitting the wall - make the actual move
    if (!this.solid || !lab.collider.testWall(this, nx, this.y)) {
        this.x = nx
    }
    if (!this.solid || !lab.collider.testWall(this, this.x, ny)) {
        this.y = ny
    }
}

Character.prototype.move = function(dt) {
    this.tryToMove(this.dx*dt, this.dy*dt)
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
};
Character.prototype.evo = function(dt) {
    this.move(dt)
    this.nextFrame(dt)
};

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

    if (env.debug) {
        // debug - draw border and active frames
        ctx.lineWidth = 0.01
        ctx.strokeStyle = '#00ff00'
        ctx.strokeRect(0, 0, this.w, this.h)
        ctx.strokeStyle = '#ff0000'
        ctx.strokeRect((this.w-this.aw)/2, (this.h-this.ah)/2, this.aw, this.ah)
    }

    ctx.restore()
}

module.exports = Character
