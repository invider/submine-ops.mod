const title = 'fuel pod'
const ghost = true

function onCreated() {
    this.fuel = 25 + RND(25) * 5
    this.price = ceil(this.fuel / 10)
    this.text = 'Fuel: ' + this.fuel
}

function onJoinedCorp(corp) {
    corp.fuel += this.fuel
}
