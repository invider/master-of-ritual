/**
 * @alias dna.menu
 * @param st
 * @constructor
 */
var Menu = function(st) {
    sys.augment(this, st)
    this.ingredientMargin = 138;
    this.itemW = 25;
    this.itemBgW = 46;
    this.itemBgH = 46;
    this.itemBgYMargin = 3;
    this.itemVertMargin = 15;
    this.itemSpacing = 24
    this.itemMargin = 18;
    this.textMargin = -3;
    this.hoodWidth = 15;
    this.hoodHeight = 90;
};
Menu.prototype.stacks = function(){
    if(!lab.camera.master){
        return [];
    }
    let inventory = lab.camera.master.inventory;
    let types = {};
    for (var i=0;i<inventory.length; i++){
        let item = inventory[i];
        if (!types[item.name]){
            types[item.name] = {
                item: item,
                count: 1
            }
        } else {
            types[item.name].count ++;
        }
    }
    var res = [];
    for (let k in types){
        res.push(types[k]);
    }
    return res;
};

Menu.prototype.drawIcon = function(itemX, itemY, tiles, count){
    res.items.background_icon.draw(0, itemX - 12, this.y + this.itemBgYMargin, this.itemBgW, this.itemBgH );
    tiles.draw(0, itemX, itemY, this.itemW, this.itemW );
    count && ctx.fillText(count, itemX + this.textMargin, itemY + this.textMargin)
};
Menu.prototype.draw = function() {
    if(!lab.camera.master){
        return ;
    }
    // fix position
    let w = this.w;
    if (w > ctx.width) w = ctx.width

    this.x = (ctx.width - w)/2;

    ctx.drawImage(this.background, this.x, this.y, w, this.h);

    ctx.font = '10pt Calibri';
    ctx.fillStyle = 'black';

    let ingredients = this.stacks().filter(o => o.item.ingredient);
    for (var i = 0; i < ingredients.length; i++){
        let item = ingredients[i];
        let itemX = this.x + i * (this.itemW + this.itemSpacing) + this.ingredientMargin;
        let itemY = this.y + this.itemVertMargin;
        this.drawIcon(itemX, itemY, item.item.tiles, item.count)
    }

    let icons = this.stacks().filter(o => !o.item.ingredient);
    for (var i = 0; i < icons.length; i++){
        let item = icons[i];
        let itemX = this.x + i * (this.itemW + this.itemSpacing) + this.itemMargin;
        let itemY = this.y + this.itemVertMargin;
        this.drawIcon(itemX, itemY, item.item.tiles, item.count)
    }

    let hoodsY = this.y + 5;
    let hpHoodX = this.x + 107;
    let manaHoodX = this.x + 667;
    ctx.fillStyle = "#F00";
    ctx.fillRect(hpHoodX, hoodsY, this.hoodWidth, (this.hoodHeight / 100) * lab.camera.master.hp)


    ctx.fillStyle = "#00F";
    ctx.fillRect(manaHoodX, hoodsY, this.hoodWidth, (this.hoodHeight / 100) * lab.camera.master.mana )
};

module.exports = Menu;
