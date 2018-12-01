var TYPEMAP = {
    '*': 'levelWall',
    'w': 'wall',
    '@': 'player',
    'z': 'zombie'
};

let LevelLoader = {
    loadFile: function(data){
        $.lib.levelParser.parse(data, function(x, y, symbol, param){
            sys.spawn(TYPEMAP[symbol], {
                x: x,
                y: y
            }, "camera");
            console.log(x, y, symbol, param)
        })
    }
};

module.exports = LevelLoader


