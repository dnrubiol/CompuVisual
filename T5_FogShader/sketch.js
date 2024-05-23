// Variables para los cubos
let numCubes = 15;
let cubeSize = 40;
let cubes = [];

// Variables para el shader de niebla
let fogShader;
let fogNear = 50.0;
let fogFar = 200.0;

function preload() {
  // Cargar el shader
  fogShader = loadShader('fog.vert', 'fog.frag');
}

function setup() {
  createCanvas(800, 400, WEBGL);

  // Crear los cubos
  for (let i = 0; i < numCubes; i++) {
    cubes.push(new Cube(i * (cubeSize + 10)));
  }
}

function draw() {
  background(200);

  // Usar el shader de niebla
  shader(fogShader);
  fogShader.setUniform('fogNear', fogNear);
  fogShader.setUniform('fogFar', fogFar);

  // Dibujar los cubos
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].display();
  }
}

class Cube {
  constructor(x) {
    this.x = x;
  }

  display() {
    push();
    translate(this.x - width / 2 + cubeSize / 2, 0, 0);
    box(cubeSize);
    pop();
  }
}

// Función para manejar el cambio en los sliders de fogNear y fogFar
function updateFog() {
  fogNear = map(document.getElementById('fogNearSlider').value, 0, 100, 0, 200);
  fogFar = map(document.getElementById('fogFarSlider').value, 0, 100, 0, 500);
}
