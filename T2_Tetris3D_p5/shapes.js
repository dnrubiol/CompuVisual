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
            for (let j = 0; j < this.shape[0].length; j++) {
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