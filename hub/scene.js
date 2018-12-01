'use strict'
var storage = require('node-persist');

storage.init({
    dir:'./db/',
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,  // can also be custom logging function 
    continuous: true,
    interval: false, // milliseconds 
    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS 
})

var hub = (function() {

var MAX_TICK = 0.1

var lastTime = Date.now()

// global game state
var state = {
    tick: 0,
    data: 'something',
}

function evo(delta) {
    state.tick += delta
}

function update() {
    var now = Date.now()
    var delta = (now - lastTime)/1000
    lastTime = now

    while (delta > MAX_TICK) {
        evo(MAX_TICK)
        delta -= MAX_TICK
    }
    evo(delta)

    setTimeout(update, 25)
}

function store() {
    console.log('storing')
    storage.setItem('state', state)
    console.dir(state)
}

function load() {
    console.log('loading...')
    storage.getItem('state').then( function(val) {
        if (val) {
            console.log('loaded:')
            console.dir(val)
            state = val
        } else {
            console.log('no state loaded')
        }
    })
}

return {
    update: update,
    post: function(chan, msg) {
        var smsg = msg.slice(0, msg.length-1).toString()
        console.log('[' + chan + '] ' + smsg)
        if (smsg === 'save') {
            store()
        } else if (smsg === 'load') {
            load()
        } else {
            state.data = smsg
        }
        return '[@' + Math.round(state.tick) + '] ' + smsg + '\n'
    },
    state: function() {
        return state
    },
    load: load,
}
})()

// launch evolution
setTimeout(hub.update, 25)
hub.load()

module.exports = {
    post: hub.post,
    state: hub.state,
}
