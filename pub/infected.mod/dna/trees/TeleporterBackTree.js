let TeleporterBackTree = function(st) {
    dna.BaseTree.call(this, st)
    this.ttl = env.tuning.treeTTL
    this.fillstyle = "#555";
};
sys.extend(TeleporterBackTree, dna.BaseTree);

TeleporterBackTree.prototype.planted = function(){
};

TeleporterBackTree.prototype.targeted = function(island, target){
};

TeleporterBackTree.prototype.touch = function(subject) {
    subject.islandId = this.targetTree.island.id
    subject.x = this.targetTree.x;
    subject.y = this.targetTree.y;
    lab.game.switchCurrentIsland(subject.islandId)
    lib.sfx(res.sfx.hyperjump, 0.8)
}

TeleporterBackTree.prototype.draw = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(res['teleport-tree'], 0, 0, 1, 1)
}

module.exports = TeleporterBackTree

