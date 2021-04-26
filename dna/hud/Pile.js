const VISIBLE = 1
const HIDING  = 2
const HIDDEN  = 3
const SHOWING = 4

const df = {
    pos: -1,
    x: 0,
    y: 0,
    rx: .1,
    ry: .1,

    state: 0,
    alpha: 0,
    hidden: true,
    fadeFactor: 1,
}

class Pile {

    constructor(st) {
        this.cards = []
        augment(this, df, st)
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

    show() {
        if (this.hidden === false) return
        this.hidden = false
        this.state = SHOWING
    }

    hide() {
        if (this.hidden = true) return
        this.state = HIDING
    }

    evo(dt) {
        switch(this.state) {
            case HIDING:
                this.alpha -= dt * this.fadeFactor
                if (this.alpha <= 0) {
                    this.alpha = 0
                    this.hidden = true
                    this.state = HIDDEN
                }
                break
            case SHOWING:
                this.alpha += dt * this.fadeFactor
                if (this.alpha >= 1) {
                    this.alpha = 1
                    this.state = VISIBLE
                }
                break
        }
    }

    draw() {
        save()
        translate(this.x, this.y)

        alpha(this.alpha)
        this.drawContent()

        restore()
    }
}
