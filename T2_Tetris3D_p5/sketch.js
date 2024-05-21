let scl = 20, gridX, gridY, gridZ, figuraActual, figuras = [], grid, horizontalFilled = false, filledList = [], timer;
let tablero;
let puntaje = 1; ///
let myFont; ///

function preload() {
    myFont = loadFont('Micro5.ttf');
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
    gridX = 8;
    gridY = 16;
    gridZ = 8;
    tablero = getBoard(gridX,gridY,gridZ);
    camera(600,-600,600,0,-100,0);
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

  
    
    figuraActual.render();
    // for (const figura of figuras) {
    //     figura.render();
    // }
    renderGrid();
  
    if (filledList.length === 0) {
        // Este if se ejecuta para cada figura actual
        if (frameCount % 20 == 0) {
            if (verificarColision() ) {
                figuraActual.posY -= 1;
            } else {
                actualizarTablero();
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

    /// Mostrar el puntaje
    push();
    scale(1, -1);  // Invertir Y de nuevo para el texto
    fill(255);  // Color blanco
    rotateY(0.8);
    textSize(70);
    text("PUNTAJE: " + puntaje, -150, -350);  // Mostrar en coordenadas (0, 0)
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

function verificarColision() {
    // Recorre cada capa de la figura actual
    for (let i = ((figuraActual.shape.length)-1); i >= 0; i--) {
            for (let j = ((figuraActual.shape[0].length)-1); j >= 0; j--) {
                for (let k = ((figuraActual.shape[0][0].length)-1); k >=0; k--) {
                    if (figuraActual.shape[i][j][k]) {
                        // Si hay un bloque en esta posición de la forma,
                        // añadir la posición relativa al tablero
                        
                      
                      if(figuraActual.posY+j-1 < 0){
                        return false;
                      }
                      if(tablero[figuraActual.posY+j-1][figuraActual.posZ + i][figuraActual.posX + k] === 1){
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
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
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
  if(figuraActual instanceof JShape){
    return (
        newX >= 0 &&
        newX < gridX-1 &&
        newZ >= 0 &&
        newZ < gridZ-2 &&
        verificarColision(direction)
    );
  } else if(figuraActual instanceof IShape) {
    return (
        newX >= 0 &&
        newX < gridX-1 &&
        newZ >= 0 &&
        newZ < gridZ-3 &&
        verificarColision(direction)
    );
  } else {
    return (
        newX >= 0 &&
        newX < gridX-1 &&
        newZ >= 0 &&
        newZ < gridZ-1 &&
        verificarColision(direction)
    );
  }
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
    if (keyCode === UP_ARROW) {
        tryMoveAndRotate('X');
    } else if (keyCode === RIGHT_ARROW) {
        tryMoveAndRotate('Y');
    } else if (keyCode === LEFT_ARROW) {
        tryMoveAndRotate('Z');
    }
    // Desplazamientos
    else if (key === 'w' || key === 'W') {
        moveForward();
    } else if (key === 's' || key === 'S') {
        moveBackward();
    } else if (key === 'a' || key === 'A') {
        moveLeft();
    } else if (key === 'd' || key === 'D') {
        moveRight();
    }
}

function drawGridLines() {
    // Grid guia en el plano XZ
    for (let i = 0; i <= gridX; i++) {
        line(i*scl,0,0,i*scl,0,gridZ*scl);
    }
    for (let i = 0; i <= gridZ; i++) {
        line(0,0,i*scl,gridX*scl,0,i*scl);
    }

    // Grid guia en el plano XY
    for (let i = 0; i <= gridX; i++) {
        line(i*scl,0,0,i*scl,gridY*scl,0);
    }
    for (let i = 0; i <= gridY; i++) {
        line(0,i*scl,0,gridX*scl,i*scl,0);
    }

    // Grid guia en el plano YZ
    for (let i = 0; i <= gridY; i++) {
        line(0,i*scl,0,0,i*scl,gridZ*scl);
    }
    for (let i = 0; i <= gridZ; i++) {
        line(0,0,i*scl,0,gridY*scl,i*scl);
    }
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
                        fill(0, 0, 255); // Azul
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
    return true;
}