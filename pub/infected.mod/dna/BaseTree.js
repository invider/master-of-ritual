let BaseTree = function(st) {
    this.solid = true
    this.ttl = -1;
    this.fillstyle = "#333444";
    sys.augment(this, st)
}

BaseTree.prototype.turn = function() {
    this.ttl--
    if (this.ttl === 0) this.kill()
}

BaseTree.prototype.evo = function(dt) {
}

BaseTree.prototype.draw = function() {
    ctx.fillStyle = this.fillstyle;
    ctx.fillRect(0.25, 0.25, 0.5, 0.5)
};

BaseTree.prototype.planted = function(){

};

BaseTree.prototype.kill = function() {
    this.island.removePlant(this.index)
    // TODO dead tree sfx
    // TODO create a dead tree and make sideeffects
}

module.exports = BaseTree

