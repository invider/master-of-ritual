'use strict'

let keyBuffer = ''
const MAX_BUFFER = 16

let match = function(cmd) {
    return keyBuffer.endsWith(cmd)
}

let cheatCode = {
    'debug': function() {
        env.debug = !env.debug
        lab.camera.master.hint('debug mode: ' + env.debug)
    },
    'ether': function() {
        lab.camera.master.solid = !lab.camera.master.solid
        lab.camera.master.hint('ether mode: ' + lib.camera.master.solid)
    },
    'superhuman': function() {
        lab.camera.master.god = !lab.camera.master.god
        lab.camera.master.hint('god mode: ' + lab.camera.master.god)
    },
    'supernice': function() {
        env.supernice = !env.supernice
        lab.camera.master.hint('supernice: ' + env.supernice)
    },
    'superspeed': function() {
        lab.camera.master.speed = 5
        lab.camera.master.hint('superspeed mode')
    },
    'superdamage': function() {
        lab.camera.master.die()
        lab.camera.master.hint('suicide!')
    },
    'superlevel': function() {
        lab.game.nextLevel()
    },
    'moremana': function() {
        lab.camera.master.mana = lab.camera.master.maxMana
        lab.camera.master.hint('more mana')
    },
    'morehealth': function() {
        lab.camera.master.hp = lab.camera.master.maxHp
        lab.camera.master.hint('more health')
    },
    'fog': function() {
        lab.fog.active = !lab.fog.active
    },
    'superabilities': function() {
        let txt = Object.keys(cheatCode).join('\n')
        game.showStory(txt)
        out.log(txt)
    },
}

let game = {

    level: 0,

    cycle: 0,

    evo: function(dt) {
        this.cycle++
    },

    nextLevel: function(level){
        if (level !== undefined) this.level = level
        else this.level++;

        // loop to first level in the end
        let levelRes = res.levels[this.level]

        if (!levelRes) {
            this.level = 1
            levelRes = res.levels[this.level]
        }

        log.out('Level Up to #' + this.level)
        window.location.hash = '' + this.level
        
        this.loadLevel(levelRes)
    },

    gameOver: function(){
        this.loadLevel(res.levels.death);
        setTimeout(() => {
            lab.camera.x = 17
            lab.camera.y = 8
            lab.camera.scale = 25
        }, 1000)
        lib.sfx(res.sfx.ghost2, 1)
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

    showStory: function(txt) {
        // show the story
        sys.spawn('text/scroll', {
            Z: 100,
            rx: 75,
            ry: 100,
            period: 1.5,
            time: 25,       // how long display each line
            fadein: 2.5,
            fadeout: 5,
            speed: -25,
            txt: txt,
            align: 'center',
            font: '24px ' + env.tuning.textFont,
            color: '#60FF20',
        })
    }

};

module.exports = game;
