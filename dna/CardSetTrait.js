function onMixin() {
    this.cards = []
}

function push(card) {
    this.cards.push(card)
    this.pos = this.cards.length - 1
    card.adjust()
    if (this.onNewCard) this.onNewCard(card)
}

function cut(card) {
    if (!card) return
    const i = this.cards.indexOf(card)
    if (i >= 0) {
        this.cards.splice(i, 1)

        // TODO refactor this dirty hack!
        //      this part shouldn't know anything about prev
        if (this.prev) {
            if (this.pos >= i) this.prev()
        }
        return card
    }
}

function clear() {
    this.cards = []
}
