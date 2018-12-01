let Slime = function(st) {
    this.team = 0
    sys.augment(this, st)
}

Slime.prototype.draw = function() {
    ctx.fillStyle = env.tuning.team[this.team].color + '60'
    ctx.fillRect(0, 0, 1, 1)
}

module.exports = Slime
