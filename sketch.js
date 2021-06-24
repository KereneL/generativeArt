const canvasWidth = 500;
const canvasHeight = 500;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    stroke('white');

    for (let i = 0; i<500; i++){
        randomPoint()
    }
  }
function draw() {

}

function randomPoint(){
    var rndX = random(canvasWidth);
    var rndY = random(canvasHeight);
    var rndW = Math.pow(random(1.5),2);
    strokeWeight(rndW);
    point(rndX,rndY);
}
