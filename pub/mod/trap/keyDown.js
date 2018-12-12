let shots = 0

module.exports = function(e) {
    if (!lab.camera.master) return

    switch(e.code) {
        case 'KeyA': case 'ArrowLeft': lab.camera.master.keys.left = true; break;
        case 'KeyW': case 'ArrowUp': lab.camera.master.keys.up = true; break;
        case 'KeyD': case 'ArrowRight': lab.camera.master.keys.right = true; break;
        case 'KeyS': case 'ArrowDown': lab.camera.master.keys.down = true; break;
        case 'Digit1':
        case 'Space':
        case 'KeyX':
        case 'KeyC': lab.camera.master.keys.spell1 = true; break;
        case 'KeyZ':
        case 'Digit2':
        case 'ShiftLeft':
        case 'ShiftRight': lab.camera.master.keys.spell2 = true; break;
        case 'KeyM': case 'KeyE': lab.camera.master.keys.manapot = true; break;
        case 'KeyH': case 'KeyQ': lab.camera.master.keys.healingpot = true; break;

        case 'Digit8':
            if (!e.repeat) {
                lib.img.screenshot('ritual-' + (++shots))
            }
            break;
    }
};
