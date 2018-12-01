/**
 *
 * @param init
 * @constructor
 * @extends {Entity}
 */
var SporesIndicator = function(init){
    this.horizontal = true;
    this.x = 0;
    this.y = 0;
    this.fontSize = 22;
    this.sporeScale = 64
    this.sporesStep = 64
    this.spores = [];
    this.width = 0;
    this.height = 0;
    //  copyying parameters from init to this
    sys.augment(this, init);
};



SporesIndicator.prototype.createSpores = function(){
    if (!this.spores.length){
        for (var typeName in dna.Spore.TYPE){
            let spore = new dna.Spore(dna.Spore.TYPE[typeName]);
            this.spores.push(spore);
        }
    }
};

SporesIndicator.prototype.draw = function(){
    this.createSpores();
    ctx.strokeStyle = "#00aa00"
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    let currentX = 0;
    let currentY = 0;
    for (var i = 0; i < this.spores.length; i++){
        if (this.horizontal){
            currentX += this.sporesStep;
        } else {
            currentY += this.sporesStep;
        }
        ctx.save();
        ctx.translate(this.x + currentX, this.y + currentY);
        ctx.scale(this.sporeScale, this.sporeScale);

        this.spores[i].draw();
        ctx.restore();

        ctx.font = `${this.fontSize}px zekton`;
        ctx.fillStyle = "#00c5ff"
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        var sporeType = this.spores[i].type;
        ctx.fillText(`${lab.game.focus.player.spores[sporeType]}`,
            this.x + currentX,
            this.y + currentY + this.fontSize - 4);
    }
};

module.exports = SporesIndicator;
