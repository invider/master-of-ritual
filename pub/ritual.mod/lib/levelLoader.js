var TYPEMAP = {
    '*': 'levelWall',
    'w': 'wall',
    '@': 'mob/Master',
    'z': 'mob/Zombie',
    'b': 'mob/Bat',
    'g': 'mob/Ghost',
    's': 'mob/Skeleton',
    'A': 'altar'
};

let LevelLoader = {

    formatName: function (type) {
        return lib.stringTools.lowerFirstLetter(type.split("/").pop());
    },

    loadFile: function(data){
        if (!data || !sys.isString(data)) {
            throw 'Unable to load level data: ' + data
        }

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
        })
    }
};

module.exports = LevelLoader


