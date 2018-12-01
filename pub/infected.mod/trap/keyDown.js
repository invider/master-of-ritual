module.exports = function(e) {
    //log.out(e.code)
    if (!e.repeat) {
        if (lab.game.wait) {
            // waiting for the player to start the turn
            switch(e.code) {
                case 'Space': lab.game.nextPlayerTurn(); break;
            }
        } else {
            switch(e.code) {
            case 'KeyA': case 'ArrowLeft': lab.game.move(1); break;
            case 'KeyW': case 'ArrowUp': lab.game.move(2); break;
            case 'KeyD': case 'ArrowRight': lab.game.move(3); break;
            case 'KeyS': case 'ArrowDown': lab.game.move(4); break;
            case 'Space': lab.game.spacePressed(); break;
            case 'Comma': case 'KeyQ': lab.targetIsland.prevIsland(); break;
            case 'Period': case 'KeyE': lab.targetIsland.nextIsland(); break;
            case 'Enter': lab.game.enterPressed(); break;
            case 'ShiftRight': lab.game.control.player.slime(); break;
            }
        }
    }
}
