// Variables para los cubos
let numCubes = 30;
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

// Textura para todas las caras del cubo
let textureCube;

// Variable global para almacenar far de la perspectiva
let perspectiveFar = 2000;

function preload() {
    // Cargar el shader
    fogShader = loadShader('fog.vert', 'fog.frag');

    // Cargar la textura para el cubo
    textureCube = loadImage('f-texture.png');
}

function setup() {
    createCanvas(800, 400, WEBGL);

    // Asignar velocidades de rotación aleatorias para todos los cubos
    rotationSpeedX = 0.008;
    rotationSpeedY = 0.008;
    rotationSpeedZ = 0.008;

    // Configurar la perspectiva de la cámara
    let fov = 0.9; // Ajustar el FOV para hacer zoom
    let aspect = width / height;
    let near = 1;
    perspectiveFar = 2000; // asignar el valor inicial de far a la variable global
    perspective(fov, aspect, near, perspectiveFar);

    // Crear los cubos con un espacio entre ellos
    for (let i = 0; i < numCubes; i++) {
        cubes.push(new Cube(i * ((cubeSize + 2) * 2))); // Espacio entre cubos
    }

    // Crear los sliders de niebla
    createP('FogNear:');
    createSlider(0, 100, 50).input(updateFogNear);

    createP('FogFar:');
    createSlider(0, 100, 80).input(updateFogFar);
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
    fogShader.setUniform('tex0', textureCube); // Pasar la textura al shader

    // Imprimir valores de uniformes para verificar
    console.log(`fogNear: ${fogNear}, fogFar: ${fogFar}`);

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
        // Guardar la posición actual de la matriz de transformación
        push();

        // Mover al centro del cubo
        translate(this.position.x, this.position.y, this.position.z);

        // Aplicar rotación global
        rotateX(rotationAngleX);
        rotateY(rotationAngleY);
        rotateZ(rotationAngleZ);

        // Crear cada cara del cubo con la textura
        texture(textureCube);
        box(this.size); // Cubo con la textura

        // Restaurar la matriz de transformación a su estado anterior
        pop();
    }
}

function updateFogNear() {
    fogNear = map(this.value(), 0, 100, 0, 200);
    console.log(`Updated fogNear: ${fogNear}`);
}

function updateFogFar() {
    fogFar = map(this.value(), 0, 100, 0, 1000);
    perspectiveFar = map(this.value(), 0, 100, 0, 3000); // actualiza la variable global perspectiveFar
    perspective(0.9, width / height, 1, perspectiveFar); // actualizar la perspectiva con el nuevo valor de far
    console.log(`Updated fogFar: ${fogFar}`);
}
