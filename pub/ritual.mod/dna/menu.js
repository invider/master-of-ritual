var menu = function(st) {

    let res = new sys.Frame({
        name: 'menu',

        evo: function(scene, dt) {}, 

        draw: function() {
            // fix position
            let w = this.w
            if (w > ctx.width) w = ctx.width

            this.x = (ctx.width - w)/2

            ctx.drawImage(this.background, this.x, this.y, w, this.h)
        }
    })

    sys.augment(res, st)
    return res
};

module.exports = menu;
