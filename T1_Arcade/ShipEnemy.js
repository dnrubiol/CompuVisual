class ShipEnemy extends Enemy{
    constructor(x,y) {
        super(x,y);
        this.shape = [[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
                      [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                      [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
                      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                      [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
                      [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0]];
        this.shapeList =  [[[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
                            [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                            [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                            [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
                            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                            [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
                            [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0]],
                          [[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
                      [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
                      [0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
                      [0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
                      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                      [0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0],
                      [0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0]],];
        this.width = this.shape[0].length;
        this.height = this.shape.length;
        this.speed = 1; // Velocidad de la nave
        this.destroyed = false;
    }
    update() {
          // Mover la nave horizontalmente
          this.position.x += this.speed;

          // Si la nave sale completamente de la pantalla, reaparece al lado derecho
          if (this.position.x > width) {
              this.position.x = -this.width;
          }
      }
    isDestroyed(){
        return this.destroyed;
    }
    destroy(){
        return this.destroyed = true;
    }
}