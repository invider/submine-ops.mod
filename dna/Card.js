const df = {
    title: 'A Card',
    text: 'Some valuable thingy',
    price: 1,
    background:  hsl(.57, .4,  .5),
    abackground: hsl(.57, .4,  .7),
    border:      hsl(.05, .25, .3),
    aborder:     hsl(.15, .5,  .4),
    ewBase:   17,
    ehFontH:  10,
    ehFontT:  8,
    eEdge:    10,
    textBase: 60,
    hwRatio: .7,
    x: 0,
    y: 0,
    w: 60,
    h: 100,
}

let id = 0
class Card {

    constructor(st) {
        this.id = ++id
        augment(this, df, st)

        if (this.type === 'random') {
            this.type = lib.math.rnde(dna.cards._ls).name
        }

        // mix in card type trait
        const typeTrait = dna.cards[this.type]
        if (!typeTrait) log.warn(`missing trait for card [${this.type}]`)
        augment(this, typeTrait)

        // set card type text info
        const typeText = dna.info[this.type]
        if (!typeText) log.warn(`missing text for card [${this.type}]`)
        else this.text = typeText
    }

    adjust() {
        this.w = ctx.height * (this.ewBase/100)
        this.h = this.w / this.hwRatio
    }

    // positioning must be done outside of this method
    drawHeader() {
        const hFontSize = this.h * (this.ehFontH/100)
        font(hFontSize + 'px ' + env.style.fontFace)
        baseTop()
        alignCenter()
        fill('#ffff00')
        text(this.title, 0, 0)
    }

    draw() {
        this.adjust()
        save()
        translate(this.x, this.y)
        clip(0, 0, this.w, this.h)

        if (this.back) fill(this.background)
        else fill(this.abackground)
        rect(0, 0, this.w, this.h)

        if (this.back) stroke(this.border)
        else stroke(this.aborder)
        lineWidth(4)
        rect(0, 0, this.w, this.h)

        const edge = this.w * (this.eEdge/100)
        const qedge = edge/4

        const hFontSize = this.h * (this.ehFontH/100)
        font(hFontSize + 'px ' + env.style.fontFace)

        fill('#000000')
        baseTop()
        alignLeft()
        text('#' + this.id, qedge, 0)

        alignRight()
        text('$' + this.price, this.w - qedge, 0)

        alignCenter()
        text(this.title, this.w/2, hFontSize)

        if (!this.words) {
            this.words = this.text.split(' ')
        }
        const tFontSize = this.h * (this.ehFontT/100)
        font(tFontSize + 'px ' + env.style.fontFace)
        alignLeft()

        const space = tFontSize * .5
        const limit = this.w - edge
        let x = edge
        let y = this.h * (this.textBase/100)
        let lineWords = 0

        for (const w of this.words) {
            const tw = textWidth(w)
            if (lineWords > 0 && x + tw > limit) {
                // line feed
                x = edge
                y += tFontSize
                lineWords = 0
            }
            text(w, x, y)
            x += tw + space
            lineWords ++
        }

        restore()
    }
}
