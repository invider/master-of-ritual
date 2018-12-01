return function() {
    log.debug('building UI')

    // core layout
    sys.spawn('hud/Hud')

    let panel = lab.hud.attach(new dna.hud.Container({
        name: 'panel', x: 50, y: 50, w: 500, h: 300
    }))

    let l1 = sys.spawn('hud/Label', {
        name: 'label1', x: 0, y: 0, text: 'hello here from label',
    })

    let l2 = lab.hud.panel.attach(new dna.hud.Label('something is going on...'))

    l2.x = 300
    l2.y = 100
    l2.onClick = function() {
        this.on = !this.on
        if (this.on) {
            this.color = '#FF0000'
        } else {
            this.color = dna.hud.preset.color
        }
    }

    let b1 = sys.spawn('hud/Button', {
        x: 200,
        y: 150,
        onClick: function() {
            log.out('click on button')
        }
    })
}
