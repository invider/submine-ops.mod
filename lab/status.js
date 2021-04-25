const transient = true

function draw() {
    if (!env.state) return

    fill('#00ffff')
    font('32px ' + env.style.fontFace)
    baseTop()

    alignRight()
    text('Turn: ' + env.state.turn, rx(1) - 10, 10)

    let st = 'unknown'
    switch (env.state.phase) {
        case _.TRADE:
            st = 'trade: ' + ceil(env.state.timer)
            break
        case _.PLAY:
            st = 'play your cards'
            break
    }
    alignCenter()
    text(st, rx(.5), 10)
}
