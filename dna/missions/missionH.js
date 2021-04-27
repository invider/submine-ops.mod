const fuel = 20
const reward = 100
const equip = [
    'lifter',
    'drone',
]

function onCreated() {
    this.title = 'H-' + (101 + RND(707) + ' mining')
    this.fuel = 5 + RND(55)
    this.reward = 25 + RND(10) * 5
}
