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

sys.extend(Master, dna.CharacterMob);

Master.prototype.fixCamera = function() {
    lab.camera.x = this.x
    lab.camera.y = this.y
}

Master.prototype.evo = function(dt){
    this.__superProto__.evo.call(this, dt)

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
