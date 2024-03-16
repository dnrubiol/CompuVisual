let scl = 5, cols, rows, player, frame, aliens = [], lasers = [], alienDir, puntaje;

function setup() {
    createCanvas(800, 800);
    frame = 0;
    cols = width / scl;
    rows = height / scl;
    player = new Player(cols/2,rows-10);
    for (let i = 0; i < 8; i++) {
        aliens.push(new BackEnemy(i*16 + 2,20));
        aliens.push(new FrontEnemy(i*16,30));
    }
    alienDir = createVector(2, 0);
    puntaje = 0;
}

function draw() {
    background(0);
    noStroke();
    if (keyIsPressed) {
        registerAction();
    }
    player.render();
    let dirX = alienDir.x;
    let dirY = alienDir.y;
    for (const enemy of aliens) {
        if (frame % 60 == 0) {
            enemy.setDir(dirX,dirY);
            if (dirX === 2 && enemy.position.x + 10 >= cols) {
                alienDir = createVector(0, 2);
            } else if (dirY === 2 && enemy.position.x + 10 >= cols) {
                alienDir = createVector(-2, 0);
            } else if (dirX === -2 && enemy.position.x <= 0) {
                alienDir = createVector(0, 2);
            } else if (dirY === 2 && enemy.position.x <= 0) {
                alienDir = createVector(2, 0);
            }
        }
        enemy.render();
    }
    frame++;

    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].update();
        lasers[i].render();
        for (let j = 0; j < aliens.length; j++) {
            console.log(lasers[i]);
            if (lasers[i].hits(aliens[j])) {
                lasers[i].remove(); 
                puntaje += aliens[j].pts;
                aliens.splice(j, 1);
            } else if (lasers[i].y < 0) {
                lasers[i].remove();
            }
        }
        if (lasers[i].toDelete === true) lasers.splice(i,1);
    }
}

function registerAction(){
    if (keyIsDown(UP_ARROW)){

    }
    if (keyIsDown(LEFT_ARROW)){
      player.setDir(-1,0)
    }
    if (keyIsDown(RIGHT_ARROW)){
      player.setDir(1,0)
    }
}

function keyPressed() {
    if (key === " " || keyCode === UP_ARROW) {
      let laser = new Laser(player.position.x + 3, player.position.y - 1);
      lasers.push(laser);
    }
}