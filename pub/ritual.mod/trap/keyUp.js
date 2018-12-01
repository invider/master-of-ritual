module.exports = function(e) {
    switch(e.key) {
        case 'ArrowLeft': lab.camera.master.keys.left = false; break;
        case 'ArrowUp': lab.camera.master.keys.up = false; break;
        case 'ArrowRight': lab.camera.master.keys.right = false; break;
        case 'ArrowDown': lab.camera.master.keys.down = false; break;
    }
};
