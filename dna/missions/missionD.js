const equip = [
    'drone',
    'heavy lifter',
    'driller',
]

function onCreated() {
    this.title = 'X-' + (101 + RND(707) + ' mining')
    this.fuel = 5 + RND(30)
    this.reward = 70 + RND(11) * 10
}
