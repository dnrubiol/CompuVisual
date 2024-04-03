class Laser {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radio = 5;
      this.diametro = this.radio * 2;
      this.toDelete = false;
      this.particles = [];
      this.isExploded = false;
    }
  
    render() {
      if (this.isExploded) {
        for (const sp of this.particles) {
          sp.render();
        }
      } else {
        noStroke();
        fill(255, 0, 150);
        rect(this.x*scl,this.y*scl,scl,scl*2);
      }
    }
    update() {
      if (this.isExploded) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update();
          if (this.particles[i].lifespan <= 0) {
            this.particles.splice(i, 1);
          }
        }
      } else {
        this.y -= 2;
      }
    }
    
    updateAlien() {
      if (this.isExploded) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
          this.particles[i].update();
          if (this.particles[i].lifespan <= 0) {
            this.particles.splice(i, 1);
          }
        }
      } else {
        this.y += 2;
      }
    }
  
    hits(enemy) {
      if (this.x >= enemy.position.x && this.x <= enemy.position.x + enemy.width
        && this.y >= enemy.position.y && this.y <= enemy.position.y + enemy.height) {
        this.isExploded = true;
        this.explode();
        return true;
      } else {
        return false;
      }
    }
  
    
  
    remove() {
      this.toDelete = true;
    }
  
    explode() {
      for (let i = 0; i < 50; i++) {
        this.particles.push(new Spark(createVector(this.x, this.y), color(255,255,255,0)));
        console.log(this.particles[i].col);
      }
    }
  }
  class Spark {
    constructor(pos, col) {
      this.pos = pos.copy();
      this.vel = createVector(randomGaussian() * 0.3, randomGaussian() * 0.3);
      this.acc = createVector(0, 0);
      this.lifespan = 255;
      this.col = col;
      this.size = int(random(3, 8));
    }
  
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.lifespan--;
    }
  
    render() {
      noStroke();
      fill(this.col, this.lifespan);
      ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }
  }