// @depends(dna/hud/Pile)
const df = {
    edge: .05,
    gap: .01,
    rx: .5,
    ry: .5,
    cardWidth: 1,
}

class Row extends dna.hud.Pile {

    constructor(st) {
        super( augment({}, df, st) )
    }

    onNewCard(card) {
        this.cardWidth = card.w
    }

    adjust() {
        super.adjust()
        if (this.cards.length > 0) {
            this.cardWidth = this.cards[0].w
        }
    }

    drawContent() {
        const gap = rx(this.gap)

        let x = -(this.cards.length * this.cardWidth)/2

        for (let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i]
            card.back = true
            card.x = x
            card.y = -card.h * .5
            card.draw()

            x += card.w + gap
        }
    }
}
