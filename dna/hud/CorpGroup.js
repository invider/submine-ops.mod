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
        augment(this, anchor)

        anchor.name = 'stack'
        const s = this.spawn( dna.hud.Stack, anchor )
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))
        s.push( new dna.Card({ type: 'random' }))

        this.spawn( dna.hud.Info, {
            corp: this.corp,
            stick: 'bottom',
            anchor: s,
        })
    }

    adjust() {
        this.x = 0
        this.y = 0
        this.w = ctx.width
        this.h = ctx.height
        super.adjust()
    }

    drawBackground() {}
}
