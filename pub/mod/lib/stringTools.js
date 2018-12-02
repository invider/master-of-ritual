var stringTools = {
    upperFirstLetter: function jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    lowerFirstLetter: function jsUcfirst(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    }
};

module.exports = stringTools;