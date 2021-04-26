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


    const corp = lab.touch('corp')
    const c1 = corp.spawn( dna.Corp, {
        team: 1,
        name: 'Drilling Corp',
    })
    const c2 = corp.spawn( dna.Corp, {
        team: 2,
        name: 'Mineral Corp',
    })
    lab.control.player.bind(c1, 0)
    lab.control.player.bind(c2, 1)

    const trade = lab.hud.spawn( dna.hud.Trader, { name: 'trader' })

    const missions = lab.hud.spawn( dna.hud.Row, {
        name: 'missions',
        rx: .5,
        ry: .3,
    })
    missions.push( new dna.Card({ type: 'random' }) )
    missions.push( new dna.Card({ type: 'random' }) )
    missions.push( new dna.Card({ type: 'random' }) )

    c1.stack.show()
    c2.stack.show()
    //missions.show()

    lab.control.game.nextTurn()
}
