const canvasWidth = 500;
const canvasHeight = 500;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(0);
    stroke('white');

    for (let i = 0; i<500; i++){
        var newStar = new Star();
        newStar.show();
    }
  }
  
function draw() {

}

class Star{
    constructor(){
        this.x = random(canvasWidth);
        this.y = random(canvasHeight);
        this.z = Math.pow(random(1.5),2);
    }

    show(){
        strokeWeight(this.z);
        point(this.x,this.y);
    }
}
