function clear() {
    lab._ls.forEach(e => {
        if (!e.transient) kill(e)
    })
}

function nextTurn() {
    env.state.turn ++
    log('TURN: ' + env.state.turn)
    this.trade()
    sfx(res.sfx.pressurePlate, .9)
}

function endTurn() {
    const ready = lab.corp._ls.reduce((i, e) => {
        if (e.readyToTurn()) return i + 1
        else return i
    }, 0)

    log('total ready: ' + ready)
    if (ready === lab.corp._ls.length) {
        this.completePlay()
    }
}

function trade() {
    env.state.phase = _.TRADE
    env.state.timer = env.cfg.tradeTime
    lab.hud.missions.hide()
    lab.hud.trader.newTrade()
    lab.hud.trader.show()
}

function estimateBid(bid) {
    if (bid === 0) return -1
    if (bid < lab.hud.trader.minPrice()) return -1

    let players = 0
    for (const e of lab.corp._ls) {
        if (e.bid > bid) return -1
        if (e.bid === bid) players ++
    }
    if (players > 1) return 0
    else return 1
}

function bidWinner() {
    let max = 0
    let winner = null
    for (const corp of lab.corp._ls) {
        if (corp.bid > max) {
            max = corp.bid
            winner = corp
        } else if (corp.bid === max) {
            // found another player with the same bid
            winner = null
        }
    }
    if (winner && winner.bid < lab.hud.trader.minPrice()) winner = null
    if (winner && winner.bid > winner.credit) winner = null

    return winner
}

function completeTrade() {
    const winner = this.bidWinner()
    if (winner) {
        log('winner: ' + winner.name)
        // complete transaction
        winner.credit -= winner.bid

        const card = lab.hud.trader.card
        card.price = winner.bid
        winner.pushCard( card )
        log('new card: ' + card.title)
        winner.bid = 0

    } else {
        log('no winner')
        // TODO return the card to the previous owner if needed
    }

    this.play()
}

function play() {
    for (const corp of lab.corp._ls) {
        corp.moves = 0
    }
    env.state.phase = _.PLAY
    env.state.timer = env.cfg.playTime
    lab.hud.missions.show()
    sfx(res.sfx.message,.9)
}

function doMissions() {
    for (const corp of lab.corp._ls) {
        corp.attemptMission()
    }
    lab.hud.missions.refreshMissions()
}

function newMissions() {
    lab.hud.missions.newMissions()
}

function completePlay() {
    this.doMissions()
    this.nextTurn()
}

function evo(dt) {
    switch(env.state.phase) {
        case _.TRADE:
            env.state.timer -= dt
            if (env.state.timer <= 0) this.completeTrade()
            break
        case _.PLAY:
            env.state.timer -= dt
            if (env.state.timer <= 0) this.completePlay()
            break
    }
}
