
module.exports = {

    evo: function(dt) {
        // go over all entities under the camera
        // and test for collisions
        let i = lab.camera.collide(function(s, t) {
                if (sys.isFun(s.hit)
                            && s._sizable
                            && s.x+s.w/2 >= t.x-t.w/2
                            && s.x-s.w/2 <= t.x+t.w/2
                            && s.y+s.h/2 >= t.y-t.h/2
                            && s.y-s.h/2 <= t.y+t.h/2) {
                    s.hit(t)
                }
            },

            // filter out not collidable entities
            s => (!!s.collidable)
        )
    }
}
