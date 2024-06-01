let scl = 20, gridX, gridY, gridZ, figuraActual, figuras = [], grid, horizontalFilled = false, filledList = [], timer;
let tablero;
let puntaje = 0; ///
let nivel = 1;
let myFont; ///
let imagetetrislogo, imagewasd, imageflechas;
let gameOver = false; ///
let cam;

function preload() {
    myFont = loadFont('Micro5.ttf');    
    imagetetrislogo = loadImage('tetris_logo.png');
    imagewasd = loadImage('wasd_flechas.png');
    imageflechas = loadImage('flechas_rotar.png');
}

function getBoard(x,y,z) { 
  grid = Array(y+4).fill().map(() =>
      Array(x).fill().map(() =>
          Array(z).fill(0)
      )
  );
  return grid;
}


function setup() {
    createCanvas(780, 580, WEBGL);
    gridX = 6;
    gridY = 16;
    gridZ = 6;
    tablero = getBoard(gridX,gridY,gridZ);
    cam = createCamera();
    cam.setPosition(600,-400,600);
    cam.lookAt(0,-170,10);
    //figuraActual = new SShape(floor(gridX/2)-1,gridY,floor(gridZ/2)-1);
    figuraActual = generarFiguras();    
    textFont(myFont);  
    
}

function draw() {  
    background(32);
    orbitControl();
    stroke(255);
    scale(1,-1,1);

    drawGridLines();
    translate(scl/2,scl/2,scl/2);

    
    if(!gameOver){
    figuraActual.render();
    // for (const figura of figuras) {
    //     figura.render();
    // }
    renderGrid();
  
    if (filledList.length === 0) {
        // Este if se ejecuta para cada figura actual
        if (frameCount % Math.ceil(40*pow(0.75,nivel-1)) == 0) {
            if (verificarColision("abajo") ) {
                figuraActual.posY -= 1;
            } else {
                actualizarTablero();
                if (checkGameOver()) {
                    gameOver = true; // Terminar el juego si se detecta una condición de game over
                }
                for (let i = 0; i < tablero.length; i++) {
                    if (isHorizontalFull(i)) {
                        filledList.push(i);
                    }
                }
                timer = frameCount + 60;
            }
        }
    } else {
        //console.log(filledList[0]);
        if (frameCount > timer) {
            // borra las lineas que ya estan completas
            for (let i = filledList[0]+filledList.length; i < tablero.length; i++) {
                for (let j = 0; j < tablero[0].length; j++) {
                    for (let k = 0; k < tablero[0][0].length; k++) {
                        tablero[i-filledList.length][j][k] = tablero[i][j][k];
                    }
                }
            }
            filledList = [];
        }
    }
    } else {
        displayGameOver();
    }

    push();
    let X = cam.eyeX - cam.centerX;
    let Y = cam.eyeY - cam.centerY;
    let Z = cam.eyeZ - cam.centerZ;
    scale(1, -1);
    translate(cam.centerX, cam.centerY, cam.centerZ);
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
    /// Mostrar el puntaje y nivel
    push();
    fill(255);  // Color blanco
    textSize(70);
    text("PUNTAJE: " + puntaje + "  NIVEL: " + nivel, -230, -200); 
    pop();

    push(); //tetris logo
    image(imagetetrislogo, -420, -150, 280, 450);
    pop();

    push(); //instrucciones wasd
    image(imagewasd, 160, -110, 180, 150);
    pop();

    push(); //instrucciones flechas
    image(imageflechas, 160, 50, 180, 150);
    pop();
    pop();
}

