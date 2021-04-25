class Corp {

    constructor(st) {
        augment(this, st)
    }

    activate(action) {
        switch(action) {
            case _.LEFT:  this.stack.prev(); break;
            case _.RIGHT: this.stack.next(); break;
        }
    }
}
