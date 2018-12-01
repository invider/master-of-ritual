var game = {
    level: 0,
    nextLevel: function(){
        log.out('next level')
        this.level ++;
        lib.levelLoader.loadFile(res.levels[this.level])
    }
};

module.exports = game;
