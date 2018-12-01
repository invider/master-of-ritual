let Team = function(st) {
    sys.augment(this, st)

    sys.spawn('Player', {
        name: 'player',
        team: this.id,
        islandId: this.startIsland,
    }, this)
}

Team.prototype.evo = function(dt) {
}

module.exports = Team

