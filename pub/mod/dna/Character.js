'use strict'

const FLIP_TIME = 0.75

/**
 *
 * @param st
 * @extends dna.Sprite
 * @alias dna.Character
 */
// @depends(dna/Sprite)

let Character = function(st) {
    dna.Sprite.call(this, st);
    this.Z = 50
    this.alive = true
    this.solid = true // indicates, that we can't pass through the walls
    this.collidable = true // indicates if we can hit other mobs

    this.hp = 100;
    this.mana = 0;
    this.speed = 0.5;
    this.scan = 1;
    this.attack = 1;
    this.range = 1;
    this.cooldown = 1;
    this.bloodColor = '#ff2000';
    this.bloodRadius = 0.3;
    this.bloodIntensity = 300;

    this.dx = 0
    this.dy = 0
    this.lastDx = 0
    this.lastDxT = 0
    this.cooling = 1

    this.hoodWidth = 0.5;
    this.hoodHeight = 0.02;
    this.hpHoodY = 0.03;
    this.manaHoodY = 0.07;
    this.showHoods = false;

    sys.augment(this, st)
}
sys.extend(Character, dna.Sprite);

Character.prototype.init = function() {
    this.maxHp = this.hp
    this.maxMana = this.mana
}

Character.prototype.hint = function(msg, color, st) {
    if (st && st.name) {
        if (lab[st.name]) return
    }

    let opt = {
        text: msg,
        fillStyle: color,
        x: lab.camera.screenX(this.x),
        y: lab.camera.screenY(this.y - this.h/2),
        font: '24px ' + env.tuning.labelFont,
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

Character.prototype.bleed = function(damage, src) {

    // determine hit vector
    let v = lib.objUtil.vector(src, this)
    let angle = Math.atan2(v.y, v.x);
    
    // detarmine hit point
    let r = lib.math.rnd(this.bloodRadius)
    let fi = lib.math.rndfi()
    let dx = Math.cos(fi) * r
    let dy = Math.sin(fi) * r

    sys.spawn('Emitter', {
        Z: this.Z+2,
        x: this.x + dx,
        y: this.y + dy,
        color: this.bloodColor,
        lifespan: 0.12,
        force: this.bloodIntensity*damage,
        radius: 0.1,
        size: 0.02, vsize: 0.02,
        speed: 1, vspeed: 0.2,
        angle: angle-0.3, spread: 0.6,
        minLifespan: 0.1, vLifespan: 0.1,
    }, 'camera')
}

Character.prototype.applyDamage = function(damage, src){
    if (!this.god) this.hp -= damage;

    this.hint('-' + damage, this.bloodColor, {
        dx: lib.math.rndi(30)-15,
        dy: -30 - damage/2,
    })
    this.bleed(damage, src)
    lib.sfx(res.sfx.hit, 0.5)
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

Character.prototype.die = function(){
    if (this.deathSfx) lib.sfx(this.deathSfx, 1)
    this.__.detach(this);
};

Character.prototype.evo = function(dt) {
    dna.Sprite.prototype.evo.call(this, dt)

    if (this.hp < 0){
        this.hp = 0;
        this.die();
    }
    if (this.mana < 0){
        this.mana = 0;
    }
    this.cooling -= dt
    this.lastDxT -= dt
    this.move(dt)
};

Character.prototype.draw = function() {
    dna.Sprite.prototype.draw.call(this)

    if (env.debug) {
        // debug - draw border and active frames
        ctx.save()
        // translate to corner coordinates
        ctx.translate(this.x-this.w/2, this.y-this.h/2)

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
        ctx.restore()
    }

    if(this.showHoods){
        ctx.save()
        ctx.translate(this.x, this.y-this.h/2)

        let w = (this.hp/this.maxHp + 0.05)* this.hoodWidth
        ctx.fillStyle = "#F00";
        ctx.fillRect(-w/2, this.hpHoodY, w, this.hoodHeight);

        w = (this.mana/this.maxMana + 0.2) * this.hoodWidth
        ctx.fillStyle = "#00F";
        ctx.fillRect(-w/2, this.manaHoodY,  w, this.hoodHeight);
        ctx.restore()
    }
}

module.exports = Character
