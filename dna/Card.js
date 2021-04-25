const df = {
    title: 'A Card',
    text: 'Some valuable thingy',
    background: hsl(.57, .4, .7),
    ewBase:   15,
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

class Card {

    constructor(st) {
        augment(this, df, st)
    }

    adjust() {
        this.w = ctx.width * (this.ewBase/100)
        this.h = this.w / this.hwRatio
    }

    draw() {
        this.adjust()
        save()
        translate(this.x, this.y)
        clip(0, 0, this.w, this.h)

        fill(this.background)
        rect(0, 0, this.w, this.h)

        const edge = this.w * (this.eEdge/100)

        const hFontSize = this.h * (this.ehFontH/100)
        font(hFontSize + 'px ' + env.style.fontFace)
        baseTop()
        alignCenter()
        fill('#000000')
        text(this.title, this.w/2, edge)

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
