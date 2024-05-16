let scl = 20, gridX, gridY, gridZ, figuraActual, figuras = [], grid;
let tablero = getBoard();


function getBoard() { 
  grid = Array(20).fill().map(() =>
      Array(8).fill().map(() =>
          Array(8).fill(0)
      )
  );
  return grid;
}


function setup() {
    createCanvas(680, 480, WEBGL);
    gridX = 8;
    gridY = 16;
    gridZ = 8;
    camera(600,-600,600,0,-100,0);
    //figuraActual = new SShape(floor(gridX/2)-1,gridY,floor(gridZ/2)-1);
    figuraActual = generarFiguras();
}

function draw() {  
    background(32);
    orbitControl();
    stroke(255);
    scale(1,-1,1);

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
    translate(scl/2,scl/2,scl/2);

  
    
    figuraActual.render();
    // for (const figura of figuras) {
    //     figura.render();
    // }
   for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero[0].length; j++) {
        for (let k = 0; k < tablero[0][0].length; k++) {
            const indexI = tablero.length - 1 - i; // Invertimos el índice i
            if (tablero[indexI][j][k] === 1) {
                push();
                fill(0, 0, 255); // Azul
                translate(k * scl, indexI * scl, j * scl); // Ajustamos la altura
                box(scl);
                pop();
            }
        }
    }
}
  
//     Este if se ejecuta para cada figura actual
    if (frameCount % 10 == 0) {
        let n = undefined;
        for (const arr of figuraActual.shape) {
            for (const num of arr[arr.length-1]) {
                if (num === 1) {
                    n = 0;
                    break;
                }
            }
            if (n === 0) {
                break;
            }
        }
        for (const arr of figuraActual.shape) {
            if (n != undefined) {
                break;
            }
            for (const num of arr[arr.length-2]) {
                if (num === 1) {
                    n = 1;
                    break;
                }
            }
        }
        if (n === undefined) n = 2;
        
        if (verificarColision() ) {
            figuraActual.posY -= 1;
        } else {
            actualizarTablero();
        }
    }
  
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
                      console.log("posiciones",(figuraActual.posX),(figuraActual.posY),(figuraActual.posZ));
                      console.log("holi",(figuraActual.posY+j),(figuraActual.posZ+i),(figuraActual.posX+k));
                      tablero[figuraActual.posY+j][figuraActual.posZ + i][figuraActual.posX + k] = 1;
                    }
                }
            }
        }
    figuras.push(figuraActual);
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
                        
                      console.log("cay...",(figuraActual.posY+j-1),(figuraActual.posZ + i),(figuraActual.posX + k));
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
        newX >= 0 &&
        newX < gridX-1 &&
        newZ >= 0 &&
        newZ < gridZ-1 &&
        verificarColision(direction)
    );
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        figuraActual.rotateX();
    } else if (keyCode === RIGHT_ARROW) {
        figuraActual.rotateY();
    } else if (keyCode === LEFT_ARROW) {
        figuraActual.rotateZ();
    }
//   Desplazamientos
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