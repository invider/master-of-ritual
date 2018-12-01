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
        lab.camera.detachAll()
        lib.levelLoader.loadFile(levelRes)
    },
    gameOwer: function(){
        lab.camera.detachAll()
        lib.levelLoader.loadFile(res.levels.death)
    }

};

module.exports = game;
