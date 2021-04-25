function newGame() {
    // setup a new game
    env.state = {
        turn: 0,
        phase: _.SETUP,
    }
    lab.control.transient = true
    lab.control.game.clear()

    const hud = lab.spawn( dna.hud.Hud, {
        name: 'hud',
    })


    const c1 = lab.spawn( dna.Corp, {
        team: 1,
        name: 'Drilling Corp',
    })
    const c2 = lab.spawn( dna.Corp, {
        team: 2,
        name: 'Mineral Corp',
    })

    lab.control.player.bind(c1, 0)
    lab.control.player.bind(c2, 1)

    lab.control.game.nextTurn()
}
