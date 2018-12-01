var game = {
    level: 0,
    nextLevel: function(){
        this.level ++;
        lib.levelLoader.loadFile(res.levels[this.level])
    }
};

module.exports = game;