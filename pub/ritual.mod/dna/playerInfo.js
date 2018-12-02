var playerInfo = function() {

    return new sys.Frame({
        name: 'playerInfo',

        evo: function(scene, dt) {

        },
        txt: function(text1, text2){
            ctx.font = '24px kenney-rocket-square, impact, sans-serif';

            ctx.fillStyle="#101010";
            ctx.fillText(text1, 13, 38);
            ctx.fillStyle="#F0B040";
            ctx.fillText(text1, 10, 35);

            ctx.fillStyle="#101010";
            ctx.fillText(text2, 13, 78);
            ctx.fillStyle="#F0B040";
            ctx.fillText(text2, 10, 70);
        },
        addVar: function(opts){
            let v = opts.value === undefined ? this._.selectOne(opts.path): opts.value;
            if (opts.number) {
                v = v || 0;
            }
            return opts.caption + v + " ";
        },
        draw: function() {
            // let spawned = this._.selectOneNumber(constants.path.DUDES_SPAWNED_COUNT);
            // let dead = this._.selectOneNumber(constants.path.DUDES_DEAD);
            // let goal = this._.selectOneNumber(constants.path.GOAL)
            // let escaped = this._.selectOneNumber(constants.path.DUDES_ESCAPED)
            // let level = this._.selectOne(constants.path.PLAYER_LEVEL)
            // let levelName = this._.selectOne(constants.path.LEVEL_NAME)
            //

            let txt = this.addVar({caption: "Level: ", value: lab.game.level });
            txt += this.addVar({caption: "    HP: ", value: Math.round(lab.camera.master.hp) });
            // txt2 += this.addVar({caption: "Goal: ", value:  escaped + "/" + goal });
            // txt2 += this.addVar({caption: " Walking: ", value:  spawned - escaped - dead });
            //
            this.txt(txt, "");
        }
    })
};

module.exports = playerInfo;
