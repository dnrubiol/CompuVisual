let scl = 5,
  cols,
  rows,
  player,
  frame,
  aliens = [],
  lasers = [],
  bunkers = [],
  alienDir,
  alienSpeed,
  puntaje,
  level,
  attacks = [],
  vidas,
  shipEnemy = 0;
(gameStarted = false), (invulnerable = false), (shipEnemyHit = false);

let lastShootTime = 0; // Variable para almacenar el tiempo del último disparo
let shootDelay = 500; // Retardo en milisegundos entre disparos

function setup() {
  createCanvas(800, 800);
  frame = 0;
  cols = width / scl;
  rows = height / scl;
  shipEnemy = new ShipEnemy(-shipEnemy.width, 10);
  //setupLevel1();
  alienDir = createVector(alienSpeed, 0);
  puntaje = 0;
  vidas = 3;
}

function draw() {
  background(0);
  textSize(30);
  noStroke();
  registerAction();

  if (gameStarted) {
    player.render();
    let dirX = alienDir.x;
    let dirY = alienDir.y;
    for (const enemy of aliens) {
      if (frame % 60 == 0) {
        enemy.setDir(dirX, dirY);
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
    createAttack();
    
    if (!shipEnemy.isDestroyed()) {
      shipEnemy.update(); // Actualiza la posición de ShipEnemy
      shipEnemy.render(); // Renderiza ShipEnemy
    }
    for (let i = attacks.length - 1; i >= 0; i--) {
      attacks[i].updateAlien();
      attacks[i].render();

      if (attacks[i].hits(player)) {
        // Verifica si un láser golpea al jugador
        attacks[i].remove();
        if (!invulnerable) {
          // Si el jugador no es invulnerable
          vidas--; // Reduce una vida
          if (vidas > 0) {
            player.position.x = cols / 2; // Restablece la posición del jugador en el centro
            player.position.y = rows - 10;
            invulnerable = true; // Marca al jugador como invulnerable
            setTimeout(() => {
              invulnerable = false;
            }, 2000); // Después de 2 segundos, el jugador deja de ser invulnerable
          } else {
            gameOver();
            noLoop();
            return;
          }
        }
      } else if (attacks[i].y > height) {
        // Si el láser alcanza la parte inferior de la pantalla
        attacks[i].remove();
      }

      if (!attacks[i].toDelete) {
        for (let j = 0; j < bunkers.length; j++) {
          if (attacks[i].hits(bunkers[j])) {
            attacks[i].remove();
          }
        }
      }

      if (attacks[i].toDelete === true) attacks.splice(i, 1);
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();
      lasers[i].render();
      for (let j = 0; j < aliens.length; j++) {
        if (lasers[i].hits(aliens[j])) {
          lasers[i].remove();
          if (aliens[j] instanceof BackEnemy) {
            puntaje += 25;
          } else if (aliens[j] instanceof FrontEnemy) {
            puntaje += 10;
          } else if (aliens[j] instanceof MiddleEnemy) {
            puntaje += 15;
          }
          aliens.splice(j, 1);
        } else if (lasers[i].y < 0) {
          lasers[i].remove();
        } else if (lasers[i].hits(shipEnemy) && !shipEnemyHit) {
          lasers[i].remove();
          puntaje += 50;
          shipEnemyHit = true;  
          shipEnemy.destroy();
          break;
        }
      }
      if (!lasers[i].toDelete) {
        for (let j = 0; j < bunkers.length; j++) {
          if (lasers[i].hits(bunkers[j])) {
            lasers[i].remove();
          }
        }
      }
      if (lasers[i].toDelete === true) lasers.splice(i, 1);
    }

    if (aliens.length === 0 && shipEnemyHit) {
      if (level === 1) {
        setupLevel2();
      } else if (level === 2) {
        setupLevel3();
      } else if (level === 3) {
        setupLevel4();
      }
    }

    frame++;
    translate(100, 35); //Imprimir vidas
    fill(255, 0, 0);
    text("Vidas: " + vidas, 0, 0);
    
    translate(300, 0);
    fill(255, 0, 0);
    text("Nivel: " + level, 0, 0);

    translate(300, 0); //Imprimir puntaje
    fill(255, 0, 0);
    text("Puntaje: " + puntaje, 0, 0);

  } else {
    drawStartScreen();
  }
}

function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("¡Bienvenido a Space Invaders!", width / 2, height / 2 - 50);
  textSize(30);
  text("Presiona 'Play' para comenzar", width / 2, height / 2 + 50);

  // Dibuja el botón "Play"
  fill(0, 255, 0);
  rect(width / 2 - 50, height / 2 + 100, 100, 50);
  fill(255);
  textSize(20);
  text("Play", width / 2, height / 2 + 125);
}

function registerAction() {
  if (keyIsDown(UP_ARROW)) {
  }
  if (keyIsDown(LEFT_ARROW)) {
    player.setDir(-1, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.setDir(1, 0);
  }
}

function createAttack() {
  if (frameCount % 45 == 0 && aliens.length > 2) {
    let availableFrontEnemies = aliens.filter(
      (enemy) => enemy instanceof FrontEnemy
    );

    if (availableFrontEnemies.length > 0) {
      let randomIndex = floor(random(availableFrontEnemies.length));
      let randomEnemy = availableFrontEnemies[randomIndex];

      let ataque = new Laser(
        randomEnemy.position.x + randomEnemy.width / 2,
        randomEnemy.position.y
      );
      attacks.push(ataque);
    }
  }
}

function keyPressed() {
  if (key === " " || keyCode === UP_ARROW) {
    let currentTime = millis(); // Obtener el tiempo actual
    if (currentTime - lastShootTime > shootDelay) {
      // Verificar si ha pasado suficiente tiempo desde el último disparo
      let laser = new Laser(player.position.x + 3, player.position.y - 1);
      lasers.push(laser);
      lastShootTime = currentTime; // Actualizar el tiempo del último disparo
    }
  }
}

function gameOver() {
  // Dibuja un rectángulo semitransparente en toda la pantalla para oscurecer el fondo
  fill(0, 0, 0, 150); // Color negro con opacidad al 150%
  rect(0, 0, width, height); // Rectángulo que cubre toda la pantalla

  // Configura el estilo del texto para el mensaje de "Game Over"
  fill(255); // Color blanco
  textAlign(CENTER, CENTER); // Alinea el texto al centro

  // Dibuja el mensaje de "Game Over" en el centro de la pantalla
  textSize(50); // Tamaño del texto
  text("Game Over", width / 2, height / 2); // Posición del texto
}

function setupLevel1() {
  level = 1;
  player = new Player(cols / 2, rows - 10);
  aliens = [];
  lasers = [];
  bunkers = [];
  for (let i = 0; i < 6; i++) {
    aliens.push(new MiddleEnemy(i * 21 + 2, 20));
    aliens.push(new FrontEnemy(i * 21, 30));
  }
  for (let i = 0; i < 4; i++) {
    bunkers.push(new Bunker((i * cols) / 4 + cols / 8 - 8, rows - 30));
  }
  alienSpeed = 2;
  alienDir = createVector(alienSpeed, 0);
  console.log(aliens);
}

function setupLevel2() {
  level = 2;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  for (let i = 0; i < 6; i++) {
    aliens.push(new BackEnemy(i * 21, 20));
    aliens.push(new MiddleEnemy(i * 21 + 2, 30));
    aliens.push(new FrontEnemy(i * 21, 40));
  }
  for (let i = 0; i < 4; i++) {
    bunkers.push(new Bunker((i * cols) / 4 + cols / 8 - 8, rows - 30));
  }
  alienSpeed = 4;
  alienDir = createVector(alienSpeed, 0);
}

function setupLevel3() {
  level = 3;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  //aliens.push(shipEnemy);
  for (let i = 0; i < 8; i++) {
    aliens.push(new BackEnemy(i * 16 + 2, 20));
    aliens.push(new MiddleEnemy(i * 16, 30));
    aliens.push(new MiddleEnemy(i * 16 + 2, 40));
    aliens.push(new FrontEnemy(i * 16, 50));
  }
  for (let i = 0; i < 3; i++) {
    bunkers.push(new Bunker((i * cols) / 3 + cols / 6 - 8, rows - 30));
  }
  alienSpeed = 6;
  alienDir = createVector(alienSpeed, 0);
}

function setupLevel4() {
  level = 4;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  //aliens.push(shipEnemy);
  for (let i = 0; i < 8; i++) {
    aliens.push(new BackEnemy(i * 16 + 2, 20));
    aliens.push(new BackEnemy(i * 16, 30));
    aliens.push(new MiddleEnemy(i * 16 + 2, 40));
    aliens.push(new MiddleEnemy(i * 16, 50));
    aliens.push(new FrontEnemy(i * 16 + 2, 60));
    aliens.push(new FrontEnemy(i * 16, 70));
  }
  for (let i = 0; i < 3; i++) {
    bunkers.push(new Bunker((i * cols) / 3 + cols / 6 - 8, rows - 30));
  }
  alienSpeed = 8;
  alienDir = createVector(alienSpeed, 0);
}

function mousePressed() {
  if (!gameStarted) {
    // Si el juego no ha comenzado y se hizo clic
    if (
      mouseX > width / 2 - 50 &&
      mouseX < width / 2 + 50 &&
      mouseY > height / 2 + 100 &&
      mouseY < height / 2 + 150
    ) {
      // Si se hizo clic en el botón "Play"
      startGame(); // Comienza el juego
    }
  }
}

function startGame() {
  gameStarted = true; // Establece el estado del juego como comenzado
  setupLevel1(); // Configura el primer nivel del juego
}
