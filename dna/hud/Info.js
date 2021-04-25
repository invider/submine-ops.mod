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

        fill('#00ffff')
        font('24px ' + env.style.fontFace)
        baseTop()
        alignCenter()
        text('$' + this.corp.credit, this.x, this.y)
    }
}
