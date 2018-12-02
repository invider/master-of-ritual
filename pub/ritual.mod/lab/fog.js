'use strict'

const MAX_ALPHA = 0.9

const WAVE = 0.25

const PERIOD = 1.5

let glow = PERIOD

let fog = {

    Z: 11,

    active: false,

    color: '#100500',

    R: 175,

    I: 1.5,

    evo: function(dt) {
        if (!this.active) return

        if (glow < 0)  {
            glow += dt
            if (glow >= 0) glow = PERIOD
        } else {
            glow -= dt
            if (glow <= 0) glow = -PERIOD
        }
    },

    draw: function() {
        if (!this.active || !lab.camera.master) return

        ctx.save()
        //ctx.drawImage(res['smoke-particle'], ctx.width/2, ctx.height/2, 100, 100)

        let step = 5
        let clearRadius = this.R
        let maxRadius = Math.max(ctx.width, ctx.height)

        let intencity = this.I
        let coef = 0

        if (glow < 0) {
            intencity += -WAVE * glow/PERIOD
        } else {
            intencity += WAVE * (1-glow/PERIOD)
        }

        let alphaStep = MAX_ALPHA/((this.R*intencity-this.R)/step)

        ctx.strokeStyle = this.color
        ctx.lineWidth = 5

        // TODO get actual player screen coordinates
        //let sx = lab.camera.screenX(lab.camera.master.x)
        //let sy = lab.camera.screenY(lab.camera.master.y)
        let sx = ctx.width/2
        let sy = ctx.height/2

        let alpha = 0

        let r = clearRadius
        while(r < maxRadius) {

            ctx.globalAlpha = alpha
            ctx.beginPath();
            ctx.arc(sx, sy, r, 0, 2*Math.PI);
            ctx.stroke();

            r += step
            if (alpha < MAX_ALPHA) alpha += alphaStep
        }

        ctx.restore()
    },

}


module.exports = fog
