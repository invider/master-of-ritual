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
    this.framerate = 4;
};

sys.extend(Master, dna.CharacterMob);

Master.prototype.evo = function(dt){
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
