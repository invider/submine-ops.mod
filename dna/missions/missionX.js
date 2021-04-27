const fuel = 20
const reward = 100
const equip = [
    'heavy lifter',
]

function onCreated() {
    this.title = 'X-' + (101 + RND(707) + ' mining')
    this.fuel = 10 + RND(40)
    this.reward = 45 + RND(10) * 5
}
