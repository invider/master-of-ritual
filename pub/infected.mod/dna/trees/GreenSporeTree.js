let GreenSporeTree = function(st) {
    dna.SporeTree.call(this, st)
    this.fillstyle = "#00ff00";
    this.ttl = env.tuning.treeTTL
    this.type = dna.Spore.TYPE.GREEN;
}

sys.extend(GreenSporeTree, dna.SporeTree);

GreenSporeTree.prototype.draw = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(res['green-tree'], 0, 0, 1, 1)
}

module.exports = GreenSporeTree

