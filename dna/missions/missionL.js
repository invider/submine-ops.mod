const fuel = 20
const reward = 100
const equip = [
    'lifter',
]

function onCreated() {
    this.title = 'L-' + (101 + RND(707) + ' mining')
    this.fuel = 5 + RND(55)
    this.reward = 25 + RND(10) * 5
}
