class Building {
    constructor(x, y, model) {
      this.x = x;
      this.y = y;
      this.model = model;
    }
    display() {
      // No need to implement here, each subclass will implement its own display()
    }

    overlapsBuilding(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < 39.5; // Distancia mínima para considerar que se superponen (ajusta según el tamaño de los edificios)
      }

    overlapsRoad(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < 10; // Distancia mínima para considerar que se superponen (ajusta según el tamaño de los edificios)
      }

    rotate(){
    }
  }
  
  

  class BuildingPreview extends Building {
    constructor(x, y, model) {
      super(x, y, model);
      this.overlapBuilding = false; // Flag para indicar si se superpone con otro edificio
      this.overlapRoad = false; // Flag para indicar si se superpone con otro edificio
      this.rotationX = 0;
    }
  
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  
    checkOverlapBuilding() {
      // Verificar si se superpone con otro edificio
      for (let building of buildings) {
        if (this.overlapsBuilding(building)) {
          this.overlapBuilding = true;
          return;
        }
      }
      this.overlapBuilding = false;
    }

    checkOverlapRoad() {
      // Verificar si se superpone con otro edificio
      for (let road of roads) {
        if (this.overlapsRoad(road)) {
          this.overlapRoad = true;
          return;
        }
      }
      this.overlapRoad = false;
    }
  
    display() {
      // No need to implement here, each subclass will implement its own display()
    }


  }
  
  class HousePreview extends BuildingPreview {
    display() {
      push();
      translate(this.x, -16, this.y);
      if (this.overlapBuilding) {
        fill(255, 0, 0, 100); // Transparente rojo si se superpone
      } else {
        //fill(255, 0, 0);
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        model(this.model);
      }
      //box(30, 30, 30);
      pop();
    }

  }
  
  class SkyscraperPreview extends BuildingPreview {
    display() {
      push();
      translate(this.x, -35, this.y);
      if (this.overlapBuilding) {
        fill(0, 0, 255, 100); // Transparente azul si se superpone
      } else {
        //fill(0, 0, 255); // Transparente azul
        scale(0.35,0.35,0.35);
        rotateZ(PI);
        model(this.model);
      }
      //box(30, 100, 30);
      pop();
    }

  }
  
  class ShopPreview extends BuildingPreview {
    display() {
      push();
      translate(this.x, -9, this.y);
      if (this.overlapBuilding) {
        fill(0, 255, 0, 100); // Transparente verde si se superpone
      } else {
        //fill(0, 255, 0); // Transparente verde
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        model(this.model);
      }
      //box(50, 30, 30);
      pop();
    }

  }