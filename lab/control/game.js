function clear() {
    lab._ls.forEach(e => {
        if (!e.transient) kill(e)
    })
}

function nextTurn() {
    env.state.turn ++
    log('TURN: ' + env.state.turn)
    this.trade()
}

function trade() {
    env.state.phase = _.TRADE
    env.state.timer = env.cfg.tradeTime
    lab.hud.trader.newTrade()
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

    return winner
}

function completeTrade() {
    const winner = this.bidWinner()
    if (winner) {
        log('winner: ' + winner.name)
        // complete transaction
        winner.credit -= winner.bid

        const card = new dna.Card({
            type: 'random',
            price: winner.bid,
        })
        winner.pushCard( card )
        log('new card: ' + card.title)
        winner.bid = 0

    } else {
        log('no winner')
    }

    env.state.phase = _.PLAY
    env.state.timer = env.cfg.playTime
}

function completePlay() {
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
