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

    this.hp = env.tuning.initialHP
    this.mana = env.tuning.initialMana
    this.speed = 1;
    this.showHoods = false;
    this.inventory = [];
    this.god = false;

    this.keys = {
        up:false,
        right:false,
        down:false,
        left:false,
        spell1:false,
        spell2:false,
        manapot:false,
        healingpot:false
    };

    this._spellTimers = {
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
Master.prototype.die = function(){
    lab.game.gameOwer();
};

Master.prototype.tryPot = function(type){
    if (this.countItems(type) > 0){
        this.useItem(type);
    }
};

Master.prototype.trySpell = function(spell){
    if (this._spellTimers[spell.type]){
        this.hint(res.msg.cooldown + Math.round(this._spellTimers[spell.type]).toString(), '#f03000')
    } else if (this.mana > spell.mana){
        this._spellTimers[spell.type] = spell.cooldown;
        lib.objUtil.findObjInRadius(this, spell.dmgRadius).filter(o => o instanceof dna.Mob).forEach(o => o.applyDamage(spell.dmg, this));
        this.mana -= spell.mana;
    } else {
        this.hint(res.msg.noMana, '#f03000')
    }
};
Master.prototype.countItems = function(type){
    let count = 0;
    for (let k in this.inventory){
        let item = this.inventory[k];
        if (item.name === type){
            count ++;
        }
    }
    return count;
};
Master.prototype.useItem = function(type){
    for (let k in this.inventory) {
        let item = this.inventory[k];
        if (item.name === type) {
            this.inventory.splice(k, 1);
            item.use();
            return;
        }
    }
};
Master.prototype.setHp = function(hp){
    this.hp = Math.max(hp, 100);
};
Master.prototype.setMana = function(mana){
    this.mana = Math.max(mana, 100);
};

Master.prototype.evo = function(dt){
    for (let k in this._spellTimers){
        this._spellTimers[k] -= dt;
        if (this._spellTimers[k] <=0){
            delete this._spellTimers[k];
        }
    }
    dna.Character.prototype.evo.call(this, dt);
    this.keys.healingpot && this.tryPot("health_potion");
    this.keys.manapot && this.tryPot("mana_potion");
    this.keys.spell1 && this.trySpell({
        type: "shadow",
        dmgRadius: 3,
        dmg:10,
        mana: 5,
        cooldown: 1
    });
    this.keys.spell2 && this.trySpell({
        type: "fire",
        dmgRadius: 30,
        dmg: 40,
        mana: 30,
        cooldown:30
    });
    this.keys.spell1 = this.keys.spell2 = this.keys.healingpot = this.keys.manapot = false;

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
    this.lastDx = 0 // fix dx, so there won't be automatic flip

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
    this.tiles = res.master;
    if (this.keys.left){
        this.tiles = res.master_left
    }
    if (this.keys.right){
        this.tiles = res.master_right
    }
    if (this.keys.up){
        this.tiles = res.master_back
    }
};

module.exports = Master;
