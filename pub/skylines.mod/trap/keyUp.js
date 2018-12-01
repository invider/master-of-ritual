module.exports = function(e) {
    if (_.paused) {
        _.paused = false
        return
    }

    switch(e.code) {
    case 'Space': lab.gun.fire(); break;
    case 'ShiftRight':
    case 'ShiftLeft':
            lab.gun.unhold(); break;
    case 'ArrowLeft': case 'KeyA': lab.gun.stop(1); break;
    case 'ArrowRight': case 'KeyD': lab.gun.stop(2); break;
    case 'ArrowUp': lab.gun.prev(false); break;
    case 'ArrowDown': case 'KeyE': lab.gun.next(false); break;

    case 'Comma':
            lab.camControls.stop(lab.camControls.left);
            lab.camControls.center();
            break;
    case 'Period':
            lab.camControls.stop(lab.camControls.right);
            lab.camControls.center();
            break;

    case 'BracketLeft': lab.panel.volumeDown(false); break;
    case 'BracketRight': lab.panel.volumeUp(false); break;
    case 'KeyP': _.paused = true; break;
    case 'Escape': trap.echo('start'); break;

    }
}
