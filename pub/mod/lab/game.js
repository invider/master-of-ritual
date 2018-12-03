'use strict'

let keyBuffer = ''
const MAX_BUFFER = 16

let match = function(cmd) {
    return keyBuffer.endsWith(cmd)
}

let cheatCode = {
    'debug': function() {
        env.debug = !env.debug
    },
    'ether': function() {
        lab.camera.master.solid = !lab.camera.master.solid
    },
    'superhuman': function() {
        lab.camera.master.god = !lab.camera.master.god
    },
    'superspeed': function() {
        lab.camera.master.speed = 5
    },
    'moremana': function() {
        lab.camera.master.mana = lab.camera.master.maxMana
    },
    'morehealth': function() {
        lab.camera.master.hp = lab.camera.master.maxHp
    },
    'fog': function() {
        lab.fog.active = !lab.fog.active
    },
}

let game = {

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
    },

    keyUp: function(key) {
        if (!key || key.length > 1) return

        keyBuffer += key
        if (keyBuffer.length > MAX_BUFFER) {
            keyBuffer = keyBuffer.substring(
                keyBuffer.length-MAX_BUFFER, keyBuffer.length)
        }

        this.tryToCheat()
    },

    tryToCheat: function() {
        Object.getOwnPropertyNames(cheatCode).forEach(code => {
            if (match(code)) {
                log.out('cheat: [' + code + ']')
                cheatCode[code]()
            }
        })
    },

};

module.exports = game;
