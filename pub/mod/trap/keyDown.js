module.exports = function(e) {
    switch(e.key.toString()) {
        case 'ArrowLeft': lab.camera.master.keys.left = true; break;
        case 'ArrowUp': lab.camera.master.keys.up = true; break;
        case 'ArrowRight': lab.camera.master.keys.right = true; break;
        case 'ArrowDown': lab.camera.master.keys.down = true; break;
        case '1': lab.camera.master.keys.spell1 = true; break;
        case '2': lab.camera.master.keys.spell2 = true; break;
        case 'm': lab.camera.master.keys.manapot = true; break;
        case 'h': lab.camera.master.keys.healingpot = true; break;
    }
};
