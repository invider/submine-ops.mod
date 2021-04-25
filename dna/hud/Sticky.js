class Sticky {

    constructor(st) {
        augment(this, st)
    }

    adjust() {
        switch(this.stick) {
            case 'top':
                this.x = this.anchor.x
                this.y = this.anchor.y - this.anchor.h * .6
                break
            case 'bottom':
                this.x = this.anchor.x
                this.y = this.anchor.y + this.anchor.h * .6
                break
        }
    }

}
