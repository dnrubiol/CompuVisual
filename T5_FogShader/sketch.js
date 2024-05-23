// Variables para los cubos
let numCubes = 100;
let cubeSize = 50;
let cubes = [];

// Variables para el shader de niebla
let fogShader;
let fogNear = 50.0;
let fogFar = 200.0;

let angleX = 0;
let angleY = 0;

// Variables globales para la rotación
let rotationAngleX = 0;
let rotationAngleY = 0;
let rotationAngleZ = 0;
let rotationSpeedX, rotationSpeedY, rotationSpeedZ;

function preload() {
  // Cargar el shader
  fogShader = loadShader('fog.vert', 'fog.frag');
}

function setup() {
  createCanvas(800, 400, WEBGL);

  // Asignar velocidades de rotación aleatorias para todos los cubos
  rotationSpeedX = 0.008;
  rotationSpeedY = 0.008;
  rotationSpeedZ = 0.008;

  // Configurar la perspectiva de la cámara
  let fov = 0.8;  // Ajustar el FOV para hacer zoom
  let aspect = width / height;
  let near = 1;
  let far = 10000;
  perspective(fov, aspect, near, far);

  // Crear los cubos con un espacio entre ellos
  for (let i = 0; i < numCubes; i++) {
    cubes.push(new Cube(i * ((cubeSize + 2) * 2))); // Espacio entre cubos
  }
}

function draw() {
  background(200);

  // Rotar la cámara
  camera(-60, 0, 150, 0, 0, 120, 0, 1, 0); // Mover la cámara más cerca

  // Incrementar los ángulos de rotación globales
  rotationAngleX += rotationSpeedX;
  rotationAngleY += rotationSpeedY;
  rotationAngleZ += rotationSpeedZ;

  // Rotación de la escena
  rotateX(angleX);
  rotateY(angleY);

  // Usar el shader de niebla
  shader(fogShader);
  fogShader.setUniform('fogNear', fogNear);
  fogShader.setUniform('fogFar', fogFar);

  // Dibujar los cubos
  for (let cube of cubes) {
    cube.display();
  }
}

class Cube {
  constructor(x) {
    this.position = createVector(x, 0, 0);
    this.size = 58;
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    // Aplicar rotación global
    rotateX(rotationAngleX);
    rotateY(rotationAngleY);
    rotateZ(rotationAngleZ);
    box(this.size);
    pop();
  }
}

// Función para manejar el cambio en los sliders de fogNear y fogFar
function updateFog() {
  fogNear = map(document.getElementById('fogNearSlider').value, 0, 100, 0, 200);
  fogFar = map(document.getElementById('fogFarSlider').value, 0, 100, 0, 1000);
}
