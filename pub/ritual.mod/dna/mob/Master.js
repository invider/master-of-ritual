'use strict'

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
    //let limit = ctx.height/4
    //let mx = lab.camera.getScreenX(this.x)
    //let my = lab.camera.getScreenY(this.y)

    lab.camera.target = this
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
