module.exports = function() {
    log.out('setting up')

    /*
    sys.spawn('SlideCamera', {
        name: 'camera',
        x: 0,
        y: 0,
        keys: [],
    })

    // inject camera keyboard control
    sys.after(lab.camera, 'evo', function(dt) {
        if (this.keys[0]) this.x -= (this.speed/this.scale) * dt
        else if (this.keys[1]) this.y -= (this.speed/this.scale) * dt
        else if (this.keys[2]) this.x += (this.speed/this.scale) * dt
        else if (this.keys[3]) this.y += (this.speed/this.scale) * dt
    })
    */

    // sys.spawn('Tiles', {
    //     x: 0,
    //     y: 0,
    //     map: res.tiles,
    //     set: res.tileMapping,
    //     viewport: function() {
    //         return lab.camera.getViewport()
    //     }
    // }, 'camera')
    //
    // sys.spawn('Sprite', {
    //     name: 'hero',
    //     tiles: res.sprite,
    //     x: 0,
    //     y: 0,
    //     w: 128,
    //     h: 128,
    //     startTilex: 0,
    //     endTilex: 5,
    //     framerate: 9,
    // }, 'camera')

    /*
    sys.spawn('Grid', {
        color: '#ff7080',
        top: 2000,
        step: 100,
        coordinates: false,
    }, '')
    */

    //
    // sys.spawn('Island', {
    //     //Z: 1000,
    //     x: 30,
    //     y: 30,
    //     width: 100,
    //     height:100
    // }, 'camera');

    sys.spawn('Game', {
        name: 'game'
    });

    sys.spawn('monitors/EnemyIslandMonitor', {
        name: 'targetIsland',
        Z: 20,
        x: ctx.width/2 - 200,
        y: 50,
        width: 600,
        height:500
    }, '');
    sys.spawn('monitors/MyIslandMonitor', {
        name: 'myIsland',
        Z: 20,
        x: ctx.width/2 - 200,
        y: ctx.height/2,
        width: 600,
        height:500
    }, '');
    lab.targetIsland.nextIsland()

    sys.spawn('IslandsList', {
        name: 'islandsList',
        x: 10,
        y: 50,
        width: 60,
        height: ctx.height-100,
    }, '');

    sys.spawn('SporesIndicator', {
        name: 'sporesIndicator',
        Z: 10,
        x: ctx.width-320,
        y: ctx.height-80,
        width: 300,
        height: 60 
    }, '');

    sys.spawn('PriceList', {
        name: 'priceList',
        Z: 10,
        x: ctx.width - 320,
        y: 50,
        width: 300,
        height: ctx.height - 150 
    }, '');

    // show the story
    sys.spawn('text/scroll', {
        Z: 100,
        rx: 10,
        ry: 90,
        period: 1.5,
        time: 5,       // how long display each line
        fadein: 1.5,
        fadeout: 2,
        speed: -30,
        txt: res.story,
        font: '20px Zekton',
        color: '#FFFF20',
    })

    env.sfxVolume = 0.7
}
