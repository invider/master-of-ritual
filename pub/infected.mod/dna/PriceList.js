/**
 *
 * @param init
 * @constructor
 * @extends {Entity}
 */
var PriceList = function(init){
    this.horizontal = false;
    //  copyying parameters from init to this
    sys.augment(this, init);
    this.treeScale = 45;
    this.treeCache = {};
    this.treeStepY = 20;
    this.treeStepX = 30;
    this.fontSize = 24;
    this.selection = 0;
    this.spores = {};
};

PriceList.prototype.createSpores = function(){
    if (!this.spores.length){
        for (var typeName in dna.Spore.TYPE){
            let spore = new dna.Spore(dna.Spore.TYPE[typeName]);
            this.spores[dna.Spore.TYPE[typeName]] = spore;
        }
    }
};

PriceList.prototype._getTree = function(name){
    if (!this.treeCache[name]){
        this.treeCache[name] = new dna.trees[name]();
    }
    return this.treeCache[name];
};

PriceList.prototype._getTreeList = function(){
    return res.trees;
};

PriceList.prototype.drawItem = function(item, x, y){
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(this.treeScale, this.treeScale);
    item.draw();
    ctx.restore()
};

PriceList.prototype.drawLine = function(tree, selected){
    if (selected){
        if (this.checkCanBuy()){
            ctx.strokeStyle = "#0000FF";
        } else {
            ctx.strokeStyle = "#aa0000";
        }
        ctx.strokeRect(0, 0, this.width, this.treeScale + this.treeStepY);
    }

    let treeObject = this._getTree(tree.name);
    let currentX = 10;
    this.drawItem(treeObject, currentX, 10);

    for (var typeName in dna.Spore.TYPE){
        currentX += this.treeStepX + this.treeScale;
        var type = dna.Spore.TYPE[typeName];
        var sporeItem = this.spores[type];
        var sporeCount = tree[dna.Spore.TYPENAMES[type]];

        ctx.font = `${this.fontSize}px zekton`;
        ctx.fillStyle = "#00c5ff";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(`${sporeCount}`,currentX-8, this.fontSize-8);

        this.drawItem(sporeItem, currentX, 10)
    }
};
PriceList.prototype.checkCanBuy = function(){
    var element = this._getTreeList()[this.selection];
    let player = lab.game.control.player;
    for (var sporeType in player.spores){
            if (player.spores[sporeType] < element[lib.sporesTools.sporeTypeNameFromType(sporeType)]){
                return false
            }
    }
    return true;
};
PriceList.prototype.buy = function(){
    if (this.checkCanBuy()){
        var element = this._getTreeList()[this.selection];
        console.log(element);
        let island = lab.game.getCurrentIsland();
        let player = lab.game.control.player;
        island.plantTree(player.x, player.y, dna.trees[element.name],
            player.team)
        player.shopping = false;
        for (var sporeType in player.spores){
            player.spores[sporeType] -= element[lib.sporesTools.sporeTypeNameFromType(sporeType)];
        }
        lib.sfx(res.sfx.plant, 0.7)
    } else {
        lib.sfx(res.sfx.denied, 0.8)
    }

};

PriceList.prototype.move = function(dir){
    switch(dir) {
        case lib.consts.directions.UP: this.selection --; break;
        case lib.consts.directions.DOWN: this.selection ++; break;
    }
    var list = this._getTreeList();
    if (this.selection >= list.length){
        this.selection = 0;
    }
    if (this.selection < 0){
        this.selection = list.length - 1;
    }
    lib.sfx(res.sfx.select, 0.7)
};
PriceList.prototype.draw = function(){
    if (!lab.game.focus.player.shopping ){
        return
    }
    let currentX = 0;
    let currentY = 0;
    this.createSpores();
    ctx.strokeStyle = "#00aa00";
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    var list = this._getTreeList();
    for (let i = 0; i < list.length; i++){
        if (list[i].canBuy){
            ctx.save();
            ctx.translate(this.x + currentX, this.y + currentY);
            this.drawLine(list[i], i === this.selection);
            ctx.restore();
            currentY += this.treeScale + this.treeStepY;
        }
    }
};

module.exports = PriceList;
