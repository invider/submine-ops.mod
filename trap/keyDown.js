/*
function handleOpt(e) {
    switch(e.code) {
        case 'KeyT':
            lab.world.autoevolve = !lab.world.autoevolve
            break
        case 'KeyF':
            lab.world.fast = !lab.world.fast
            break
    }
}
*/

function handleControl(e) {
    switch(e.code) {

        case 'Escape':
            trap('menu')
            break

        case 'Tab':
            trap('skip')
            e.preventDefault()
            break

        case 'F8':
            lib.img.screenshot(env.tune.app)
            break
    }
}

function keyDown(e) {
    if (e.repeat) return

    const action = env.bind.keyMap[e.code]

    /*
    if (e.metaKey || e.altKey || e.ctrlKey) {
        handleOpt(e)
        return
    }
    */

    if (action) {
        lab.control.player.act(action.id, action.player)
    } else {
        handleControl(e)
    }
}
