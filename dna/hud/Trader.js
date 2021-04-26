const df = {
    x: 0,
    y: 0,
    rx: .5,
    ry: .4,
}

class Trader {

    constructor(st) {
        augment(this, df, st)
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

    draw() {
        if (env.state.phase !== _.TRADE && env.state.phase !== _.SELL) return
        if (!this.card) return

        this.card.x = this.x - this.card.w/2
        this.card.y = this.y - this.card.h/2
        this.card.draw()
    }
}
