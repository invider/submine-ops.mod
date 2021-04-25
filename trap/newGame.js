function newGame() {
    env.state = {
        turn: 0,
        phase: 0,
    }

    lab.control.game.nextTurn()
}
