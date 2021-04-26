
const textBase = 30

function drawBody() {
    const edge = this.w * (this.eEdge/100)
    const tFontSize = this.h * (this.ehFontT/100)
    font(tFontSize + 'px ' + env.style.fontFace)
    alignLeft()


    const space = tFontSize * .5
    const limit = this.w - edge
    let x = edge
    let y = this.h * (this.textBase/100)
    let lineWords = 0

    text('* some', x, y)

    /*
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
    */
}
