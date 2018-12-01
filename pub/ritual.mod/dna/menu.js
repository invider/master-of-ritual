var menu = function() {

    return new sys.Frame({
        name: 'menu',

        evo: function(scene, dt) {

        },
        draw: function() {
            debugger;
            res.menu.draw(0, this.x-0.5, this.y-0.5, 1, 1);
        }
    })
};

module.exports = menu;