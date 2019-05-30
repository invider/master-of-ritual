module.exports = function(e) {
    if (!lab.camera.master) return

    if (_.paused && e.code !== 'Digit8') {
        _.paused = false
        return
    }

    switch(e.code) {
        case 'KeyA': case 'ArrowLeft': lab.camera.master.keys.left = false; break;
        case 'KeyW': case 'ArrowUp': lab.camera.master.keys.up = false; break;
        case 'KeyD': case 'ArrowRight': lab.camera.master.keys.right = false; break;
        case 'KeyS': case 'ArrowDown': lab.camera.master.keys.down = false; break;
        case 'KeyP': _.paused = true; break;
    }
    lab.game.keyUp(e.key)
};
