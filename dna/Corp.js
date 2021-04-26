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
    }

    pushCard(card) {
        this.stack.push( card )
    }

    playCard() {
        if (this.moves > 0) {
            // TODO play denied sfx
            log('no more!')
            return
        }

        const card = this.stack.getSelected()
        if (card) {
            if (this.assembly.join(card)) {
                this.stack.cut(card)
            }
        } else {
            // missing card sfx
        }
        this.moves ++
        lab.control.game.endTurn()
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
        if (this.assembly.refuel(1) > 0) {
            this.fuel --
        }
    }

    defuel() {
        this.fuel += this.assembly.defuel(1)
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
