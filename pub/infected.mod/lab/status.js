module.exports = {
    Z: 1000,
    draw: function() {
        ctx.fillStyle = '#80F000'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'bottom'
        ctx.font = '18px ' + env.tuning.font

        let text = env.status
        if (!text) text = 'status'
        ctx.fillText(text, 10, ctx.height-10)

        ctx.textAlign = 'center'
        ctx.fillStyle = '#ff4020'
		text = 'Action Points: ' + lab.game.control.player.actionPoints
		ctx.fillText(text, ctx.width * 0.5, ctx.height-10)
    }
}
