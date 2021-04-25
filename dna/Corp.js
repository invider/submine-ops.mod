class Corp {

    constructor(st) {
        augment(this, st)

        const group = lab.hud.spawn( dna.hud.CorpGroup, {
            corp: this,
            team: this.team,
            name: 'corp' + this.team,
        })
        this.stack = group.stack
    }

    activate(action) {
        switch(action) {
            case _.LEFT:  this.stack.prev(); break;
            case _.RIGHT: this.stack.next(); break;
        }
    }
}
