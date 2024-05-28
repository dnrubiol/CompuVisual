class Building {
    constructor(x, y, model, costo) {
      this.x = x;
      this.y = y;
      this.model = model;
      this.costo = costo;
      this.rotation = 0;
    }
    display() {
      // No need to implement here, each subclass will implement its own display()
    }

    overlapsBuilding(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < 39.5; // Distancia mínima para considerar que se superponen (ajusta según el tamaño de los edificios)
      }

    overlapsRoad(road) {
        let d = road.distanceToBuilding(this);
        return d < 22.5; // Distancia mínima para considerar que se superponen (ajusta según el tamaño de los edificios)
      }

    rotate(){
      this.rotation = (this.rotation+1)%4;
    }
  }
  
  

  class BuildingPreview extends Building {
    constructor(x, y, model, costo) {
      super(x, y, model, costo);
      this.overlapBuilding = false; // Flag para indicar si se superpone con otro edificio
      this.overlapRoad = false; // Flag para indicar si se superpone con una carretera
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
      if (this.overlapBuilding || this.overlapRoad) {
        fill(255, 0, 0, 100); // Transparente rojo si se superpone
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        rotateY(PI*this.rotation/2);
        model(this.model);
      } else {
        fill(161, 130, 100);
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        rotateY(PI*this.rotation/2);
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
      if (this.overlapBuilding || this.overlapRoad) {
        fill(255, 0, 0, 100); // Transparente rojo si se superpone
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        rotateY(PI*this.rotation/2);
        model(this.model);
      } else {
        fill(155, 155, 155); // Transparente azul
        scale(0.35,0.35,0.35);
        rotateZ(PI);
        rotateY(PI+PI*this.rotation/2);
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
      if (this.overlapBuilding || this.overlapRoad) {
        fill(255, 0, 0, 100); // Transparente rojo si se superpone
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        rotateY(PI*this.rotation/2);
        model(this.model);
      } else {
        fill(200, 200, 0); // Transparente verde
        scale(0.2,0.2,0.2);
        rotateZ(PI);
        rotateY(PI*this.rotation/2);
        model(this.model);
      }
      //box(50, 30, 30);
      pop();
    }

  }