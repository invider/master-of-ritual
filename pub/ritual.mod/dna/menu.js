var menu = function(st) {
    sys.augment(this, st)
};

menu.prototype.draw = function() {
    // fix position
    let w = this.w;
    if (w > ctx.width) w = ctx.width

    this.x = (ctx.width - w)/2;

    ctx.drawImage(this.background, this.x, this.y, w, this.h);
    
};

module.exports = menu;
