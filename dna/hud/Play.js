// @depends(dna/hud/Sticky)
class Play extends dna.hud.Sticky {

    constructor(st) {
        super(st)
    }

    draw() {
        if (!this.corp) return

        if (env.state.phase === _.TRADE || env.state.phase === _.SELL) {
            const est = lab.control.game.estimateBid( this.corp.bid )

            if (est < 0) fill('#ff0000')
            else if (est === 0) fill('#ffff00')
            else fill('#00ff00')

            font('24px ' + env.style.fontFace)
            baseTop()
            alignCenter()
            text('$' + this.corp.bid, this.x, this.y)
        }
    }
}
