var Menu = function(st) {
    sys.augment(this, st)
};

Menu.prototype.draw = function() {
    // fix position
    let w = this.w;
    if (w > ctx.width) w = ctx.width

    this.x = (ctx.width - w)/2;

    ctx.drawImage(this.background, this.x, this.y, w, this.h);
    for (var k in lab.master){

    }
};

module.exports = Menu;
