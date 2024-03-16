class Entity{
    constructor(x,y){
        this.position = createVector(x,y);
        this.shape = [[0]];
        this.color = color(0,0,0);
    }

    drawEntity(){
        push();
        fill(this.color);
        for (let i = 0; i < this.shape.length; i++) {
            for (let j = 0; j < this.shape[0].length; j++) {
                if (this.shape[i][j]) rect((this.position.x+j)*scl,(this.position.y+i)*scl,scl,scl);
            }
        }
        pop();
    }

    render(){
        this.drawEntity();
    }
}