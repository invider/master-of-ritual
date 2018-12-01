// declare a dot actor
var Land = function(init){
    this.dt = 0;
    this.tilew = 32;
    this.infected = false;
    this.type = Land.types.TERRAIN
    //  copyying parameters from init to this
    sys.augment(this, init);
};

Land.prototype.evo = function(delta){

};

Land.prototype.draw = function(){
    //let ctx = this._.ctx;
    // draw dot
    // ctx.fillStyle="#FF0000";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    /*
    res.terrains.draw(this.type,
        0,
        0,
        1, 1)
    */
    ctx.drawImage(res.land[0], 0, 0, 1, 1)
};

Land.types = {
    TERRAIN: 1,
    MOUNTAIN: 4,
    WATER: 10
};

module.exports = Land;
