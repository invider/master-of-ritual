var Menu = function(st) {
    sys.augment(this, st)
    this.itemMargin = 138;
    this.itemW = 25;
    this.itemBgW = 46;
    this.itemBgH = 46;
    this.itemBgYMargin = 3;
    this.itemVertMargin = 15;
    this.itemSpacing = 24
    this.textMargin = - 10;
    this.hoodWidth = 15;
    this.hoodHeight = 90;
};
Menu.prototype.stacks = function(){
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
Menu.prototype.draw = function() {
    // fix position
    let w = this.w;
    if (w > ctx.width) w = ctx.width

    this.x = (ctx.width - w)/2;

    ctx.drawImage(this.background, this.x, this.y, w, this.h);
    let icons = this.stacks();
    ctx.font = '10pt Calibri';
    ctx.fillStyle = 'white';

    for (var i = 0; i < icons.length; i++){
        let item = icons[i];
        let itemX = this.x + i * (this.itemW + this.itemSpacing) + this.itemMargin;
        let itemY = this.y + this.itemVertMargin;
        res.items.background_icon.draw(0, itemX - 12, this.y + this.itemBgYMargin, this.itemBgW, this.itemBgH );
        item.item.tiles.draw(0, itemX, itemY, this.itemW, this.itemW );

        ctx.fillText(item.count, itemX + this.textMargin, itemY + this.textMargin)
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
