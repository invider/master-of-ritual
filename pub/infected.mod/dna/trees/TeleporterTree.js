let TeleporterTree = function(st) {
    dna.BaseTree.call(this, st)
    this.ttl = env.tuning.treeTTL
    this.fillstyle = "#ccc";
};
sys.extend(TeleporterTree, dna.BaseTree);

TeleporterTree.prototype.planted = function(){
    /** @type Player */
    let player = lab.game.control.player;
    player.targeting = true;
    lab.game.focus.player.targetListener = this;
};

TeleporterTree.prototype.targeted = function(island, target){
    this.targetTree = island.plantTree(target.x, target.y, dna.trees.TeleporterBackTree)
    this.targetTree.targetTree = this // set the backlink
};

TeleporterTree.prototype.touch = function(subject) {
    // teleport
    subject.islandId = this.targetTree.island.id
    subject.x = this.targetTree.x
    subject.y = this.targetTree.y
    lab.game.switchCurrentIsland(subject.islandId)
    lib.sfx(res.sfx.hyperjump, 0.8)
}

TeleporterTree.prototype.draw = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(res['teleport-tree'], 0, 0, 1, 1)
}

module.exports = TeleporterTree

