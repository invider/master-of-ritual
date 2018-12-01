let BLINK = 0.7
let HEIGHT = 180
let SHIFT = 45

module.exports = {
    Z: 1005,
    visible: false,

    evo: function(dt) {
        if (!this.visible) return
        this.blink -= dt
        if (this.blink < 0) this.blink = BLINK*2
    },
    
    draw: function() {
        if (!this.visible) return

        ctx.fillStyle = '#201530C0'
        ctx.fillRect(0, ctx.height/2-HEIGHT/2, ctx.width, HEIGHT)
        
        if (this.blink > BLINK) {
            ctx.fillStyle = env.tuning.team[lab.game.control.id].color
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.font = '42px ' + env.tuning.font

            let text = 'Waiting for '
                + env.tuning.team[lab.game.control.id].name + ' Player'
            ctx.fillText(text, ctx.width/2, ctx.height/2 - SHIFT)

            ctx.font = '28px ' + env.tuning.font
            text = 'Press Space to Start Your Turn'
            ctx.fillText(text, ctx.width/2, ctx.height/2 + SHIFT)
        }
    },

    show: function() {
        this.visible = true
        this.blink = BLINK*2
    },

    hide: function() {
        this.visible = false
    },
}
