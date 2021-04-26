const VISIBLE = 1
const HIDING  = 2
const HIDDEN  = 3
const SHOWING = 4

function onMixin() {
    this.hidden = true
    this.alpha = 0
    this.fadeFactor = 1
    this.state = 0
}

function show() {
    if (this.hidden === false) return
    this.hidden = false
    this.state = SHOWING
}

function hide() {
    if (this.hidden = true) return
    this.state = HIDING
}

function evoTransition(dt) {
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
