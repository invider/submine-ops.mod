const df = {
    pos: -1,
    x: 0,
    y: 0,
    rx: .1,
    ry: .1,
}

let id = 0
class Stack {

    constructor(st) {
        this.name = 'stack' + (++id)
        this.cards = []
        augment(this, df, st)
    }

    adjust() {
        this.x = rx(this.rx)
        this.y = ry(this.ry)
    }

    push(card) {
        this.cards.push(card)
        this.pos = this.cards.length - 1
    }

    getPrev() {
        if (this.pos > 0) return this.cards[ this.pos - 1 ]
        else if (this.pos === -1 && this.cards.length > 0) return this.cards[ this.cards.length - 1 ]
        else return null
    }

    getCur() {
        if (this.pos >= 0) return this.cards[ this.pos ]
        else return null
    }

    getNext() {
        return this.cards[ this.pos + 1 ]
    }

    draw() {
        // position the cards
        const left = this.getPrev()
        const center = this.getCur()
        const right = this.getNext()

        if (right) {
            right.back = true
            right.x = this.x + right.w
            right.y = this.y - right.h * .4
            right.draw()
        }

        if (left) {
            left.back = true
            left.x = this.x - left.w
            left.y = this.y - left.h * .4
            left.draw()
        }

        if (center) {
            center.back = false
            center.x = this.x - center.w/2
            center.y = this.y - center.h/2
            center.draw()
        }

        fill('#ff0000')
        circle(this.x, this.y, 2)
    }
}
