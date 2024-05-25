let buildings = [];
let roads = [];
let cam;
let previewBuilding = null;
let houseModel, skyScrapperModel, shopModel;
let buildingType = "House"; // Tipo de edificio predeterminado
let message = "";
let mensajeVisible = false;
let interfaz;
let interDinero;
let dinero = 1000;
let font;
let tiendas = [];
function preload() {
  houseModel = loadModel("models/Casa residencial.obj", true);
  skyScrapperModel = loadModel("models/edificioAlto.obj", true);
  shopModel = loadModel("models/tienda.obj", true);
  font = loadFont("SANTELLO.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  cam.ortho(-width / 2, width / 2, -height / 2, height / 2, 5, 99000000);
  textFont(font);

  //cam.ortho();
  interfaz = createGraphics(windowWidth, windowHeight);
  interDinero = createGraphics(300, 200);

  for (let i = -200; i <= 200; i += 100) {
    roads.push(new Road(i, -200, i, 200));
  }
  for (let i = -200; i <= 200; i += 100) {
    roads.push(new Road(-200, i, 200, i));
  }
  setInterval(generarDinero, 7000);
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
  setPreview();
  drawInterface();  
  
}

function showTempMessage() {
  mensajeVisible = true;
  setTimeout(() => {
    mensajeVisible = false;
  }, 2000);
}

function setPreview() {
  // Actualizar la posición de la previsualización del edificio
  if (previewBuilding !== null) {
    let m;
    //distancias entre la camara y el punto al que apunta la camara
    let X = cam.eyeX - cam.centerX;
    let Y = cam.eyeY - cam.centerY;
    let Z = cam.eyeZ - cam.centerZ;
    if (Y === 0) {
      m = -cam.centerY / 0.000001;
    } else {
      m = -cam.centerY / Y;
    }
    //definir el punto en el plano (y = 0) que coincide con el centro de la pantalla
    let posX = cam.centerX + m * X;
    let posY = cam.centerZ + m * Z;
    //distancia del cursor al centro de la pantalla
    let r = sqrt(
      (mouseX - width / 2) * (mouseX - width / 2) +
        (mouseY - height / 2) * (mouseY - height / 2)
    );
    //ajustar al zoom
    r = r * (sqrt(Z * Z + X * X + Y * Y) / 800);
    //ajustar segun la direccion que mira la camara
    let angle = atan((mouseY - height / 2) / (mouseX - width / 2));
    let theta;
    if (X > 0) {
      theta = atan(Z / X) - PI / 2;
    } else {
      theta = atan(Z / X) + PI / 2;
    }
    angle += theta;
    if (mouseX - width / 2 >= 0) {
      posX += r * cos(angle);
      posY += r * sin(angle);
    } else {
      posX -= r * cos(angle);
      posY -= r * sin(angle);
    }
    //ajustar a inclinacion de la camara
    let tilt = atan(sqrt(Z * Z + X * X) / Y);
    let a = ((mouseY - height / 2) * sqrt(Z * Z + X * X + Y * Y)) / 800;
    //posX += a*cos(atan(Z/X))*sqrt(Z * Z + X * X)/Y;
    //posY += a*sin(atan(Z/X))*sqrt(Z * Z + X * X)/Y;
    if (X < 0) {
      posX += (a * cos(atan(Z / X)) * sqrt(Z * Z + X * X)) / Y;
      posY += (a * sin(atan(Z / X)) * sqrt(Z * Z + X * X)) / Y;
    } else {
      posX -= (a * cos(atan(Z / X)) * sqrt(Z * Z + X * X)) / Y;
      posY -= (a * sin(atan(Z / X)) * sqrt(Z * Z + X * X)) / Y;
    }

    previewBuilding.setPosition(posX, posY);
    previewBuilding.checkOverlapBuilding(); // Verificar si se superpone con otro edificio
    //previewBuilding.checkOverlapRoad(); // Verificar si se superpone con otro edificio
  }
}
function keyPressed() {
  if (keyCode === 84) {
    message = "Construcción cambiada a TIENDA";
    mensajeVisible = true;
    showTempMessage();
    buildingType = "Tienda";
  } else if (keyCode === 67) {
    message = "Construcción cambiada a CASA";
    mensajeVisible = true;
    showTempMessage();
    buildingType = "Casa";
  } else if (keyCode === 69) {
    message = "Construcción cambiada a EDIFICIO";
    mensajeVisible = true;
    showTempMessage();
    buildingType = "Edificio";
  } else if (keyCode === 32) {
    if (previewBuilding != null) {
      previewBuilding.rotate();
    }
  };
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
        if (dinero >= 600) {
          previewBuilding = new HousePreview(posX, posY, houseModel, 600);
          dinero -= 600;
        } else {
          message = "Dinero insuficiente";
          mensajeVisible = true;
          showTempMessage();
        }
        break;
      case "Edificio":
        if (dinero >= 1200) {
          previewBuilding = new SkyscraperPreview(
            posX,
            posY,
            skyScrapperModel,
            1200
          );
          dinero -= 1200;
        } else {
          message = "Dinero insuficiente";
          mensajeVisible = true;
          showTempMessage();
        }
        break;
      case "Tienda":
        if (dinero >= 400) {
          previewBuilding = new ShopPreview(posX, posY, shopModel, 400);
          dinero -= 400;
        } else {
          message = "Dinero insuficiente";
          mensajeVisible = true;
          showTempMessage();
        }
        break;
    }
  }
}

