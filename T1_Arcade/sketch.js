let scl = 5,
  cols,
  rows,
  player,
  frame,
  backAlienStorage = [],
  middleAlienStorage = [],
  frontAlienStorage = [],
  aliens = [],
  laserStorage = [],
  lasers = [],
  bunkerStorage = [],
  bunkers = [],
  alienDir,
  alienSpeed,
  puntaje,
  level,
  attackStorage = [],
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
  for (let i = 0; i < 200; i++) {
    attackStorage.push(new Laser(
      -10,
      -10
    ));
  }
  for (let i = 0; i < 10; i++) {
    laserStorage.push(new Laser(
      -10,
      -10
    ));
  }
  for (let i = 0; i < 20; i++) {
    backAlienStorage.push(new BackEnemy(
      -10,
      -10
    ));
    middleAlienStorage.push(new MiddleEnemy(
      -10,
      -10
    ));
    frontAlienStorage.push(new FrontEnemy(
      -10,
      -10
    ));
  }
  for (let i = 0; i < 4; i++) {
    bunkerStorage.push(new Bunker(
      -10,
      -10
    ));
  }
}

function draw() {
  background(0);
  textSize(30);
  noStroke();
  registerAction();
  function limpiarRecolectorBasura() {
    // Asignar null a una variable grande para liberar memoria
    let datosGrandes = null;
    // Ejecutar la recolección de basura explícitamente
    if (window.gc) {
      window.gc();
    }
  }

  setInterval(limpiarRecolectorBasura, 1000); // Limpia cada 60 segundos (60000 milisegundos)

  if (vidas <= 0) {
    gameOver();
    return;
  }

  if (gameStarted) {
    player.render();
    if (frame % 60 == 0) {
      let dirX = alienDir.x;
      let dirY = alienDir.y;
      let minPosition = 2 * cols;
      let maxPosition = -10;
      for (const enemy of aliens) {
        if (enemy.position.x > maxPosition) {
          maxPosition = enemy.position.x;
        }
        if (enemy.position.x < minPosition) {
          minPosition = enemy.position.x;
        }
        enemy.setDir(dirX, dirY);
      }
      if (dirX === alienSpeed && maxPosition + 10 >= cols) {
        alienDir = createVector(0, alienSpeed);
      } else if (dirY === alienSpeed && maxPosition + 10 >= cols) {
        alienDir = createVector(-alienSpeed, 0);
      } else if (dirX === -alienSpeed && minPosition <= 0) {
        alienDir = createVector(0, alienSpeed);
      } else if (dirY === alienSpeed) {
        alienDir = createVector(alienSpeed, 0);
      }
    }
    for (const enemy of aliens) {
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

      if (attacks[i].toDelete) {
        attacks[i].toDelete = false;
        attacks[i].isExploded = false;
        attackStorage.push(attacks.splice(i, 1)[0]);
      } 
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();
      lasers[i].render();
      for (let j = 0; j < aliens.length; j++) {
        if (lasers[i].hits(aliens[j])) {
          lasers[i].remove();
          if (aliens[j] instanceof BackEnemy) {
            puntaje += 25;
            backAlienStorage.push(aliens.splice(j, 1)[0]);
          } else if (aliens[j] instanceof FrontEnemy) {
            puntaje += 10;
            frontAlienStorage.push(aliens.splice(j, 1)[0]);
          } else if (aliens[j] instanceof MiddleEnemy) {
            puntaje += 15;
            middleAlienStorage.push(aliens.splice(j, 1)[0]);
          }
        }
      }
      if (lasers[i].hits(shipEnemy) && !shipEnemyHit) {
        lasers[i].remove();
        puntaje += 50;
        shipEnemyHit = true;
        shipEnemy.destroy();
        shipEnemy.position.x = -shipEnemy.width;
        shipEnemy.position.y = 10;
      }
      if (!lasers[i].toDelete) {
        for (let j = 0; j < bunkers.length; j++) {
          if (lasers[i].hits(bunkers[j])) {
            lasers[i].remove();
          } else if (lasers[i].y < 0) {
            lasers[i].remove();
          }
        }
      }
      if (lasers[i].toDelete) {
        lasers[i].toDelete = false;
        lasers[i].isExploded = false;
        laserStorage.push(lasers.splice(i, 1)[0]);
      } 
    }

    if (aliens.length === 0 || shipEnemyHit) {
      if (level === 1) {
        setupLevel2();
      } else if (level === 2) {
        setupLevel3();
      } else if (level === 3) {
        setupLevel4();
      } else if (level === 4) {
        gameStarted = false;
        vidas = 3;
        level = 0;
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
    if (level === 0) {
      gameWon();
    } else {
      drawStartScreen();
    }
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

function gameWon() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(50);
  text("¡Ganaste!", width / 2, height / 2 - 50);
  textSize(30);
  text("Puntaje: " + puntaje, width / 2, height / 2 + 50);
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
  if (aliens.length > 0) {
    let attackFrequency = floor(60 * (5 / aliens.length)) + 1;
    if (frameCount % attackFrequency == 0) {
      let randomIndex = floor(random(aliens.length));
      let randomEnemy = aliens[randomIndex];

      let ataque = attackStorage.pop();
      if (ataque === undefined) {
        ataque = new Laser(
          randomEnemy.position.x + randomEnemy.width / 2,
          randomEnemy.position.y
        );
      }
      ataque.x = randomEnemy.position.x + randomEnemy.width / 2;
      ataque.y = randomEnemy.position.y;
      attacks.push(ataque);
    }
  }
}

function keyPressed() {
  if (key === " " || keyCode === UP_ARROW) {
    let currentTime = millis(); // Obtener el tiempo actual
    if (currentTime - lastShootTime > shootDelay) {
      // Verificar si ha pasado suficiente tiempo desde el último disparo
      let laser = laserStorage.pop();
      if (laser === undefined) {
        laser = new Laser(
          player.position.x + 3,
          player.position.y - 1
        );
      }
      laser.x = player.position.x + 3;
      laser.y = player.position.y - 1;
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
  removeAllLasers();
  removeAllAttacks();
  removeAllAliens();
  removeAllBunkers();
  level = 1;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  let alien = undefined;
  let bunker = undefined;
  for (let i = 0; i < 6; i++) {
    alien = middleAlienStorage.pop();
    alien.position.x = i * 21 + 2;
    alien.position.y = 20;
    aliens.push(alien);
    alien = frontAlienStorage.pop();
    alien.position.x = i * 21;
    alien.position.y = 30;
    aliens.push(alien);
  }
  for (let i = 0; i < 4; i++) {
    bunker = bunkerStorage.pop();
    bunker.position.x = (i * cols) / 4 + cols / 8 - 8;
    bunker.position.y = rows - 50;
    bunkers.push(bunker);
  }
  alienSpeed = 2;
  alienDir = createVector(alienSpeed, 0);
}

function setupLevel2() {
  removeAllLasers();
  removeAllAttacks();
  removeAllAliens();
  removeAllBunkers();
  level = 2;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  let alien = undefined;
  let bunker = undefined;
  for (let i = 0; i < 6; i++) {
    alien = backAlienStorage.pop();
    alien.position.x = i * 21;
    alien.position.y = 20;
    aliens.push(alien);
    alien = middleAlienStorage.pop();
    alien.position.x = i * 21 + 2;
    alien.position.y = 30;
    aliens.push(alien);
    alien = frontAlienStorage.pop();
    alien.position.x = i * 21;
    alien.position.y = 40;
    aliens.push(alien);
  }
  for (let i = 0; i < 4; i++) {
    bunker = bunkerStorage.pop();
    bunker.position.x = (i * cols) / 4 + cols / 8 - 8;
    bunker.position.y = rows - 50;
    bunkers.push(bunker);
  }
  alienSpeed = 4;
  alienDir = createVector(alienSpeed, 0);
}

function setupLevel3() {
  removeAllLasers();
  removeAllAttacks();
  removeAllAliens();
  removeAllBunkers();
  level = 3;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  let alien = undefined;
  let bunker = undefined;
  //aliens.push(shipEnemy);
  for (let i = 0; i < 8; i++) {
    alien = backAlienStorage.pop();
    alien.position.x = i * 16 + 2;
    alien.position.y = 20;
    aliens.push(alien);
    alien = middleAlienStorage.pop();
    alien.position.x = i * 16;
    alien.position.y = 30;
    aliens.push(alien);
    alien = middleAlienStorage.pop();
    alien.position.x = i * 16 + 2;
    alien.position.y = 40;
    aliens.push(alien);
    alien = frontAlienStorage.pop();
    alien.position.x = i * 16;
    alien.position.y = 50;
    aliens.push(alien);
  }
  for (let i = 0; i < 3; i++) {
    bunker = bunkerStorage.pop();
    bunker.position.x = round((i * cols) / 3 + cols / 6 - 8);
    bunker.position.y = rows - 50;
    bunkers.push(bunker);
  }
  alienSpeed = 6;
  alienDir = createVector(alienSpeed, 0);
}

function setupLevel4() {
  removeAllLasers();
  removeAllAttacks();
  removeAllAliens();
  removeAllBunkers();
  level = 4;
  player = new Player(cols / 2, rows - 10);
  shipEnemy.destroyed = false;
  shipEnemyHit = false;
  aliens = [];
  lasers = [];
  bunkers = [];
  let alien = undefined;
  let bunker = undefined;
  //aliens.push(shipEnemy);
  for (let i = 0; i < 8; i++) {
    alien = backAlienStorage.pop();
    alien.position.x = i * 16 + 2;
    alien.position.y = 20;
    aliens.push(alien);
    alien = backAlienStorage.pop();
    alien.position.x = i * 16;
    alien.position.y = 30;
    aliens.push(alien);
    alien = middleAlienStorage.pop();
    alien.position.x = i * 16 + 2;
    alien.position.y = 40;
    aliens.push(alien);
    alien = middleAlienStorage.pop();
    alien.position.x = i * 16;
    alien.position.y = 50;
    aliens.push(alien);
    alien = frontAlienStorage.pop();
    alien.position.x = i * 16 + 2;
    alien.position.y = 60;
    aliens.push(alien);
    alien = frontAlienStorage.pop();
    alien.position.x = i * 16;
    alien.position.y = 70;
    aliens.push(alien);
  }
  for (let i = 0; i < 3; i++) {
    bunker = bunkerStorage.pop();
    bunker.position.x = round((i * cols) / 3 + cols / 6 - 8);
    bunker.position.y = rows - 50;
    bunkers.push(bunker);
  }
  alienSpeed = 8;
  alienDir = createVector(alienSpeed, 0);
}

function mousePressed() {
  if (level === 0) {
    level = 1;
  } else if (!gameStarted) {
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
  } else if (vidas <= 0) {
    gameStarted = false;
    vidas = 3;
  }
}

function startGame() {
  gameStarted = true; // Establece el estado del juego como comenzado
  setupLevel1(); // Configura el primer nivel del juego
}

function removeAllLasers() {
  for (let i = lasers.length - 1; i >= 0; i--) {
    laserStorage.push(lasers.splice(i, 1)[0]);
  }
}

function removeAllAttacks() {
  for (let i = attacks.length - 1; i >= 0; i--) {
    attackStorage.push(attacks.splice(i, 1)[0]);
  }
}

function removeAllAliens() {
  let alien;
  for (let i = aliens.length - 1; i >= 0; i--) {
    alien = aliens.splice(i, 1)[0];
    if (alien instanceof FrontEnemy) {
      frontAlienStorage.push(alien);
    } else if (alien instanceof MiddleEnemy) {
      middleAlienStorage.push(alien);
    } else if (alien instanceof BackEnemy) {
      backAlienStorage.push(alien);
    }
  }
}

function removeAllBunkers() {
  for (let i = bunkers.length - 1; i >= 0; i--) {
    bunkerStorage.push(bunkers.splice(i, 1)[0]);
  }
}