function actualizarTablero() {
    let posiciones = [];

        // Añadir las posiciones relativas de cada cuadro de la figura dentro de su forma
        for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
            for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
                for (let k = ((figuraActual.shape[0][0].length)-1); k >=0; k--) {
                    if (figuraActual.shape[i][j][k]) {
                        // Si hay un bloque en esta posición de la forma,
                        // añadir la posición relativa al tablero
                        posiciones.push({
                            posX: figuraActual.posX + k,
                            posY: figuraActual.posY + j,
                            posZ: figuraActual.posZ + i
                        });
                      
                      tablero[figuraActual.posY+j][figuraActual.posZ + i][figuraActual.posX + k] = 1;
                    }
                }
            }
        }
    figuras.push(figuraActual);
    puntaje++; ///
    console.log(puntaje);
    // Genera una nueva figura
    figuraActual = generarFiguras();
}

function verificarColision(direccion) {
    // Desplazamientos según la dirección
    let dx = 0, dy = 0, dz = 0;
    if (direccion === "left") {
        dx = -1;
    } else if (direccion === "right") {
        dx = 1;
    } else if (direccion === "forward") {
        dz = 1;
    } else if (direccion === "backward") {
        dz = -1;
    } else if (direccion === "abajo") {
        dy = -1;
    }

    // Recorre cada capa de la figura actual
    for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
        for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
            for (let k = ((figuraActual.shape[0][0].length)-1); k >= 0; k--) {
                if (figuraActual.shape[i][j][k]) {
                    let newX = figuraActual.posX + k + dx;
                    let newY = figuraActual.posY + j + dy;
                    let newZ = figuraActual.posZ + i + dz;

                    // Verificar límites del tablero
                    if (newX < 0 || newX >= gridX || newY < 0 || newZ < 0 || newZ >= gridZ) {
                        return false;
                    }

                    // Verificar colisiones con otras figuras en el tablero
                    if (tablero[newY][newZ][newX] === 1) {
                        return false;
                    }
                }
            }
        }
    }
    return true; // No hay colisiones detectadas
}




function generarFiguras() {
    function getRandomIntInclusive(min, max) {
      const minCeiled = Math.ceil(min-1);
      const maxFloored = Math.floor(max-1);
      return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }
  
    const formas = [TShape, JShape, SShape, ZShape, CShape, IShape];
    const randomIndex = Math.floor(Math.random() * formas.length);
  
    const x = getRandomIntInclusive(2, gridX - 2);
    const y = gridY;
    const z = getRandomIntInclusive(2, gridZ - 2);
  
    let figura = new formas[randomIndex](x, y, z);
    //let figura = new formas[4](x, y, z);
    //console.log(figura);
    return figura;
}
function moveForward() {
    if (canMove("forward")) {
        figuraActual.posZ++;
    }
}

function moveBackward() {
    if (canMove("backward")) {
        figuraActual.posZ--;
    }
}

function moveLeft() {
    if (canMove("left")) {
        figuraActual.posX--;
    }
}

function moveRight() {
    if (canMove("right")) {
        figuraActual.posX++;
    }
}

function canMove(direction) {
    let newX = figuraActual.posX;
    let newZ = figuraActual.posZ;

    // Calcular nuevas posiciones según la dirección de movimiento
    if (direction === "forward") {
        newZ++;
    } else if (direction === "backward") {
        newZ--;
    } else if (direction === "left") {
        newX--;
    } else if (direction === "right") {
        newX++;
    }

    // Verificar si la nueva posición está dentro del tablero y no hay colisión
    return (
        newX >= -1 &&
        newX < gridX-1 &&
        newZ >= -1 &&
        newZ < gridZ-1 &&
        verificarColision(direction)
    );
}