function drawInterface() {
  push();
  interfaz.clear();
  interfaz.fill(0);
  interfaz.textSize(20);
  interfaz.textAlign(LEFT, TOP);
  interfaz.text("Bienvenido", 10, 10);
  interfaz.text("Para seleccionar edificación:", 10, 40);
  interfaz.text(
    "Casa: C                                                Costo: $600",
    10,
    60
  );
  interfaz.text(
    "Edificio de apartamentos: E                 Costo: $1200",
    10,
    80
  );
  interfaz.text(
    "Tienda: T                                              Costo: $400",
    10,
    100
  );
  interfaz.text("Para construir da doble clic", 10, 130);
  interfaz.text("Para rotar el edificio presiona espacio", 10, 150);
  if (mensajeVisible) {
    push();
    fill(180);
    textSize(24);
    interfaz.text(message, 40, 270);
    pop();
  }
  interfaz.fill(255);
  if (buildingType == "Casa") {
    interfaz.fill(0, 255, 0);
    interfaz.rect(width / 2 - 180, height - 200, 100, 120);
    interfaz.fill(255);
    interfaz.rect(width / 2 - 50, height - 200, 100, 120);
    interfaz.rect(width / 2 + 80, height - 200, 100, 120);
  } else if (buildingType == "Edificio") {
    interfaz.rect(width / 2 - 180, height - 200, 100, 120);
    interfaz.fill(0, 255, 0);
    interfaz.rect(width / 2 - 50, height - 200, 100, 120);
    interfaz.fill(255);
    interfaz.rect(width / 2 + 80, height - 200, 100, 120);
  } else if (buildingType == "Tienda") {
    interfaz.rect(width / 2 - 180, height - 200, 100, 120);
    interfaz.rect(width / 2 - 50, height - 200, 100, 120);
    interfaz.fill(0, 255, 0);
    interfaz.rect(width / 2 + 80, height - 200, 100, 120);
  } else {
    interfaz.rect(width / 2 - 180, height - 200, 100, 120);
    interfaz.rect(width / 2 - 50, height - 200, 100, 120);
    interfaz.rect(width / 2 + 80, height - 200, 100, 120);
  }
  interfaz.fill(0);
  interfaz.text("Dinero: $" + dinero.toFixed(2), width / 2 - 400, height - 160);
  interfaz.text("Casa", width / 2 - 170, height - 100);
  interfaz.text("Edificio", width / 2 - 40, height - 100);
  interfaz.text("Tienda", width / 2 + 90, height - 100);
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

function generarDinero() {
  tiendas = buildings.filter((edificio) => edificio instanceof ShopPreview);
  let numTiendas = tiendas.length;
  if (numTiendas <= 5) {
    dinero += numTiendas * Math.random(25, 100) * 100;
    console.log(dinero);
  } else if (numTiendas > 5 && numTiendas < 12) {
    dinero += numTiendas * Math.random(100, 300) * 100;
    console.log(dinero);
  } else {
    dinero += numTiendas * Math.random(300, 550) * 100;
    console.log(dinero);
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

