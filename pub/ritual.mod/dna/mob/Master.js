'use strict'

// @depends(dna/Character)

let Master = function(st) {
    dna.Character.call(this, st)
    this.Z = 40

    this.w = 1;
    this.h = 1;
    // active (collidable) width and height
    this.aw = 0.67;
    this.ah = 0.95;

    this.hp = 100;
    this.mana = 50;
    this.speed = 1;
    this.inventory = [];
    this.god = false

    this.keys = {
        up:false,
        right:false,
        down:false,
        left:false,
        spell1:false,
        spell2:false
    };

    this.tiles = res.master;
    this.startTilex = 0;
    this.endTilex = 4;
    this.framerate = 5;

    this.status = "dungeon master!"
};

sys.extend(Master, dna.Character);

Master.prototype.fixCamera = function() {
    lab.camera.x = this.x
    lab.camera.y = this.y
};

Master.prototype.hit = function(source, dt) {

    if (source instanceof dna.Mob && !this.god){
        this.hp -= source.damage * dt;
        if (this.hp < 0){
            this.hp =0;
            lab.game.gameOwer();
        }
    }

    //lib.sfx(res.sfx.hit, 0.7)
};

Master.prototype.evo = function(dt){
    dna.Character.prototype.evo.call(this, dt);

    let dx = 0
    let dy = 0
    if (this.keys.left){
        dx = -dt * this.speed;
    }
    if (this.keys.right){
        dx = dt * this.speed;
    }
    if (this.keys.down){
        dy = dt * this.speed;
    }
    if (this.keys.up){
        dy = -dt * this.speed;
    }

    this.tryToMove(dx, dy)
    this.fixCamera()
    this.status = "Dungeton master:" + this.inventory.map(o => o.name).join(", ")

    // let elements = lab.camera.selectInstance(dna.Mob);
    // debugger;
    // elements.forEach(o => o.status = '')
    // for (let k in elements){
    //     let intersections = lib.objUtil.rayTraceRadial(lab.camera, this, elements[k]);
    //     intersections.forEach(o => o.status = '123')
    //     if (intersections.length === 0){
    //         elements[k].status = "i see you";
    //     }
    // }
};

module.exports = Master;
