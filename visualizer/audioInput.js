class Visualizer {
    constructor() {
        Object.assign(this, {
            mic: new p5.AudioIn(),
            fft: new p5.FFT(),
            hotkeys: new HotKeys({
                m: this.mute.bind(this)
            }),
            state: {
                mute: false,
                analysis: null
            },
        })
    }

    monitor() {
        this.state.mute = false
        this.mic.start()
        this.fft.setInput(this.mic)
    }

    mute() {
        if (this.state.mute) {
            this.mic.stop()
            this.state.mute = false
        } else {
            this.mic.start()
            this.state.mute = true
        }
    }

    displaySpectrum() {
        const bottomHalf = []
        const topHalf = []

        let x

        this.analysis.map(
            (obj, index, freqs) => {
                x = obj.x

                topHalf[index] = {
                    x: x,
                    y: map(
                        obj.amp,
                        0, 255,
                        height/2, height/5
                    )
                }

                bottomHalf[index] = {
                    x: x,
                    y: map(
                        obj.amp,
                        0, 255,
                        height/2, height - height/5
                    )
                }
            }
        )

        beginShape()
        vertex(width/10, height/2)
        topHalf.map(({x, y})=> vertex(x, y))
        bottomHalf.reverse().map(({x, y})=> vertex(x, y))
        vertex(width/10, height/2)

        endShape(CLOSE)
    }

    get xParams() {
        const tenth = width/10
        return [tenth, tenth*9]
    }

    get analysis() {
        this.state.analysis = this.fft.analyze()
        const maxLogX = Math.log(this.state.analysis.length/8)
        const minLogX = Math.log(1/8)
        const xparams = this.xParams

        return this.state.analysis.map(
            (amp, index) => index > 7 ? {
                x: map(
                    Math.log((index + 1)/8),
                    0, maxLogX,
                    width/10, xparams[1]
                ),
                amp: amp
            } : {
                x: map(
                    Math.log(9/8),
                    0, maxLogX,
                    width/10, xparams[1]
                ),
                amp: 0
            }
        )
    }
}
