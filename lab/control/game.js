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
}

function completeTrade() {
    env.state.phase = _.PLAY
}

function evo(dt) {
    switch(env.state.phase) {
        case _.TRADE:
            env.state.timer -= dt
            if (env.state.timer <= 0) this.completeTrade()
            break
    }
}
