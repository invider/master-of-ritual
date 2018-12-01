'use strict'

let Master = function(st) {
    dna.CharacterPlayer.call(this, st)

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
    this.endTilex = 2;
    this.framerate = 2;
};

sys.extend(Master, dna.CharacterPlayer);

Master.prototype.evo = function(dt){
    this.__superProto__.evo.call(this, dt)

    if (this.keys.left){
        debugger;
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


};

module.exports = Master;
