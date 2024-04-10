let scl = 5,
  cols,
  rows,
  player,
  frame,
  aliens = [],
  lasers = [],
  bunkers = [],
  alienDir,
  puntaje,
  attacks = [],
  vidas,
  shipEnemy=0;
  invulnerable = false;

let lastShootTime = 0; // Variable para almacenar el tiempo del último disparo
let shootDelay = 500; // Retardo en milisegundos entre disparos


function setup() {
  createCanvas(800, 800);
  frame = 0;
  cols = width / scl;
  rows = height / scl;
  player = new Player(cols / 2, rows - 10);

  // Agregar una nueva fila de aliens
  for (let i = 0; i < 8; i++) {
      aliens.push(new BackEnemy(i*16 + 2, 20)); // Cambiar la coordenada Y para ajustar la posición de la nueva fila
      aliens.push(new FirstEnemy(i*16, 30)); // Cambiar la coordenada Y para ajustar la posición de la nueva fila
  }

  for (let i = 0; i < 8; i++) {
    aliens.push(new SecondEnemy(i*16 + 2,40));
    aliens.push(new FrontEnemy(i*16,50));
  }

  for (let i = 0; i < 4; i++) {
    bunkers.push(new Bunker((i * cols) / 4 + cols / 8 - 8, rows - 30));
  }
  alienDir = createVector(2, 0);
  puntaje = 0;
  vidas = 3;
  shipEnemy = new ShipEnemy(-shipEnemy.width, 10);
}

function draw() {
  background(0);
  textSize(30);
  noStroke();
  //console.log("Console");
  if (keyIsPressed) {
    registerAction();
  }
  player.render();
  let dirX = alienDir.x;
  let dirY = alienDir.y;
  for (const enemy of aliens) {
    if (frame % 60 == 0) {
      enemy.setDir(dirX, dirY);
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
  shipEnemy.update(); // Actualiza la posición de ShipEnemy
  shipEnemy.render(); // Renderiza ShipEnemy

  for (const bunker of bunkers) {
    bunker.render();
  }
  createAttack();

  for (let i = attacks.length - 1; i >= 0; i--) {
    attacks[i].updateAlien();
    attacks[i].render();
    
    if (attacks[i].hits(player)) { // Verifica si un láser golpea al jugador
      attacks[i].remove();
      if (!invulnerable) { // Si el jugador no es invulnerable
        vidas -= 1; // Reduce una vida
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
    } else if (attacks[i].y > height) { // Si el láser alcanza la parte inferior de la pantalla
      attacks[i].remove();
    }

    if (!attacks[i].toDelete) {
        for (let j = 0; j < bunkers.length; j++) {
          if (attacks[i].hits(bunkers[j])) {
            attacks[i].remove();
          }
        }
      }

    if (attacks[i].toDelete === true) attacks.splice(i,1);
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    lasers[i].render();
    for (let j = 0; j < aliens.length; j++) {
      if (lasers[i].hits(aliens[j])) {
        lasers[i].remove();
        if (aliens[j] instanceof BackEnemy) {
          puntaje += 10;
        } else if (aliens[j] instanceof FrontEnemy) {
          puntaje += 5;
        }
        aliens.splice(j, 1);
      } else if (lasers[i].y < 0) {
        lasers[i].remove();
      }
    }
    if (!lasers[i].toDelete) {
      for (let j = 0; j < bunkers.length; j++) {
        if (lasers[i].hits(bunkers[j])) {
          lasers[i].remove();
        }
      }
    }
    if (lasers[i].toDelete === true) lasers.splice(i,1);
  }

  frame++;
  translate(30, 35);  //Imprimir vidas
  fill(255, 0, 0);
  text("Vidas: " + vidas, 0, 0);

  translate(580, 0);  //Imprimir puntaje
  fill(255, 0, 0);
  text("Puntaje: " + puntaje, 0, 0);
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
    let availableFrontEnemies = aliens.filter(enemy => enemy instanceof FrontEnemy);

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
      if (currentTime - lastShootTime > shootDelay) { // Verificar si ha pasado suficiente tiempo desde el último disparo
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