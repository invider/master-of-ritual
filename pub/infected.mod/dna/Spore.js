let Spore = function(type, island, index) {
    this.harvestable = true
    this.type = type
    this.island = island
    this.index = index
    this.ttl = 5 + lib.math.rndi(10)
}

Spore.TYPE = {
    RED: 0,
    GREEN: 1,
    BLUE: 2
};
Spore.TYPENAMES = {};
for (var k in Spore.TYPE){
    Spore.TYPENAMES[Spore.TYPE[k]] = k;
}
Spore.TYPES = 3

Spore.prototype.turn = function() {
    this.ttl--
    if (this.ttl <= 0) {
        this.kill()
        // TODO - maybe add a week instead of a kille spore?
    }
}

Spore.prototype.kill = function() {
    this.island.removePlant(this.index)
}

Spore.prototype.draw = function() {

    let img = res['red-spore']
    switch(this.type) {
        case Spore.TYPE.RED: img = res['red-spore']; break;
        case Spore.TYPE.GREEN: img = res['green-spore']; break;;
        case Spore.TYPE.BLUE: img = res['blue-spore']; break;
    }
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img, 0.1, 0.1, 0.8, 0.8)

}

module.exports = Spore

