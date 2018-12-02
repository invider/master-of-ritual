
module.exports = {

    testWall: function(obj, x, y) {
        let collision = false
        let w = obj.aw
        let h = obj.ah
        
        lab.camera._ls.forEach(t => {
            if (t instanceof dna.levelWall 
                    // test on collision
                    && x+w/2 >= t.x-t.aw/2
                    && x-w/2 <= t.x+t.aw/2
                    && y+h/2 >= t.y-t.ah/2
                    && y-h/2 <= t.y+t.ah/2) {
                // got a hit
                collision = true
            }
        })
        return collision
    },

    evo: function(dt) {
        // go over all entities under the camera
        // and test for collisions
        let i = lab.camera.collide(function(s, t) {
                if (sys.isFun(s.hit)
                            && s._sizable
                            && s.x+s.aw/2 >= t.x-t.aw/2
                            && s.x-s.aw/2 <= t.x+t.aw/2
                            && s.y+s.ah/2 >= t.y-t.ah/2
                            && s.y-s.ah/2 <= t.y+t.ah/2) {
                    s.hit(t, dt)
                }
            },

            // filter out not collidable entities
            s => (!!s.collidable)
        )
    }
}
