let buildings = [];
let roads = [];
let cam;
let previewBuilding = null;
let houseModel, skyScrapperModel, shopModel;
let buildingType = "House"; // Tipo de edificio predeterminado
let message = "";
function preload() {
  houseModel = loadModel("models/Casa residencial.obj", true);
  skyScrapperModel = loadModel("models/edificioAlto.obj", true);
  shopModel = loadModel("models/tienda.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.ortho();

  for (let i = -200; i <= 200; i += 100) {
    roads.push(new Road(i, -200, i, 200));
  }
  for (let i = -200; i <= 200; i += 100) {
    roads.push(new Road(-200, i, 200, i));
  }
}

function draw() {
  background(220);
  // Control de la cámara con el mouse
  orbitControl();

  push();
  fill(0);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Bienvenido", 10, 10);
  pop();


  // Actualizar y mostrar los edificios
  for (let road of roads) {
    road.display();
  }
  for (let building of buildings) {
    building.display();
  }

  if (previewBuilding !== null) {
    previewBuilding.display();
  }
}

function showTempMessage(msg) {
  message = msg;
  setTimeout(() => {
    message = ""; // Restablecer el mensaje después de 2 segundos
  }, 2000);
}

function mouseMoved() {
  // Actualizar la posición de la previsualización del edificio
  if (previewBuilding !== null) {
    let posX = mouseX - width / 2;
    let posY = mouseY - height / 2;
    previewBuilding.setPosition(posX, posY);
    previewBuilding.checkOverlapBuilding(); // Verificar si se superpone con otro edificio
    //previewBuilding.checkOverlapRoad(); // Verificar si se superpone con otro edificio
  }
}
function keyPressed() {
  if (keyCode === 84) {
    //Letra T (TIENDA)
    buildingType = "Tienda";
    showTempMessage("Construcción cambiada a tienda");
  } else if (keyCode === 67) {
    buildingType = "Casa";
    showTempMessage("Construcción cambiada a Casa");
  } else if (keyCode === 69) {
    buildingType = "Edificio";
    showTempMessage("Construcción cambiada a Rascacielos");
  }
}

function doubleClicked() {
  if (previewBuilding !== null && !previewBuilding.overlapBuilding) {
    buildings.push(previewBuilding);
    previewBuilding = null;
  } else {
    // Crear la previsualización del edificio en la posición del mouse
    let posX = mouseX - width / 2;
    let posY = mouseY - height / 2;
    switch (buildingType) {
      case "Casa":
        previewBuilding = new HousePreview(posX, posY, houseModel);
        break;
      case "Edificio":
        previewBuilding = new SkyscraperPreview(posX, posY, skyScrapperModel);
        break;
      case "Tienda":
        previewBuilding = new ShopPreview(posX, posY, shopModel);
        break;
    }
  }
}

class Road {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  display() {
    push();
    stroke(100);
    strokeWeight(8);
    line(this.x1, 0, this.y1, this.x2, 0, this.y2);
    pop();
  }
}
