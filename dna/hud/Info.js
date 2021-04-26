// @depends(dna/hud/Sticky)
const df = {
    x: 0,
    y: 0,
}

class Info extends dna.hud.Sticky {

    constructor(st) {
        super( augment({}, df, st) )
    }

    draw() {
        if (!this.corp) return

        const fsize = 24
        fill('#00ffff')
        font(fsize + 'px ' + env.style.fontFace)
        baseTop()
        alignCenter()
        text(
            'Fuel:' + this.corp.fuel
            + '  $' + this.corp.credit,
                this.x, this.y)

        fill('#ffff00')
        text(this.corp.name, this.x, this.y + fsize)
    }
}
