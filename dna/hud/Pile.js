const df = {
    pos: -1,
    x: 0,
    y: 0,
    rx: .1,
    ry: .1,

}

class Pile {

    constructor(st) {
        this.cards = []
        augment(this, df, st)
        mixin(this, dna.hud.TransitTrait)
    }

    adjust() {
        this.x = rx(this.rx)
        this.y = ry(this.ry)
        this.h = ry(.27)
        this.cards.forEach(card => card.adjust())
    }

    push(card) {
        this.cards.push(card)
        this.pos = this.cards.length - 1
        card.adjust()
    }

    cut(card) {
        if (!card) return
        const i = this.cards.indexOf(card)
        if (i >= 0) {
            this.cards.splice(i, 1)
            if (this.pos >= i) this.prev()
            return card
        }
    }

    drawContent() {
        throw 'not implemented'
    }

    evo(dt) {
        this.evoTransition(dt)
    }

    draw() {
        save()
        translate(this.x, this.y)

        alpha(this.alpha)
        this.drawContent()

        restore()
    }
}
