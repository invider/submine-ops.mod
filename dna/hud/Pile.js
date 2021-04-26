const df = {
    pos: -1,
    x: 0,
    y: 0,
    rx: .1,
    ry: .1,
}

class Pile {

    constructor(st) {
        augment(this, df, st)
        mixin(this, dna.CardSetTrait)
        mixin(this, dna.hud.TransitTrait)
    }

    adjust() {
        this.x = rx(this.rx)
        this.y = ry(this.ry)
        this.h = ry(.27)
        this.cards.forEach(card => card.adjust())
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
