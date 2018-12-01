'use strict'

let CharacterMob = function(st) {
    dna.Character.call(this, st);
}

sys.extend(CharacterMob, dna.Character);

module.exports = CharacterMob;
