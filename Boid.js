class Boid {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 2 + random(3);
        this.maxForce = 0.2 + random(0.2);
        this.r = 4 + random(2);
    }
    seek(target) {
        var desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();
        //Arrive slow-down
        if (d < 25) {
            var m = map(d, 0, 200, 0, this.maxSpeed);
            desired.setMag(m);
        } else {
            //Not arriving
            desired.setMag(this.maxSpeed);
        }
        desired.sub(this.vel);
        desired.limit(this.maxForce);
        this.acc.add(desired);
    }

    align(boids) {
        let perceptionRadius = Math.pow(this.r,2);
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
          if (other != this && d < perceptionRadius) {
            steering.add(other.vel);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.setMag(this.maxSpeed);
          steering.sub(this.vel);
          steering.limit(this.maxForce);
        }
        return steering;
      }
    
      separation(boids) {
        let perceptionRadius = Math.pow(this.r,2);
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
          if (other != this && d < perceptionRadius) {
            let diff = p5.Vector.sub(this.pos, other.pos);
            diff.div(d * d);
            steering.add(diff);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.setMag(this.maxSpeed);
          steering.sub(this.vel);
          steering.limit(this.maxForce);
        }
        return steering;
      }
    
      cohesion(boids) {
        let perceptionRadius = Math.pow(this.r,2)*2;
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
          let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
          if (other != this && d < perceptionRadius) {
            steering.add(other.pos);
            total++;
          }
        }
        if (total > 0) {
          steering.div(total);
          steering.sub(this.pos);
          steering.setMag(this.maxSpeed);
          steering.sub(this.vel);
          steering.limit(this.maxForce);
        }
        return steering;
      }
    
      flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
    
        alignment.mult(1);
        cohesion.mult(1);
        separation.mult(2);
    
        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);
      }
    
      update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.acc.mult(0);
      }

    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show() {
        stroke(255);
        strokeWeight(2);
        fill(255);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
        pop();
    }

    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }
}
