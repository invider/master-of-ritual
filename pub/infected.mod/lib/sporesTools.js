var sporesTools = {
    sporeTypeFromTypeName: function(name){
        return dna.Spore.TYPE[name]
    },
    sporeTypeNameFromType: function(type){
        return dna.Spore.TYPENAMES[type]
    }
};

module.exports = sporesTools;