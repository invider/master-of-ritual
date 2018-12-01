let BlueSporeTree = function(st) {
    dna.SporeTree.call(this, st)
    this.ttl = env.tuning.treeTTL
    this.fillstyle = "#0000ff";
    this.dropRadius = 2;
    this.type = dna.Spore.TYPE.BLUE;
};

sys.extend(BlueSporeTree, dna.SporeTree);

BlueSporeTree.prototype.draw = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(res['blue-tree'], 0, 0, 1, 1)
}

module.exports = BlueSporeTree

