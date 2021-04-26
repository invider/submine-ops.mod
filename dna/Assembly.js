class Assembly {

    constructor(st) {
        augment(this, st)
        mixin(this, dna.CardSetTrait)
        this.fuel = 0
    }

    join(card) {
        if (!card) return

        this.push(card)
        // TODO sfx

        return true
    }

    defuel(q) {
        if (q > this.fuel) {
            const left = q - this.fuel
            this.fuel = 0
            return left
        } else {
            this.fuel -= q
            return 0
        }
    }

    refuel(q) {
        this.fuel += q
        return q
        // TODO check core fuel capacity
    }

    checkEquipment(e) {
        for (c of this.cards) {
            if (c.title.includes(e)) return true
        }
        return false
    }

    matchMission(mission) {
        if (!mission) return false
        if (mission.fuel !== this.fuel) return false
        for (e of mission.equip) {
            if (!this.checkEquipment(e)) return false
        }
        return true
    }
}
