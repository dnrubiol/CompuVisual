let scl = 5, cols, rows, player, frame, aliens = [], lasers = [], bunkers = [], alienDir, alienSpeed, puntaje, level;

function setup() {
    createCanvas(800, 800);
    frame = 0;
    cols = width / scl;
    rows = height / scl;
    setupLevel1();
    alienDir = createVector(alienSpeed, 0);
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
            if (dirX === alienSpeed && enemy.position.x + 10 >= cols) {
                alienDir = createVector(0, alienSpeed);
            } else if (dirY === alienSpeed && enemy.position.x + 10 >= cols) {
                alienDir = createVector(-alienSpeed, 0);
            } else if (dirX === -alienSpeed && enemy.position.x <= 0) {
                alienDir = createVector(0, alienSpeed);
            } else if (dirY === alienSpeed && enemy.position.x <= 0) {
                alienDir = createVector(alienSpeed, 0);
            }
        }
        enemy.render();
    }

    for (const bunker of bunkers) {
        bunker.render();
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].update();
        lasers[i].render();
        for (let j = 0; j < aliens.length; j++) {
            //console.log(lasers[i]);
            if (lasers[i].hits(aliens[j])) {
                lasers[i].remove(); 
                puntaje += aliens[j].pts;
                aliens.splice(j, 1);
            } else if (lasers[i].y < 0) {
                lasers[i].remove();
            }
        }
        if (lasers[i].toDelete === false) {
            for (let j = 0; j < bunkers.length; j++) {
                if (lasers[i].hits(bunkers[j])) {
                    lasers[i].remove(); 
                }
            }
        }

        if (lasers[i].toDelete === true) lasers.splice(i,1);
    }

    if (aliens.length === 0) {
        if (level === 1) {
            setupLevel2();
        } else if (level === 2) {
            setupLevel3();
        } else if (level === 3) {
            setupLevel4();
        }
    }

    frame++;
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

function setupLevel1() {
    level = 1;
    player = new Player(cols/2,rows-10);
    aliens = []; 
    lasers = []; 
    bunkers = [];
    for (let i = 0; i < 6; i++) {
        aliens.push(new BackEnemy(i*21 + 2,20));
        aliens.push(new FrontEnemy(i*21,30));
    }
    for (let i = 0; i < 4; i++) {
        bunkers.push(new Bunker(i*cols/4+cols/8-8,rows - 30));
    }
    alienSpeed = 2;
    alienDir = createVector(alienSpeed, 0);
    puntaje = 0;
}

function setupLevel2() {
    level = 2;
    player = new Player(cols/2,rows-10);
    aliens = []; 
    lasers = []; 
    bunkers = [];
    for (let i = 0; i < 6; i++) {
        aliens.push(new BackEnemy(i*21 + 2,10));
        aliens.push(new BackEnemy(i*21 + 2,20));
        aliens.push(new FrontEnemy(i*21,30));
    }
    for (let i = 0; i < 4; i++) {
        bunkers.push(new Bunker(i*cols/4+cols/8-8,rows - 30));
    }
    alienSpeed = 4;
    alienDir = createVector(alienSpeed, 0);
    puntaje = 0;
}

function setupLevel3() {
    level = 3;
    player = new Player(cols/2,rows-10);
    aliens = []; 
    lasers = []; 
    bunkers = [];
    for (let i = 0; i < 8; i++) {
        aliens.push(new BackEnemy(i*16 + 2,10));
        aliens.push(new BackEnemy(i*16 + 2,20));
        aliens.push(new FrontEnemy(i*16,30));
        aliens.push(new FrontEnemy(i*16,40));
    }
    for (let i = 0; i < 3; i++) {
        bunkers.push(new Bunker(i*cols/3+cols/6-8,rows - 30));
    }
    alienSpeed = 6;
    alienDir = createVector(alienSpeed, 0);
    puntaje = 0;
}

function setupLevel4() {
    level = 4;
    player = new Player(cols/2,rows-10);
    aliens = []; 
    lasers = []; 
    bunkers = [];
    for (let i = 0; i < 8; i++) {
        aliens.push(new BackEnemy(i*16 + 2,-10));
        aliens.push(new BackEnemy(i*16 + 2,0));
        aliens.push(new BackEnemy(i*16 + 2,10));
        aliens.push(new BackEnemy(i*16 + 2,20));
        aliens.push(new FrontEnemy(i*16,30));
        aliens.push(new FrontEnemy(i*16,40));
    }
    for (let i = 0; i < 3; i++) {
        bunkers.push(new Bunker(i*cols/3+cols/6-8,rows - 30));
    }
    alienSpeed = 8;
    alienDir = createVector(alienSpeed, 0);
    puntaje = 0;
}