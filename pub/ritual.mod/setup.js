
const CAMERA_ZOOM = 128

module.exports = function() {
    log.out('setting up')

    sys.spawn('SlideCamera', {
        name: 'camera',
        Z: 10,
        x: 0,
        y: 0,
        scale: CAMERA_ZOOM,
        speed: 8*CAMERA_ZOOM,
        keys: [],
    })

    // inject camera keyboard control
    sys.after(lab.camera, 'evo', function(dt) {
        if (this.keys[0]) this.x -= (this.speed/this.scale) * dt
        else if (this.keys[1]) this.y -= (this.speed/this.scale) * dt
        else if (this.keys[2]) this.x += (this.speed/this.scale) * dt
        else if (this.keys[3]) this.y += (this.speed/this.scale) * dt
    })

    lab.game.nextLevel();

    sys.spawn('playerInfo', {
       x: 10,
       y: 10
    });

    sys.spawn('Grid', {
        color: '#ff7080',
        x1: 0,
        x2: 20,
        y1: 0,
        y2: 10,
        step: 2,
        w: 0.01,
        h: 0.01,
        th: 0.1,
        coordinates: true,
        font: '0.1px zekton'
    }, 'camera')

    // camera view crosshair
    sys.spawn('Grid', {
        color: '#505050',
        x1: 50,
        x2: ctx.width,
        y1: 50,
        y2: ctx.height,
        step: 150,
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
    // camera view crosshair
    sys.spawn('menu', {
        x:10,
        y:10,
        w:800,
        h:100
    });

    lab.camera.target = lab.camera.master

    env.debug = true
}
