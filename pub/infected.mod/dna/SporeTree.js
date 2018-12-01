let SporeTree = function(st) {
    dna.BaseTree.call(this, st)
    this.ttl = env.tuning.treeTTL
    this.dropRadius = 2;
    this.spawnPeriod = 1;
    this.fillstyle = "#0000ff";
    this.type = dna.Spore.TYPE.RED;
};

sys.extend(SporeTree, dna.BaseTree);

SporeTree.prototype.turn = function(){
    this.turnCounter = this.turnCounter || 0
    this.turnCounter ++;
    if (this.turnCounter == this.spawnPeriod){
        this.island.dropSporeInRadius(dna.Spore.TYPE.BLUE, this.x, this.y, this.dropRadius);
        this.turnCounter = 0;
    }
};

module.exports = SporeTree

