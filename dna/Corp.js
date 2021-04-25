const df = {
    bid: 0,
}

class Corp {

    constructor(st) {
        augment(this, df, st)
        this.credit = env.cfg.startCredit

        const group = lab.hud.spawn( dna.hud.CorpGroup, {
            corp: this,
            team: this.team,
            name: 'corp' + this.team,
        })
        this.stack = group.stack
    }

    pushCard(card) {
        this.stack.push( card )
    }

    playCard() {
        const card = this.stack.getSelected()
        if (card) {
            if (this.card) {
                // try to stack
            } else {
                this.stack.cut(card)
                this.card = card
            }
        } else {
            // missing card sfx
        }
    }

    startBidding() {
        this.bid = 0
    }

    increaseBid(step) {
        step = step || 1
        this.bid += step
        if (this.bid > this.credit) this.bid = this.credit
    }

    decreaseBid(step) {
        step = step || 1
        this.bid -= step
        if (this.bid < 0) this.bid = 0
    }

    handleTrade(action) {
        switch(action) {
            case _.UP:
            case _.LEFT:
                this.increaseBid()
                break

            case _.DOWN:
            case _.RIGHT:
                this.decreaseBid()
                break
        }
    }

    handlePlay(action) {
        switch(action) {
            case _.LEFT:  this.stack.prev(); break;
            case _.RIGHT: this.stack.next(); break;
            case _.USE:   this.playCard();   break;
        }
    }

    activate(action) {
        switch(env.state.phase) {
            case _.TRADE:
            case _.SELL:
                this.handleTrade(action)
                break
            case _.PLAY:
                this.handlePlay(action)
                break
        }
    }
}
