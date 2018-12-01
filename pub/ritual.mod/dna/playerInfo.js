var playerInfo = function() {

    return new sys.Frame({
        name: 'playerInfo',

        evo: function(scene, dt) {

        },
        txt: function(text1, text2){
            ctx.font = '32px kenney, impact, sans-serif';

            ctx.fillStyle="#202020";
            ctx.fillText(text1, 12, 37);
            ctx.fillStyle="#E08040";
            ctx.fillText(text1, 10, 35);

            ctx.fillStyle="#202020";
            ctx.fillText(text2, 12, 72);
            ctx.fillStyle="#6080D0";
            ctx.fillText(text2, 10, 70);
        },
        addVar: function(opts){
            let v = opts.value === undefined ? this._.selectOne(opts.path): opts.value;
            if (opts.number) {
                v = v || 0;
            }
            return opts.caption + v + " ";
        },
        hit: function(el){
            debugger;
            if (el instanceof Mob){
                this.hp -= el.damage;
            }
        },
        draw: function() {
            // let spawned = this._.selectOneNumber(constants.path.DUDES_SPAWNED_COUNT);
            // let dead = this._.selectOneNumber(constants.path.DUDES_DEAD);
            // let goal = this._.selectOneNumber(constants.path.GOAL)
            // let escaped = this._.selectOneNumber(constants.path.DUDES_ESCAPED)
            // let level = this._.selectOne(constants.path.PLAYER_LEVEL)
            // let levelName = this._.selectOne(constants.path.LEVEL_NAME)
            //

            let txt = this.addVar({caption: "Level:", value: lab.game.level });
            txt += this.addVar({caption: "HP:", value: lab.camera.master.hp });
            // txt2 += this.addVar({caption: "Goal: ", value:  escaped + "/" + goal });
            // txt2 += this.addVar({caption: " Walking: ", value:  spawned - escaped - dead });
            //
            this.txt(txt, "");
        }
    })
};

module.exports = playerInfo;