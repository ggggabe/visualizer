class HotKeys {
    constructor(keyFns) {
        this.fns = {}
        Object.keys(keyFns).map(key => {
            this.fns[key] = keyFns[key]
        })
    }

    detect (hotkey) {
        if (this.fns[hotkey]) {
            this.fns[hotkey]()
        }
    }
}
