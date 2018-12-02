var TYPEMAP = {
    '*': 'levelWall',
    'w': 'wall',
    '@': 'mob/Master',
    'z': 'mob/Zombie',
    'b': 'mob/Bat',
    'g': 'mob/Ghost',
    's': 'mob/Skeleton',
    'i': 'Item',
    'H': {proto:"Item", params: {itemType: "health_potion"}},
    'M': {proto:"Item", params: {itemType: "mana_potion"}},
    'W': {proto:"Item", params: {itemType: "wing"}},
    'B': {proto:"Item", params: {itemType: "blood"}},
    'E': {proto:"Item", params: {itemType: "eye"}},

    'A': 'altar'
};

let LevelLoader = {

    formatName: function (type) {
        return lib.stringTools.lowerFirstLetter(type.split("/").pop());
    },
    parseGoal: function(goal){
        let res = goal.split(":");
        lib.asserts.assertTrue(res.length == 2, "goal format is incorrect: " + goal)
        res[1] = res[1].trim();
        res[0] = res[0].trim();
        return res;
    },
    parseGoals:function(goals){
        let chunks = goals.split(",");
        let res = [];
        for (let k in chunks){
            let g = this.parseGoal(chunks[k]);
            res.push({type: g[0], count: g[1]});
        }
        return res;
    },

    loadFile: function(data){
        if (!data || !sys.isString(data)) {
            throw 'Unable to load level data: ' + data
        }

        let params = $.lib.levelParser.parse(data, (x, y, symbol, param) => {
            if (symbol == " ") {
                return;
            }
            let params = {
                x: x,
                y: y,
                w: 1,
                h: 1
            };
            let type = TYPEMAP[symbol];

            if (typeof TYPEMAP[symbol] !== "string") {
                type = TYPEMAP[symbol].proto;
                sys.augment(params, TYPEMAP[symbol].params);
            }
            params.name = params.name || this.formatName(type);
            sys.spawn(type, params, "camera");
        })

        // show the story
        params.settings.STORY && sys.spawn('text/scroll', {
            Z: 100,
            rx: 50,
            ry: 100,
            period: 1.5,
            time: 25,       // how long display each line
            fadein: 2.5,
            fadeout: 5,
            speed: -25,
            txt: res.txt[params.settings.STORY],
            align: 'center',
            font: '24px ' + env.tuning.textFont,
            color: '#60FF20',
        })
        if (!params.settings.FINAL){
            lib.asserts.assertTrue(params.settings.GOALS, "Goals not set for level")
            lab.camera.altar.goals = this.parseGoals(params.settings.GOALS);
        }
    }
};

module.exports = LevelLoader


