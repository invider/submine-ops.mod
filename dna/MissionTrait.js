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

    text('fuel: ' + this.fuel, x, y)

    for (const e of this.equip) {
        y += tFontSize
        text('* ' + e, x, y)
    }
}
