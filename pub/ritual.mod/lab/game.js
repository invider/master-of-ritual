var game = {
    level: 0,
    nextLevel: function(){
        this.level++;

        // loop to first level in the end
        let levelRes = res.levels[this.level]

        if (!levelRes) {
            this.level = 1
            levelRes = res.levels[this.level]
        }

        log.out('Level Up to #' + this.level)
        this.loadLevel(levelRes)
    },
    gameOwer: function(){
        this.loadLevel(res.levels.death);
    },
    loadLevel: function(levelRes){
        lab.camera.detachAll()
        lib.levelLoader.loadFile(levelRes)
    }

};

module.exports = game;
