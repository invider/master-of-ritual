module.exports = function(e) {
    if (!lab.camera.master) return

    switch(e.key.toString()) {
        case 'a': case 'ArrowLeft': lab.camera.master.keys.left = true; break;
        case 'w': case 'ArrowUp': lab.camera.master.keys.up = true; break;
        case 'd': case 'ArrowRight': lab.camera.master.keys.right = true; break;
        case 's': case 'ArrowDown': lab.camera.master.keys.down = true; break;
        case '1': case ' ': lab.camera.master.keys.spell1 = true; break;
        case '2': case 'Shift': lab.camera.master.keys.spell2 = true; break;
        case 'm': lab.camera.master.keys.manapot = true; break;
        case 'h': lab.camera.master.keys.healingpot = true; break;
    }
};
