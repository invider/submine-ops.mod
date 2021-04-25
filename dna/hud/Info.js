const df = {
    x: 0,
    y: 0,
}

class Info {

    constructor(st) {
        augment(this, df, st)
    }

    adjust() {
        switch(this.stick) {
            case 'bottom':
                this.x = this.anchor.x
                this.y = this.anchor.y + this.anchor.h * .6
                break
        }
    }

    draw() {
        if (!this.corp) return

        fill('#00ffff')
        font('24px ' + env.style.fontFace)
        baseTop()
        alignCenter()
        text('$' + this.corp.credit, this.x, this.y)
    }
}
