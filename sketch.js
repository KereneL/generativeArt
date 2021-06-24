const canvasWidth = 500;
const canvasHeight = 500;

let boids = [];
let target;
let homing = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(255, 0, 0);
    noStroke();

    //Seed
    for (let i = 0; i < 50; i++) {
        boid = new Boid(random(width), random(height));
        boids.push(boid);
    }
    boid.flock(boids);
}

function draw() {
    background(0);

    for (var boid of boids) {
        if (homing) {
            target = createVector(mouseX, mouseY);
            circle(target.x, target.y, 7.5);
            boid.seek(target);
        }
        else {
            boid.flock(boids);
        }
        boid.edges();
        boid.update();
        boid.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function mousePressed() {
    homing = true;
}
function mouseReleased() {
    homing = false;
}