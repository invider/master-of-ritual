module.exports = function(e) {

    let tx = lab.camera.worldX(e.x)
    let ty = lab.camera.worldY(e.y)
    let sx = lab.camera.screenX(tx)
    let sy = lab.camera.screenY(ty)

    env.status = '' + e.x + 'x' + e.y + ' -> '
        + Math.round(tx) + 'x'
        + Math.round(ty)
        + ' -> '
        + Math.round(sx) + 'x'
        + Math.round(sy)

    lab.camera.target = {
        x: tx,
        y: ty,
    }

    let ls = lab.collider.touch(tx, ty)
    ls.forEach(e => console.dir(e))
}
