module.exports = function() {
    log.out('setting up')

    sys.spawn('SlideCamera', {
        name: 'camera',
        x: 0,
        y: 0,
        scale: 32,
        speed: 100,
        keys: [],
    })

    // inject camera keyboard control
    sys.after(lab.camera, 'evo', function(dt) {
        if (this.keys[0]) this.x -= (this.speed/this.scale) * dt
        else if (this.keys[1]) this.y -= (this.speed/this.scale) * dt
        else if (this.keys[2]) this.x += (this.speed/this.scale) * dt
        else if (this.keys[3]) this.y += (this.speed/this.scale) * dt
    })

    lib.levelLoader.loadFile(res.levels[1])
    lab.game.nextLevel();

    sys.spawn('playerInfo', {
       x: 10,
       y: 10
    });

    sys.spawn('Grid', {
        color: '#ff7080',
        top: 100,
        x1: -10,
        x1: 10,
        y1: -10,
        y2: 10,
        step: 1,
        coordinates: true,
        font: '5px zekton'
    }, 'camera')

    sys.spawn('Grid', {
        color: '#505050',
        x1: 0,
        x2: ctx.width,
        y1: 0,
        y2: ctx.height,
        step: 100,
        style: 'target',
    })

    // show the story
    sys.spawn('text/scroll', {
        Z: 100,
        rx: 50,
        ry: 90,
        period: 2.5,
        time: 25,       // how long display each line
        fadein: 2.5,
        fadeout: 5,
        speed: -25,
        txt: res.story,
        font: '14px Zekton',
        color: '#60FF20',
    })
}