function canRotate(figura, eje) {
    let newShape;

    // Crear una copia de la figura actual y rotarla según el eje
    if (eje === 'X') {
        newShape = Array(figura.shape.length).fill().map(
            () => Array(figura.shape[0][0].length).fill().map(
                () => Array(figura.shape[0].length).fill(0)
            )
        );
        for (let i = 0; i < figura.shape.length; i++) {
            for (let j = 0; j < figura.shape[0].length; j++) {
                for (let k = 0; k < figura.shape[0][0].length; k++) {
                    newShape[i][k][figura.shape[0].length - j - 1] = figura.shape[i][j][k];
                }
            }
        }
    } else if (eje === 'Y') {
        newShape = Array(figura.shape[0][0].length).fill().map(
            () => Array(figura.shape[0].length).fill().map(
                () => Array(figura.shape.length).fill(0)
            )
        );
        for (let i = 0; i < figura.shape.length; i++) {
            for (let j = 0; j < figura.shape[0].length; j++) {
                for (let k = 0; k < figura.shape[0][0].length; k++) {
                    newShape[k][j][figura.shape.length - i - 1] = figura.shape[i][j][k];
                }
            }
        }
    } else if (eje === 'Z') {
        newShape = Array(figura.shape[0].length).fill().map(
            () => Array(figura.shape.length).fill().map(
                () => Array(figura.shape[0][0].length).fill(0)
            )
        );
        for (let i = 0; i < figura.shape.length; i++) {
            for (let j = 0; j < figura.shape[0].length; j++) {
                for (let k = 0; k < figura.shape[0][0].length; k++) {
                    newShape[figura.shape[0].length - j - 1][i][k] = figura.shape[i][j][k];
                }
            }
        }
    }

    // Verificar colisiones con la figura rotada
    for (let i = 0; i < newShape.length; i++) {
        for (let j = 0; j < newShape[0].length; j++) {
            for (let k = 0; k < newShape[0][0].length; k++) {
                if (newShape[i][j][k]) {
                    let x = figura.posX + k;
                    let y = figura.posY + j;
                    let z = figura.posZ + i;

                    // Verificar límites del tablero
                    if (x < 0 || x >= gridX || y < 0 || y >= gridY || z < 0 || z >= gridZ) {
                        return false;
                    }

                    // Verificar colisiones con otras figuras en el tablero
                    if (tablero[y][z][x] === 1) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

function tryMoveAndRotate(eje) {
    if (canRotate(figuraActual, eje)) {
        if (eje === 'X') figuraActual.rotateX();
        else if (eje === 'Y') figuraActual.rotateY();
        else if (eje === 'Z') figuraActual.rotateZ();
        return true;
    }

    // Intentar mover hacia atrás, izquierda, derecha, adelante y luego rotar
    const originalPosX = figuraActual.posX;
    const originalPosY = figuraActual.posY;
    const originalPosZ = figuraActual.posZ;

    const moves = [
        { x: 0, y: 0, z: -1 }, // Backward
        { x: 0, y: 0, z: 1 },  // Forward
        { x: -1, y: 0, z: 0 }, // Left
        { x: 1, y: 0, z: 0 }   // Right
    ];

    for (const move of moves) {
        figuraActual.posX += move.x;
        figuraActual.posZ += move.z;

        if (canRotate(figuraActual, eje)) {
            if (eje === 'X') figuraActual.rotateX();
            else if (eje === 'Y') figuraActual.rotateY();
            else if (eje === 'Z') figuraActual.rotateZ();
            return true;
        }

        // Si no se pudo rotar, revertir el movimiento
        figuraActual.posX = originalPosX;
        figuraActual.posZ = originalPosZ;
    }

    return false;
}

function keyPressed() {
    // Rotaciones
    if (keyCode === RIGHT_ARROW) {
        tryMoveAndRotate('X');
    } else if (keyCode === UP_ARROW) {
        tryMoveAndRotate('Y');
    } else if (keyCode === LEFT_ARROW) {
        tryMoveAndRotate('Z');
    }
    // Desplazamientos
    else if (key === 'w' || key === 'W') {
        moveBackward();
    } else if (key === 's' || key === 'S') {
        moveForward();
    } else if (key === 'a' || key === 'A') {
        moveLeft();
    } else if (key === 'd' || key === 'D') {
        moveRight();
    }
}

function drawGridLines() {
    push();
    stroke(255,255,255,80);

    // Grid guia en el plano XZ
    for (let i = 0; i <= gridX; i++) {
        line(i*scl,0,0,i*scl,0,gridZ*scl);
    }
    for (let i = 0; i <= gridZ; i++) {
        line(0,0,i*scl,gridX*scl,0,i*scl);
    }

    // Grid guia en el plano XY
    if (cam.eyeZ >= 0) {
        for (let i = 0; i <= gridX; i++) {
            line(i*scl,0,0,i*scl,gridY*scl,0);
        }
        for (let i = 0; i <= gridY; i++) {
            line(0,i*scl,0,gridX*scl,i*scl,0);
        }
        for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
            for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
                for (let k = ((figuraActual.shape[0][0].length)-1); k >=0; k--) {
                    if (figuraActual.shape[i][j][k] && j+figuraActual.posY <= gridY) {
                        push();
                        stroke(figuraActual.color);
                        strokeWeight(2);
                        line((k+figuraActual.posX)*scl,(j+figuraActual.posY)*scl,0,(k+figuraActual.posX+1)*scl,(j+figuraActual.posY)*scl,0);
                        line((k+figuraActual.posX)*scl,(j+figuraActual.posY+1)*scl,0,(k+figuraActual.posX+1)*scl,(j+figuraActual.posY+1)*scl,0);
                        line((k+figuraActual.posX)*scl,(j+figuraActual.posY)*scl,0,(k+figuraActual.posX)*scl,(j+figuraActual.posY+1)*scl,0);
                        line((k+figuraActual.posX+1)*scl,(j+figuraActual.posY)*scl,0,(k+figuraActual.posX+1)*scl,(j+figuraActual.posY+1)*scl,0);
                        pop();
                    }
                }
            }
        }
    } 
    if (cam.eyeZ <= gridZ*scl) {
        for (let i = 0; i <= gridX; i++) {
            line(i*scl,0,gridZ*scl,i*scl,gridY*scl,gridZ*scl);
        }
        for (let i = 0; i <= gridY; i++) {
            line(0,i*scl,gridZ*scl,gridX*scl,i*scl,gridZ*scl);
        }
        for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
            for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
                for (let k = ((figuraActual.shape[0][0].length)-1); k >=0; k--) {
                    if (figuraActual.shape[i][j][k] && j+figuraActual.posY <= gridY) {
                        push();
                        stroke(figuraActual.color);
                        strokeWeight(2);
                        line((k+figuraActual.posX)*scl,(j+figuraActual.posY)*scl,gridZ*scl,(k+figuraActual.posX+1)*scl,(j+figuraActual.posY)*scl,gridZ*scl);
                        line((k+figuraActual.posX)*scl,(j+figuraActual.posY+1)*scl,gridZ*scl,(k+figuraActual.posX+1)*scl,(j+figuraActual.posY+1)*scl,gridZ*scl);
                        line((k+figuraActual.posX)*scl,(j+figuraActual.posY)*scl,gridZ*scl,(k+figuraActual.posX)*scl,(j+figuraActual.posY+1)*scl,gridZ*scl);
                        line((k+figuraActual.posX+1)*scl,(j+figuraActual.posY)*scl,gridZ*scl,(k+figuraActual.posX+1)*scl,(j+figuraActual.posY+1)*scl,gridZ*scl);
                        pop();
                    }
                }
            }
        }
    }

    // Grid guia en el plano YZ
    if (cam.eyeX >= 0) {
        for (let i = 0; i <= gridY; i++) {
            line(0,i*scl,0,0,i*scl,gridZ*scl);
        }
        for (let i = 0; i <= gridZ; i++) {
            line(0,0,i*scl,0,gridY*scl,i*scl);
        }

        for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
            for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
                for (let k = ((figuraActual.shape[0][0].length)-1); k >=0; k--) {
                    if (figuraActual.shape[i][j][k] && j+figuraActual.posY <= gridY) {
                        push();
                        stroke(figuraActual.color);
                        strokeWeight(2);
                        line(0,(j+figuraActual.posY)*scl,(i+figuraActual.posZ)*scl,0,(j+figuraActual.posY)*scl,(i+figuraActual.posZ+1)*scl);
                        line(0,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ)*scl,0,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ+1)*scl);
                        line(0,(j+figuraActual.posY)*scl,(i+figuraActual.posZ)*scl,0,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ)*scl);
                        line(0,(j+figuraActual.posY)*scl,(i+figuraActual.posZ+1)*scl,0,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ+1)*scl);
                        pop();
                    }
                }
            }
        }
    } 
    if (cam.eyeX <= gridX*scl) {
        for (let i = 0; i <= gridY; i++) {
            line(gridX*scl,i*scl,0,gridX*scl,i*scl,gridZ*scl);
        }
        for (let i = 0; i <= gridZ; i++) {
            line(gridX*scl,0,i*scl,gridX*scl,gridY*scl,i*scl);
        }
        for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
            for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
                for (let k = ((figuraActual.shape[0][0].length)-1); k >=0; k--) {
                    if (figuraActual.shape[i][j][k] && j+figuraActual.posY <= gridY) {
                        push();
                        stroke(figuraActual.color);
                        strokeWeight(2);
                        line(gridX*scl,(j+figuraActual.posY)*scl,(i+figuraActual.posZ)*scl,gridX*scl,(j+figuraActual.posY)*scl,(i+figuraActual.posZ+1)*scl);
                        line(gridX*scl,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ)*scl,gridX*scl,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ+1)*scl);
                        line(gridX*scl,(j+figuraActual.posY)*scl,(i+figuraActual.posZ)*scl,gridX*scl,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ)*scl);
                        line(gridX*scl,(j+figuraActual.posY)*scl,(i+figuraActual.posZ+1)*scl,gridX*scl,(j+figuraActual.posY+1)*scl,(i+figuraActual.posZ+1)*scl);
                        pop();
                    }
                }
            }
        }
    }
    pop();
}

