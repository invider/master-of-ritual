let AttackTree = function(st) {
    dna.BaseTree.call(this, st)
    this.ttl = env.tuning.treeTTL
};
sys.extend(AttackTree, dna.BaseTree);

AttackTree.prototype.planted = function(){
    /** @type Player */
    let player = lab.game.control.player;
    player.targeting = true;
    lab.game.focus.player.targetListener = this;
};

AttackTree.prototype.targeted = function(island, target){
    this.targetIsland = island
    this.targetX = target.x
    this.targetY = target.y

    island.putSlime(target.x, target.y, this.team)
};

AttackTree.prototype.turn = function() {
    this.targetIsland.infect(this.targetX, this.targetY, this.team)
}

AttackTree.prototype.draw = function() {
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(res['attack-tree'], 0, 0, 1, 1)
}

module.exports = AttackTree

