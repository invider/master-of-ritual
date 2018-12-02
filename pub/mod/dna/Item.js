'use strict'
let Item = function(st) {
    dna.Character.call(this, st);
    this._TYPES = {
        bone: {
            name: "bone",
            startTilex: 0,
            endTilex: 0,
            ingredient: true,
            framerate: 1,
            tiles:res.items.bone
        },
        eye: {
            name: "eye",
            startTilex: 0,
            endTilex: 0,
            ingredient: true,
            framerate: 1,
            tiles:res.items.eye
        },
        health_potion: {
            name: "health_potion",
            startTilex: 0,
            endTilex: 0,
            ingredient: false,
            framerate: 1,
            tiles:res.items.health_potion
        },
        wig: {
            name: "wing",
            startTilex: 0,
            endTilex: 0,
            ingredient: true,
            framerate: 1,
            tiles:res.items.wing
        },
        blood: {
            name: "blood",
            startTilex: 0,
            endTilex: 0,
            framerate: 1,
            ingredient: true,
            tiles:res.items.blood
        },

    };
    this.itemType = st.itemType || this._TYPES.bone;
    this.applyType(this.itemType);
};

sys.extend(Item, dna.Character);

Item.prototype.applyType = function(type){
    if (typeof type === "string"){
        for (var k in this._TYPES){
            if (this._TYPES[k].name === type){
                type = this._TYPES[k];
                break;
            }
        }
    }
    sys.augment(this, type);
    this.itemType = type;
};

Item.prototype.hit = function(element){
    if (element instanceof dna.mob.Master){
        lab.camera.detach(this);
        element.inventory.push(this.itemType);
        lib.sfx(res.sfx.pickup, 0.6)
    }

};
module.exports = Item;
