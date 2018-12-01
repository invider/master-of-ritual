module.exports = function(e) {
    switch(e.key) {
        case 'ArrowLeft': lab.camera.master.keys.left = true; break;
        case 'ArrowUp': lab.camera.master.keys.up = true; break;
        case 'ArrowRight': lab.camera.master.keys.right = true; break;
        case 'ArrowDown': lab.camera.master.keys.down = true; break;
    }
};
