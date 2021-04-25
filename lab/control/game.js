function clear() {
    lab._ls.forEach(e => {
        if (!e.transient) kill(e)
    })
}

function nextTurn() {
    env.state.turn ++
    log('TURN: ' + env.state.turn)
}
