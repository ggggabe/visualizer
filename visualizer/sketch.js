const visualizer = new Visualizer()

function setup() {
    createCanvas(windowWidth, windowHeight)
    visualizer.monitor()
}

function draw() {
    background(36,46,61)
    noStroke()
    fill(95,111,138)
    visualizer.displaySpectrum()
}

function keyPressed() {
    visualizer.hotkeys.detect(key)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
