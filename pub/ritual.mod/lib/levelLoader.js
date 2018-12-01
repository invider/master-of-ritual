var TYPEMAP = {
    '*': 'levelWall',
    'w': 'wall',
    '@': 'mob/Master',
    'z': 'mob/Zombie',
    'b': 'mob/Bat',
    'g': 'mob/Ghost',
    'A': 'altar',
    'P': 'portalNextLvl',
};

let LevelLoader = {

    formatName: function (type) {
        return lib.stringTools.lowerFirstLetter(type.split("/").pop());
    },

    loadFile: function(data){
        $.lib.levelParser.parse(data, (x, y, symbol, param) => {
            if (symbol == " ") {
                return;
            }
            sys.spawn(TYPEMAP[symbol], {
                x: x,
                y: y,
                w: 1,
                h: 1,
                name: this.formatName(TYPEMAP[symbol])
            }, "camera");
            console.log(x, y, symbol, param)
        })
    }
};

module.exports = LevelLoader


