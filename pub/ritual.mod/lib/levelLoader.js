var TYPEMAP = {
    '*': 'levelWall',
    'w': 'wall',
    '@': 'mob/Master',
    'z': 'mob/Zombie',
    'b': 'mob/Bat',
    'g': 'mob/Ghost',
    's': 'mob/Skeleton',
    'i': 'Item',
    'H': {proto:"Item", params: {itemType: "health_potion"}},
    'W': {proto:"Item", params: {itemType: "wing"}},
    'B': {proto:"Item", params: {itemType: "blood"}},
    'E': {proto:"Item", params: {itemType: "eye"}},

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
            let params = {
                x: x,
                y: y,
                w: 1,
                h: 1
            };
            let type = TYPEMAP[symbol];

            if (typeof TYPEMAP[symbol] !== "string"){
                type = TYPEMAP[symbol].proto;
                sys.augment(params, TYPEMAP[symbol].params);
            }
            params.name = params.name || this.formatName(type);
            sys.spawn(type, params, "camera");

        })
    }
};

module.exports = LevelLoader


