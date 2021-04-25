const df = {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
}

class CorpGroup extends dna.hud.Container {

    constructor(st) {
        super( augment({}, df, st) )
    }

    init() {
        let anchor = {
            rx: .25,
            ry: .75,
        }
        switch(this.team) {
            case 1:
                anchor = {
                    rx: .25,
                    ry: .75,
                }
                break
            case 2:
                anchor = {
                    rx: .75,
                    ry: .75,
                }
                break
        }
        anchor.name = 'stack'
        const s = this.spawn( dna.hud.Stack, anchor )
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
    }

    adjust() {
        super.adjust()
        this.x = 0
        this.y = 0
        this.w = rx(1)
        this.h = ry(1)
        //this.x = rx(this.rx)
        //this.y = ry(this.ry)
    }

    drawBackground() {}
}
