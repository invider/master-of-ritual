module.exports = {
    Z: 1000,
    draw: function() {
        ctx.textAlign = 'center'
        ctx.textBaseline = 'bottom'
        ctx.font = '24px ' + env.tuning.font

        ctx.fillStyle = env.tuning.team[lab.game.control.id].color
        let text = env.tuning.team[lab.game.control.id].name + ' Player Turn'
        ctx.fillText(text, ctx.width/2, 30)

        ctx.fillStyle = env.tuning.turnLabelColor
        text = 'Turn ' + lab.game.turn
        ctx.fillText(text, ctx.width - 170, 30)
    }
}
