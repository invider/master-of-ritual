module.exports = function(e) {
    switch(e.key) {
    case 'a': lab.camera.keys[0] = true; break;
    case 'w': lab.camera.keys[1] = true; break;
    case 'd': lab.camera.keys[2] = true; break;
    case 's': lab.camera.keys[3] = true; break;
    case 'ArrowLeft': lab.Master.keys[0] = true; break;
    case 'ArrowUp': lab.Master.keys[1] = true; break;
    case 'ArrowRight': lab.Master.keys[2] = true; break;
    case 'ArrowDown': lab.Master.keys[3] = true; break;
    }
}
