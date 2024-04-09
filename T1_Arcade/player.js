class Player extends Entity{
    constructor(x,y){
        super(x,y);
        this.shape = [[0,0,0,1,0,0,0],
                      [0,0,0,1,0,0,0],
                      [0,0,0,1,0,0,0],
                      [1,1,1,1,1,1,1],];
        this.color = color(10,255,10);
        this.width = this.shape[0].length;  ///
        this.height = this.shape.length;    ///
    }

    setDir(x,y){
        //this.position.add(createVector(x,y));
        let newPosition = createVector(this.position.x + x, this.position.y + y);
        
        if (newPosition.x >= 0 && newPosition.x + this.shape[0].length <= width/scl) {
          this.position = newPosition;  
          //console.log(width);
          //console.log(newPosition.x + this.shape[0].length);
        }
    }
}