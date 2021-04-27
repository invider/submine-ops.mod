// @depends(dna/hud/Sticky)
class Play extends dna.hud.Sticky {

    constructor(st) {
        super(st)
        this.ehFontH = 10
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

        } else if (env.state.phase === _.PLAY) {
            const assembly = this.corp.assembly
            if (!assembly) return
            const ls = assembly.cards
            if (ls.length === 0) return

            save()
            translate(this.x, this.y)

            // fuel
            const hFontSize = ctx.height * (env.style.playFontSize/100)
            font(hFontSize + 'px ' + env.style.fontFace)
            baseTop()
            alignCenter()
            fill('#ffff00')
            text('fuel:' + assembly.fuel, 0, 0)
            translate(0, -hFontSize)

            for (let i = ls.length - 1; i >= 0; i--) {
                const card = ls[i]
                const shift = card.drawHeader()
                translate(0, -shift)
            }

            restore()
        }
    }
}
