const FLIP_TIME = 0.75

let Character = function(st) {
    this.hp = 100;
    this.mana = 0;
    this.Z = 30
    this.alive = true
    this.solid = true // indicates, that we can't pass through the walls
    this.collidable = true // indicates if we can hit other mobs
    this.x = ctx.width/2
    this.y = ctx.height/2
    this.w = 1
    this.h = 1
    this.damage = 3;
    this.aw = 1
    this.ah = 1
    this.dx = 0
    this.dy = 0
    this.lastDx = 0
    this.lastDxT = 0

    this.tilex = false
    this.startTilex = 0 // tilex is an index from tilemap
    this.endTilex = 0
    this.tilexTime = 0
    this.framerate = 1
    this.hoodWidth = 1;
    this.hoodHeight = 0.02;
    this.hpHoodY = 0.03;
    this.hoodsX = 0;
    this.manaHoodY = 0.07;
    this.showHoods = false;
    sys.augment(this, st)
}

Character.prototype.hint = function(msg, color, st) {
    let opt = {
        text: msg,
        fillStyle: color,
        x: lab.camera.screenX(this.x),
        y: lab.camera.screenY(this.y - this.h/2),
        font: '16px kenney-rocket-square',
        align: 'center',
        ttl: 2.5,
        tti: 0.3,
        ttf: 1,
        dx: +20,
        dy: -50,
    }
    if (st) sys.augment(opt, st)

    sys.spawn('text/fadeText', opt)
}

Character.prototype.applyDamage = function(damage){
    this.hp -= damage;
    this.hint('-' + damage, '#ff0000', {
        dx: lib.math.rndi(30)-15,
        dy: -30 - damage/2,
    })
    // TODO play sfx
};
Character.prototype.tryToMove = function(dx, dy) {
    // calculate expected move coordinates
    if (dx === 0 && dy === 0) return 

    let nx = this.x + dx
    let ny = this.y + dy

    // if not solid, otherwise not hitting the wall - make the actual move
    if (!this.solid || !lab.collider.testWall(this, nx, this.y)) {
        this.x = nx
        if (this.lastDxT < 0) {
            this.lastDx = dx
            this.lastDxT = FLIP_TIME
        }
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
Character.prototype.die = function(){
    this.__.detach(this);
};

Character.prototype.evo = function(dt) {
    if (this.hp < 0){
        this.hp = 0;
        this.die();
    }
    if (this.mana < 0){
        this.mana = 0;
    }
    this.lastDxT -= dt
    this.move(dt)
    this.nextFrame(dt)
};

Character.prototype.draw = function() {
    ctx.save()
    ctx.translate(this.x, this.y)
    //ctx.translate(this.x-this.w/2, this.y-this.h/2)

    // translate to center coordinates
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

    // translate to corner coordinates
    ctx.translate(-this.w/2, -this.h/2)

    if (env.debug) {
        // debug - draw border and active frames
        ctx.lineWidth = 0.01
        ctx.strokeStyle = '#00ff00'
        ctx.strokeRect(0, 0, this.w, this.h)
        ctx.strokeStyle = '#ff0000'
        ctx.strokeRect((this.w-this.aw)/2, (this.h-this.ah)/2, this.aw, this.ah)

        if (this.status) {
            ctx.fillStyle = '#80F000'
            ctx.font = '0.1px kenney-rocket-square'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'

            ctx.fillText(this.status, this.w/2, -0.05)
        }
    }
    if (this.name == "master"){
    }
    if(this.showHoods){
        ctx.fillStyle = "#F00";
        ctx.fillRect(this.hoodsX, this.hpHoodY, (this.hoodWidth / 100) * this.hp, this.hoodHeight);


        ctx.fillStyle = "#00F";
        ctx.fillRect(this.hoodsX, this.manaHoodY,  (this.hoodWidth / 100) * this.mana, this.hoodHeight);

    }

    ctx.restore()
}

module.exports = Character