function renderGrid() {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            for (let k = 0; k < tablero[0][0].length; k++) {
                const indexI = tablero.length - 1 - i; // Invertimos el índice i
                if (tablero[indexI][j][k] === 1) {
                    push();
                    if (filledList.includes(indexI)) {
                        fill(0, (sin(frameCount/2)+1)/2*255, 0);
                    } else {
                        fill(10, 180, 230); // Azul
                    }
                    translate(k * scl, indexI * scl, j * scl); // Ajustamos la altura
                    box(scl);
                    pop();
                }
            }
        }
    }
}

function isHorizontalFull(indexY) {
    for (let i = 0; i < tablero[0].length; i++) {
        for (let j = 0; j < tablero[0][0].length; j++) {
            if (tablero[indexY][i][j] === 0) return false;
        }
    }
    nivel++;
    console.log("capa llena"); 
    return true;
}


function displayGameOver() {
    push();
    let X = cam.eyeX - cam.centerX;
    let Y = cam.eyeY - cam.centerY;
    let Z = cam.eyeZ - cam.centerZ;
    scale(1, -1);
    translate(cam.centerX, cam.centerY, cam.centerZ);
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
    translate(203, 0, 500); // Ajusta la posición Z para acercar el texto
    fill(255, 0, 0);  // Color rojo
    textSize(50);
    text("GAME OVER", -280, -20); 
    pop();
}

function checkGameOver() {
    for (let i = gridY; i < tablero.length; i++) {
        for (let j = 0; j < tablero[0].length; j++) {
            for (let k = 0; k < tablero[0][0].length; k++) {
                if (tablero[i][j][k] === 1) {
                    return true;
                }
            }
        }
    }
    return false;
}