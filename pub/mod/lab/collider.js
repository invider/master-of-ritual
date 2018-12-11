
module.exports = {

    testWall: function(obj, x, y) {
        let collision = false
        let w = obj.aw
        let h = obj.ah
        
        lab.camera._ls.forEach(t => {
            if (t !== obj
                    && t.solid
                    && !t.either
                    && (t instanceof dna.levelWall
                        || t instanceof dna.Mob
                        || t instanceof dna.mob.Master)
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

    touch: function(x, y) {
        let res = []
        lab.camera._ls.forEach(e => {
            if (e._sizable
                    && e.x+e.aw/2 >= x
                    && e.x-e.aw/2 <= x
                    && e.y+e.ah/2 >= y
                    && e.y-e.ah/2 <= y) {
                res.push(e)
            }
        })
        return res
    },

    evo: function(dt) {
        // go over all entities under the camera
        // and test for collisions
        let i = lab.camera.collide(function(s, t) {
                if (s.alive && t.alive && sys.isFun(s.hit)
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
