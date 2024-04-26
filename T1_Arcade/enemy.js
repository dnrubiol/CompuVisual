class Enemy extends Entity{
    constructor(x,y){
        super(x,y);
        this.color = color(255,10,10);
        this.destroyed = false;
    }

    render(){
        if (frame % 60 < 30 && !this.destroyed) {
            this.shape = this.shapeList[0];
        } else {
            this.shape = this.shapeList[1];
        }
        this.drawEntity();
    }

    setDir(x,y){
        this.position.add(createVector(x,y));
    }
}

class MiddleEnemy extends Enemy{
    constructor(x,y) {
        super(x,y);
        this.shape = [[0,0,1,0,0,0,0,0,1,0,0],
                      [0,0,0,1,0,0,0,1,0,0,0],
                      [0,0,1,1,1,1,1,1,1,0,0],
                      [0,1,1,0,1,1,1,0,1,1,0],
                      [1,1,1,1,1,1,1,1,1,1,1],
                      [1,0,1,1,1,1,1,1,1,0,1],
                      [1,0,1,0,0,0,0,0,1,0,1],
                      [0,0,0,1,1,0,1,1,0,0,0]];
        this.shapeList = [[[0,0,1,0,0,0,0,0,1,0,0],
                            [0,0,0,1,0,0,0,1,0,0,0],
                            [0,0,1,1,1,1,1,1,1,0,0],
                            [0,1,1,0,1,1,1,0,1,1,0],
                            [1,1,1,1,1,1,1,1,1,1,1],
                            [1,0,1,1,1,1,1,1,1,0,1],
                            [1,0,1,0,0,0,0,0,1,0,1],
                            [0,0,0,1,1,0,1,1,0,0,0]],
                          [[0,0,1,0,0,0,0,0,1,0,0],
                          [1,0,0,1,0,0,0,1,0,0,1],
                          [1,0,1,1,1,1,1,1,1,0,1],
                          [1,1,1,0,1,1,1,0,1,1,1],
                          [1,1,1,1,1,1,1,1,1,1,1],
                          [0,1,1,1,1,1,1,1,1,1,0],
                          [0,0,1,0,0,0,0,0,1,0,0],
                          [0,1,0,0,0,0,0,0,0,1,0]],];
        this.width = this.shape[0].length;
        this.height = this.shape.length;
    }
}

class FrontEnemy extends Enemy{
    constructor(x,y) {
        super(x,y);
        this.shape = [[0,0,0,0,1,1,1,1,0,0,0,0],
                      [0,1,1,1,1,1,1,1,1,1,1,0],
                      [1,1,1,1,1,1,1,1,1,1,1,1],
                      [1,1,1,0,0,1,1,0,0,1,1,1],
                      [1,1,1,1,1,1,1,1,1,1,1,1],
                      [0,0,0,1,1,0,0,1,1,0,0,0],
                      [0,0,1,1,0,1,1,0,1,1,0,0],
                      [1,1,0,0,0,0,0,0,0,0,1,1]];
        this.shapeList = [[[0,0,0,0,1,1,1,1,0,0,0,0],
                           [0,1,1,1,1,1,1,1,1,1,1,0],
                           [1,1,1,1,1,1,1,1,1,1,1,1],
                           [1,1,1,0,0,1,1,0,0,1,1,1],
                           [1,1,1,1,1,1,1,1,1,1,1,1],
                           [0,0,0,1,1,0,0,1,1,0,0,0],
                           [0,0,1,1,0,1,1,0,1,1,0,0],
                           [1,1,0,0,0,0,0,0,0,0,1,1]],
                          [[0,0,0,0,1,1,1,1,0,0,0,0],
                           [0,1,1,1,1,1,1,1,1,1,1,0],
                           [1,1,1,1,1,1,1,1,1,1,1,1],
                           [1,1,1,0,0,1,1,0,0,1,1,1],
                           [1,1,1,1,1,1,1,1,1,1,1,1],
                           [0,0,1,1,1,0,0,1,1,1,0,0],
                           [0,1,1,0,0,1,1,0,0,1,1,0],
                           [0,0,1,1,0,0,0,0,1,1,0,0]],];
        this.width = this.shape[0].length;
        this.height = this.shape.length;
    }
}

class BackEnemy extends Enemy{
    constructor(x,y) {
        super(x,y);
        this.shape = [[0,0,0,1,1,0,0,0],
                      [0,0,1,1,1,1,0,0],
                      [0,1,1,1,1,1,1,0],
                      [1,1,0,1,1,0,1,1],
                      [1,1,1,1,1,1,1,1],
                      [0,1,0,1,1,0,1,0],
                      [1,0,0,0,0,0,0,1],
                      [0,1,0,0,0,0,1,0]];
        this.shapeList = [[[0,0,0,1,1,0,0,0],
                          [0,0,1,1,1,1,0,0],
                          [0,1,1,1,1,1,1,0],
                          [1,1,0,1,1,0,1,1],
                          [1,1,1,1,1,1,1,1],
                          [0,1,0,1,1,0,1,0],
                          [1,0,0,0,0,0,0,1],
                          [0,1,0,0,0,0,1,0]],
                          [[0,0,0,1,1,0,0,0],
                          [0,0,1,1,1,1,0,0],
                          [0,1,1,1,1,1,1,0],
                          [1,1,0,1,1,0,1,1],
                          [1,1,1,1,1,1,1,1],
                          [0,0,1,0,0,1,0,0],
                          [0,1,0,1,1,0,1,0],
                          [1,0,1,0,0,1,0,1]],];
        this.width = this.shape[0].length;
        this.height = this.shape.length;
    }
}