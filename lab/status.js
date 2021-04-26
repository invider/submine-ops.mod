const transient = true

function draw() {
    if (!env.state) return

    fill('#00ffff')
    font('32px ' + env.style.fontFace)
    baseTop()

    alignRight()
    text('Turn: ' + env.state.turn, rx(1) - 10, 10)

    let st = 'unknown'
    let est = 0
    switch (env.state.phase) {
        case _.TRADE:
            st = 'trade'
            est = ceil(env.state.timer)
            break
        case _.PLAY:
            st = 'play your cards'
            est = ceil(env.state.timer)
            break
    }
    alignCenter()
    text(st, rx(.5), 10)
    text('' + est, rx(.5), 40)
}
