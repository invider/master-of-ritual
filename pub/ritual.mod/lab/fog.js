'use strict'

const MAX_ALPHA = 0.9

const WAVE = 0.25

const PERIOD = 1.5

let glow = PERIOD

let fogTx = []

let fog = {

    Z: 11,

    active: true,

    color: '#100500',

    R: 175,

    I: 1.5,

    init: function() {
        log.out('generating fog...')

        // create new canvas
        let canvas = document.createElement('canvas');
        canvas.width = ctx.width
        canvas.height = ctx.height
        let fctx = canvas.getContext('2d');

        let step = 5
        let clearRadius = this.R
        let maxRadius = Math.max(ctx.width, ctx.height)

        let intencity = this.I
        let alphaStep = MAX_ALPHA/((this.R*intencity-this.R)/step)

        fctx.strokeStyle = this.color
        fctx.lineWidth = 5

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

        // store to image
        var image = new Image();
        image.src = canvas.toDataURL();
        fogTx[0] = image
    },

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

        let sx = ctx.width/2
        let sy = ctx.height/2
        let w = ctx.width/3
        let h = ctx.height/3

        ctx.drawImage(fogTx[0], sx, sy, w, h)
        ctx.strokeStyle = '#ffff00'
        ctx.lineWidth = 2
        ctx.strokeRect(sx, sy, w, h)

        ctx.restore()

        /*
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
        */
    },

}


module.exports = fog
