const df = {
    bid: 0,
    fuel: 100,
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
        this.nextAssembly()
    }

    nextAssembly() {
        this.assembly = new dna.Assembly({
            corp: this,
        })
    }

    attemptMission() {
        const missions = lab.hud.missions.cards

        let mission = null
        for (const m of missions) {
            if (this.assembly.matchMission(m)) {
                mission = m
            }
        }

        if (mission) {
            // found a suitable mission!
            this.completeMission(mission)
        }
    }

    completeMission(mission) {
        log('do mission: ' + mission.title)
        lab.hud.missions.cut(mission)
        log('+' + mission.reward)
        this.credit += mission.reward
        this.nextAssembly()
        defer(() => {
            sfx(res.sfx.launch, 1)
        }, rnd() * .5)
    }

    pushCard(card) {
        if (card.ghost) {
            card.onJoinedCorp(this)
        } else {
            this.stack.push( card )
        }
    }

    playCard() {
        if (this.moves > 0) {
            // TODO play denied sfx
            sfx(res.sfx.denied, .5)
            return
        }

        const card = this.stack.getSelected()
        if (card) {
            if (this.assembly.join(card)) {
                this.stack.cut(card)
                this.moves ++
                lab.control.game.endTurn()
            }
        } else {
            // missing card sfx
        }
    }

    readyToTurn() {
        return (this.moves > 0)
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

    refuel() {
        if (this.fuel < 1) return

        const qty = 1
        const left = this.assembly.refuel(qty)
        this.fuel -= (qty - left)
    }

    defuel() {
        const qty = 1
        this.fuel += this.assembly.defuel(qty)
    }

    handleTrade(action) {
        switch(action) {
            case _.UP:
            case _.RIGHT:
                this.increaseBid()
                break

            case _.DOWN:
            case _.LEFT:
                this.decreaseBid()
                break
        }
    }

    handlePlay(action) {
        switch(action) {
            case _.LEFT:  this.stack.prev(); break;
            case _.RIGHT: this.stack.next(); break;
            case _.UP:    this.refuel();     break;
            case _.DOWN:  this.defuel();     break;
            case _.USE:   this.playCard();   break;
        }
    }

    act(action) {
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
