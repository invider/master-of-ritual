module.exports = {
    Z: 100,

    draw: function() {
        if (!env.debug) return

        ctx.fillStyle = '#80F000'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.font = '18px kenney-rocket-square'

        let text = env.status
        if (!text) text = 'status'
        ctx.fillText(text, 10, ctx.height-10)
    }
}
