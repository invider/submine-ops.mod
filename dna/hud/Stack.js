// @depends(dna/hud/Pile)

let id = 0
class Stack extends dna.hud.Pile {

    constructor(st) {
        super(st)
        //this.cards = []
        //augment(this, df, st)
    }

    onNewCard() {
        this.pos = this.cards.length - 1
    }

    getSelected() {
        return this.cards[this.pos]
    }

    cutSelected() {
        const card = this.cards[this.pos]
        return this.cut(card)
    }

    next() {
        this.pos ++
        if (this.pos >= this.cards.length) this.pos = 0
    }

    prev() {
        this.pos --
        if (this.pos < 0) this.pos = this.cards.length - 1
    }

    getPrev() {
        if (this.pos < 0) return null
        else if (this.pos === 0) return this.cards[ this.cards.length - 1 ]
        else return this.cards[ this.pos - 1 ]
    }

    getCur() {
        if (this.pos >= 0) return this.cards[ this.pos ]
        else return null
    }

    getNext() {
        if (this.pos === this.cards.length - 1) return this.cards[0]
        return this.cards[ this.pos + 1 ]
    }

    drawContent() {
        // position the cards
        const left = this.getPrev()
        const center = this.getCur()
        const right = this.getNext()

        if (right && (left !== right)) {
            right.back = true
            right.x = right.w * .1
            right.y = -right.h * .4
            right.draw()
        }

        if (left && (left !== center)) {
            left.back = true
            left.x = -left.w * 1.1
            left.y = -left.h * .4
            left.draw()
        }

        if (center) {
            center.back = false
            center.x = -center.w/2
            center.y = -center.h/2
            center.draw()
        }
    }
}
