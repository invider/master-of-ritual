'use strict'

let CharacterPlayer = function(st) {
    dna.Character.call(this, st);
}

sys.extend(CharacterPlayer, dna.Character);

module.exports = CharacterPlayer;
