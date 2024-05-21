let buildings = [];
let roads = [];
let cam;
let previewBuilding = null;
let houseModel, skyScrapperModel, shopModel;
let buildingType = "House"; // Tipo de edificio predeterminado
let message = "";
let interfaz;
function preload() {
  houseModel = loadModel("models/Casa residencial.obj", true);
  skyScrapperModel = loadModel("models/edificioAlto.obj", true);
  shopModel = loadModel("models/tienda.obj", true);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 80, 16000000000000);
  //cam.ortho();
  interfaz = createGraphics(windowWidth, windowHeight);

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

  drawInterface();
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

function drawInterface(){
  push();
  interfaz.fill(0);
  interfaz.textSize(20);
  interfaz.textAlign(LEFT, TOP);
  interfaz.text("Bienvenido", 10, 10);
  interfaz.fill(255);
  if (buildingType == "Casa") {
    interfaz.fill(0,255,0);
    interfaz.rect(width/2 - 180,height - 200,100,120);
    interfaz.fill(255);
    interfaz.rect(width/2 - 50,height - 200,100,120);
    interfaz.rect(width/2 + 80,height - 200,100,120);
  } else if (buildingType == "Edificio") {
    interfaz.rect(width/2 - 180,height - 200,100,120);
    interfaz.fill(0,255,0);
    interfaz.rect(width/2 - 50,height - 200,100,120);
    interfaz.fill(255);
    interfaz.rect(width/2 + 80,height - 200,100,120);
  } else if (buildingType == "Tienda") {
    interfaz.rect(width/2 - 180,height - 200,100,120);
    interfaz.rect(width/2 - 50,height - 200,100,120);
    interfaz.fill(0,255,0);
    interfaz.rect(width/2 + 80,height - 200,100,120);
  } else {
    interfaz.rect(width/2 - 180,height - 200,100,120);
    interfaz.rect(width/2 - 50,height - 200,100,120);
    interfaz.rect(width/2 + 80,height - 200,100,120); 
  }
  interfaz.fill(0);
  interfaz.text("Dinero: $1000", width/2 - 400, height - 160);
  interfaz.text("Casa", width/2 - 170, height - 100);
  interfaz.text("Edificio", width/2 - 40, height - 100);
  interfaz.text("Tienda", width/2 + 90, height - 100);
  pop();
  push();
  let X = cam.eyeX - cam.centerX;
  let Y = cam.eyeY - cam.centerY;
  let Z = cam.eyeZ - cam.centerZ;
  translate(cam.centerX, cam.centerY, cam.centerZ);
  scale(sqrt(Z * Z + X * X + Y * Y) / 800);
  if (Z > 0) {
    rotateY(atan(X / Z));
  } else {
    rotateY(atan(X / Z) + PI);
  }
  if (cam.upY > 0) {
    rotateX(atan(-Y / sqrt(Z * Z + X * X)));
  } else {
    rotateY(PI);
    rotateX(atan(Y / sqrt(Z * Z + X * X)) + PI);
  }
  translate(-windowWidth / 2, -windowHeight / 2);
  image(interfaz, 0, 0);
  pop();
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
