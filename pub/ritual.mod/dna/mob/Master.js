'use strict'

// @depends(dna/Character)

let Master = function(st) {
    dna.Character.call(this, st)

    this.w = 1;
    this.h = 1;
    this.speed = 1;

    this.keys = {
        up:false,
        right:false,
        down:false,
        left:false
    };

    this.tiles = res.master;
    this.startTilex = 0;
    this.endTilex = 4;
    this.framerate = 5;
};

sys.extend(Master, dna.Character);

Master.prototype.fixCamera = function() {
    lab.camera.x = this.x
    lab.camera.y = this.y
}

Master.prototype.hit = function(source) {
    //lib.sfx(res.sfx.hit, 0.7)
}

Master.prototype.evo = function(dt){
    dna.Character.prototype.evo.call(this, dt);


    if (this.keys.left){
        this.x -= dt * this.speed;
    }
    if (this.keys.right){
        this.x += dt * this.speed;
    }
    if (this.keys.down){
        this.y += dt * this.speed;
    }
    if (this.keys.up){
        this.y -= dt * this.speed;
    }
    this.fixCamera()

};

module.exports = Master;
