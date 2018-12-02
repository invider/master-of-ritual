'use strict'
let Item = function(st) {
    dna.Character.call(this, st);
    this._TYPES = {
        bone: {
            name: "bone",
            startTilex: 0,
            endTilex: 0,
            framerate: 1,
            tiles:res.bone
        },
    };
    this.itemType = this._TYPES.bone;
    this.applyType(this.itemType);
};

sys.extend(Item, dna.Character);

Item.prototype.applyType = function(type){
    sys.augment(this, type);
};

Item.prototype.hit = function(element){
    if (element instanceof dna.mob.Master){
        lab.camera.detach(this);
        element.inventory.push(this.itemType);
    }

};
module.exports = Item;
