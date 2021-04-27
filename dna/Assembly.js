class Assembly {

    constructor(st) {
        augment(this, st)
        mixin(this, dna.CardSetTrait)
        this.fuel = 0
    }

    join(card) {
        if (!card) return

        if (this.cards.length === 0) {
            // core is expected
            if (!card.capacity) {
                sfx(res.sfx.denied, .5)
                return false
            }
            this.core = card
        } else {
            if (card.capacity) {
                sfx(res.sfx.denied, .5)
            }
        }

        if (this.freeSpace() < 1) {
            sfx(res.sfx.denied, .5)
            return false
        }
        this.push(card)
        sfx(res.sfx.click, .5)

        return true
    }

    freeSpace() {
        if (!this.core) return 0
        else return this.core.capacity - (this.cards.length - 1)
    }

    // returns leftovers
    refuel(q) {
        if (!this.core) return
        if (this.fuel + q > this.core.tank) {
            // fuel max out
            const left = (this.fuel + q) - this.core.tank
            this.fuel = this.core.tank
            return left
        } else {
            this.fuel += q
            return 0
        }
    }

    // returns actual qty of defueled
    defuel(q) {
        if (!this.core) return
        if (q > this.fuel) {
            const actual = this.fuel
            this.fuel = 0
            return actual
        } else {
            this.fuel -= q
            return q
        }
    }

    checkEquipment(e) {
        if (!e) return true
        e = e.toLowerCase()
        for (const c of this.cards) {
            if (c.title.toLowerCase().includes(e)) return true
        }
        return false
    }

    matchMission(mission) {
        if (!mission) return false
        if (mission.fuel !== this.fuel) return false
        for (const e of mission.equip) {
            if (!this.checkEquipment(e)) return false
        }
        return true
    }
}
