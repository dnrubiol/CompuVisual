let scl = 20, gridX, gridY, gridZ, figuraActual, figuras = [];


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
    for (const figura of figuras) {
        figura.render();
    }

    if (frameCount % 30 === 0) {
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
        if (figuraActual.posY + n > 0) {
            figuraActual.posY -= 1;
        } else {
            figuras.push(figuraActual);
            figuraActual = generarFiguras();
        }
    }
}

class Shape {
    constructor(posX,posY,posZ){
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;
        this.shape = [[[0]]];
        this.color = color(0,0,0);
    }

    drawEntity(){
        push();
        fill(this.color);
        translate(this.posX*scl,this.posY*scl,this.posZ*scl);
        for (let i = 0; i < this.shape.length; i++) {
            push();
            for (let j = this.shape[0].length - 1; j >= 0; j--) {
                push();
                for (let k = 0; k < this.shape[0][0].length; k++) {
                    if (this.shape[i][j][k]) box(scl);
                    translate(scl,0,0);
                }
                pop();
                translate(0,scl,0);
            }
            pop();
            translate(0,0,scl);
        }
        pop();
    }

    render(){
        this.drawEntity();
    }

    rotateX(){
        let newShape = Array(this.shape.length).fill().map(
            () => Array(this.shape[0][0].length).fill().map(
                () => Array(this.shape[0].length).fill(0)
            )
        );
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[0].length; j++) {
                for (let k = 0; k < this.shape[0][0].length; k++) {
                    newShape[i][k][this.shape[0].length-j-1] = this.shape[i][j][k];
                }
            }
        }
        this.shape = newShape;
    }

    rotateY(){
        let newShape = Array(this.shape[0][0].length).fill().map(
            () => Array(this.shape[0].length).fill().map(
                () => Array(this.shape.length).fill(0)
            )
        );
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[0].length; j++) {
                for (let k = 0; k < this.shape[0][0].length; k++) {
                    newShape[k][j][this.shape.length-i-1] = this.shape[i][j][k];
                }
            }
        }
        this.shape = newShape;
    }

    rotateZ(){
        let newShape = Array(this.shape[0].length).fill().map(
            () => Array(this.shape.length).fill().map(
                () => Array(this.shape[0][0].length).fill(0)
            )
        );
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[0].length; j++) {
                for (let k = 0; k < this.shape[0][0].length; k++) {
                    newShape[this.shape[0].length-j-1][i][k] = this.shape[i][j][k];
                }
            }
        }
        this.shape = newShape;
    }
}

class TShape extends Shape{
    constructor(posX,posY,posZ) {
        super(posX,posY,posZ);
        this.shape = [[[0,0,0],
                       [0,0,0],
                       [0,0,0]],
                      [[0,0,0],
                       [1,1,1],
                       [0,1,0]],
                      [[0,0,0],
                       [0,0,0],
                       [0,0,0]]];
        this.color = color(200,0,0);
    }
}

class JShape extends Shape{
    constructor(posX,posY,posZ) {
        super(posX,posY,posZ);
        this.shape = [[[0,0,0],
                       [0,0,0],
                       [0,0,0]],
                      [[0,1,0],
                       [0,1,0],
                       [1,1,0]],
                      [[0,0,0],
                       [0,0,0],
                       [0,0,0]]];
        this.color = color(0,200,0);
    }
}

class SShape extends Shape{
    constructor(posX,posY,posZ) {
        super(posX,posY,posZ);
        this.shape = [[[0,0,0],
                       [0,0,0],
                       [0,0,0]],
                      [[1,0,0],
                       [1,1,0],
                       [0,1,0]],
                      [[0,0,0],
                       [0,0,0],
                       [0,0,0]]];
        this.color = color(0,0,200);
    }
}

class ZShape extends Shape{
    constructor(posX,posY,posZ) {
        super(posX,posY,posZ);
        this.shape = [[[1,0],
                       [0,0]],
                      [[1,1],
                       [0,1]]];
        this.color = color(200,200,0);
    }
}

class IShape extends Shape{
    constructor(posX,posY,posZ) {
        super(posX,posY,posZ);
        this.shape = [[[0,0,0,0],
                       [0,0,0,0],
                       [0,0,0,0],
                       [0,0,0,0]],
                      [[0,1,0,0],
                       [0,1,0,0],
                       [0,1,0,0],
                       [0,1,0,0]],
                      [[0,0,0,0],
                       [0,0,0,0],
                       [0,0,0,0],
                       [0,0,0,0]],
                      [[0,0,0,0],
                       [0,0,0,0],
                       [0,0,0,0],
                       [0,0,0,0]]];
        this.color = color(200,0,200);
    }
}

class CShape extends Shape{
    constructor(posX,posY,posZ) {
        super(posX,posY,posZ);
        this.shape = [[[1,1],
                       [1,1]],
                      [[0,0],
                       [0,0]]];
        this.color = color(200,0,200);
    }
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

function keyPressed() {
    if (keyCode === UP_ARROW) {
        figuraActual.rotateX();
    } else if (keyCode === RIGHT_ARROW) {
        figuraActual.rotateY();
    } else if (keyCode === LEFT_ARROW) {
        figuraActual.rotateZ();
    }
}