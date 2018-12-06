module.exports = function(e) {
    if (!lab.camera.master) return

    switch(e.key) {
        case 'a': case 'ArrowLeft': lab.camera.master.keys.left = false; break;
        case 'w': case 'ArrowUp': lab.camera.master.keys.up = false; break;
        case 'd': case 'ArrowRight': lab.camera.master.keys.right = false; break;
        case 's': case 'ArrowDown': lab.camera.master.keys.down = false; break;
        // case '1': lab.camera.master.keys.spell1 = false; break;
        // case '2': lab.camera.master.keys.spell2 = false; break;
    }
    lab.game.keyUp(e.key)

};
