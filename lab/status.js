function draw() {
    if (!env.state) return

    fill('#00ffff')
    font('32px ' + env.style.fontFace)
    baseTop()

    alignRight()
    text('Turn: ' + env.state.turn, rx(1) - 10, 10)
}
