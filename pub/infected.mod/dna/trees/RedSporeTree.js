let RedSporeTree = function(st) {
    dna.SporeTree.call(this, st)
    this.ttl = env.tuning.treeTTL
    this.fillstyle = "#ff0000";
    this.type = dna.Spore.TYPE.RED;
}
sys.extend(RedSporeTree, dna.SporeTree);

RedSporeTree.prototype.draw = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(res['red-tree'], 0, 0, 1, 1)
}

module.exports = RedSporeTree

