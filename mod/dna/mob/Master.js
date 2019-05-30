'use strict'

// @depends(dna/Character)

let Master = function(st) {
    dna.Character.call(this, st)
    this.Z = 40

    this.w = 1;
    this.h = 1;
    // active (collidable) width and height
    this.aw = 0.67;
    this.ah = 0.99;

    this.hp = env.tuning.initialHP
    this.mana = env.tuning.initialMana
    this.speed = env.tuning.masterSpeed
    this.showHoods = false
    this.inventory = []
    this.god = false

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
    this.endTilex = 5;
    this.framerate = 4;

    //this.status = "dungeon master!"
};

sys.extend(Master, dna.Character);

Master.prototype.fixCamera = function() {
    lab.camera.x = this.x
    lab.camera.y = this.y
};
Master.prototype.die = function(){
    lab.game.gameOver();
};

Master.prototype.tryPot = function(type){
    if (this.countItems(type) > 0){
        this.useItem(type);
    }
};

Master.prototype.spellFx = function(type) {
    let opt = env.tuning[type]

    sys.spawn('Emitter', {
        Z: this.Z+3,
        x: this.x,
        y: this.y + this.h/3,
        color: opt.color,
        lifespan: 0.04,
        force: 20000,
        radius: 0,
        size: 0.04, vsize: 0,
        speed: opt.speed, vspeed: 0,
        angle: 0, spread: lib.math.PI2,
        minLifespan: opt.ttl, vLifespan: 0,
    }, 'camera')

    lib.sfx(res.sfx.ghost1, 0.8)
}

Master.prototype.trySpell = function(spell){
    if (!this.god && this._spellTimers[spell.type]){
        this.hint(res.msg.cooldown + Math.ceil(this._spellTimers[spell.type]).toString(), '#34cee2', { name: 'cooldown' })
    } else if (this.mana > spell.mana || this.god){
        this._spellTimers[spell.type] = spell.cooldown;
        lib.objUtil.findObjInRadius(this, spell.dmgRadius).filter(o => o instanceof dna.Mob).forEach(o => o.applyDamage(spell.dmg, this));
        if (!this.god) this.mana -= spell.mana;

        this.spellFx(spell.type)
    } else {
        this.hint(res.msg.noMana, '#258cdb', { name: 'noMana' })
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
    this.hp = Math.min(hp, this.maxHp);
};

Master.prototype.setMana = function(mana){
    this.mana = Math.min(mana, this.maxMana);
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
        dmgRadius: env.tuning.shadow.radius,
        dmg: env.tuning.shadow.dmg,
        mana: env.tuning.shadow.mana,
        cooldown: env.tuning.shadow.cooldown,
    });
    this.keys.spell2 && this.trySpell({
        type: "fire",
        dmgRadius: env.tuning.fire.radius,
        dmg: env.tuning.fire.dmg,
        mana: env.tuning.fire.mana,
        cooldown: env.tuning.fire.cooldown,
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
    //this.status = "Dungeton master:" + this.inventory.map(o => o.name).join(", ")

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

    this.tiles = res.master
    this.endTilex = 4

    if (this.keys.left){
        this.tiles = res.master_left
        this.endTilex = 5
    }
    if (this.keys.right){
        this.tiles = res.master_right
        this.endTilex = 5
    }
    if (this.keys.up){
        this.tiles = res.master_back
        this.endTilex = 5
    }

    // fix for the case when tilex has got bigger than expected
    if (this.tilex > this.endTilex) this.tilex = this.startTilex
};

module.exports = Master;
