const df = {
    x: 0,
    y: 0,
    rx: .5,
    ry: .4,
}

class Trader {

    constructor(st) {
        augment(this, df, st)
        mixin(this, dna.hud.TransitTrait)
    }

    adjust() {
        this.x = rx(this.rx)
        this.y = ry(this.ry)
    }

    newTrade(card) {
        this.card = card || new dna.Card({ type: 'random' })
    }

    minPrice() {
        if (!this.card) return 0
        return this.card.price
    }

    evo(dt) {
        this.evoTransition(dt)
    }

    drawContent() {
        this.card.x = -this.card.w/2
        this.card.y = -this.card.h/2
        this.card.draw()
    }

    draw() {
        if (env.state.phase !== _.TRADE && env.state.phase !== _.SELL) return
        if (!this.card) return

        save()
        translate(this.x, this.y)

        alpha(this.alpha)
        this.drawContent()

        restore()
    }
}
