/** @typedef {{x:number, y:number}} EntityCoordinates */
/** @typedef {{x:number, y:number, width: number, height:number}} Entity */
var geometry = {
    /**
     * function returns offset, which can be used to move inner element in outer element, to center inner element in the outer
     * @param outerWidth
     * @param outerHeight
     * @param innerWidth
     * @param innerHeight
     * @returns {EntityCoordinates}
     */
    getOffsetToCenterInner: function(outerWidth, outerHeight, innerWidth, innerHeight){
        lib.asserts.assertTrue(outerWidth >= innerWidth, `Outer width must be more then inner ${outerWidth} > ${innerWidth}`);
        lib.asserts.assertTrue(outerHeight >= innerHeight, `Outer height must be more then inner ${outerHeight} > ${innerHeight}`);
        return {
            x: (outerWidth - innerWidth) / 2,
            y: (outerHeight - innerHeight) / 2
        }
    }
};

module.exports = geometry;