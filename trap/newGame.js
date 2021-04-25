function newGame() {
    env.state = {
        turn: 0,
        phase: 0,
    }
    lab.control.transient = true
    lab.control.game.clear()

    const hud = lab.spawn( dna.hud.Hud, {
        name: 'hud',
    })

    const s1 = hud.spawn( dna.Stack, {
        rx: .25,
        ry: .75,
    })
    const s2 = hud.spawn( dna.Stack, {
        rx: .75,
        ry: .75,
    })

    const c1 = lab.spawn( dna.Corp, {
        name: 'Drilling Corp',
        stack: s1,
    })
    const c2 = lab.spawn( dna.Corp, {
        name: 'Mineral Corp',
        stack: s2,
    })


    s1.push( new dna.Card({ type: 'random' }))
    s1.push( new dna.Card({ type: 'random' }))
    s1.push( new dna.Card({ type: 'random' }))

    s2.push( new dna.Card({ type: 'random' }))
    s2.push( new dna.Card({ type: 'random' }))
    s2.push( new dna.Card({ type: 'random' }))

    lab.control.player.bind(c1, 0)
    lab.control.player.bind(c2, 1)

    lab.control.game.nextTurn()
}
