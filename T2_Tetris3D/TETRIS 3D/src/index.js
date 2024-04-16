import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/Addons.js";

class TShape {
  constructor(scene, x, y, z, size = 1, color = 0xccff) {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      flatShading: true,
    });
    this.linesMat = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });

    this.cube1 = new THREE.Mesh(this.geometry, this.material);
    this.cube1.position.set(x, y, z);
    this.group.add(this.cube1);

    this.cube2 = new THREE.Mesh(this.geometry, this.material);
    this.cube2.position.set(x - size, y, z);
    this.group.add(this.cube2);

    this.cube3 = new THREE.Mesh(this.geometry, this.material);
    this.cube3.position.set(x + size, y, z);
    this.group.add(this.cube3);

    this.cube4 = new THREE.Mesh(this.geometry, this.material);
    this.cube4.position.set(x, y + size, z);
    this.group.add(this.cube4);

    scene.add(this.group);
  }
  rotateZ() {
    // Aplicar rotación a los cubos
    this.group.rotateZ(Math.PI / 2);
  }
  rotateY() {
    // Aplicar rotación a los cubos
    this.group.rotateY(Math.PI / 2);
  }
  rotateX() {
    // Aplicar rotación a los cubos
    this.group.rotateX(Math.PI / 2);
  }
}

class LShape {
  constructor(scene, x, y, z, size = 1, color = 0x50e00d) {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      flatShading: true,
    });
    this.linesMat = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });

    this.cube1 = new THREE.Mesh(this.geometry, this.material);
    this.cube1.position.set(x, y, z);
    this.group.add(this.cube1);

    this.cube2 = new THREE.Mesh(this.geometry, this.material);
    this.cube2.position.set(x + size, y, z);
    this.group.add(this.cube2);

    this.cube3 = new THREE.Mesh(this.geometry, this.material);
    this.cube3.position.set(x, y + size, z);
    this.group.add(this.cube3);

    this.cube4 = new THREE.Mesh(this.geometry, this.material);
    this.cube4.position.set(x, y + size + size, z);
    this.group.add(this.cube4);

    scene.add(this.group);
  }
  rotateZ() {
    // Aplicar rotación a los cubos
    this.group.rotateZ(Math.PI / 2);
  }
  rotateY() {
    // Aplicar rotación a los cubos
    this.group.rotateY(Math.PI / 2);
  }
  rotateX() {
    // Aplicar rotación a los cubos
    this.group.rotateX(Math.PI / 2);
  }
}

class SShape {
  constructor(scene, x, y, z, size = 1, color = 0x8d0de0) {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      flatShading: true,
    });
    this.linesMat = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });

    this.cube1 = new THREE.Mesh(this.geometry, this.material);
    this.cube1.position.set(x, y, z);
    this.group.add(this.cube1);

    this.cube2 = new THREE.Mesh(this.geometry, this.material);
    this.cube2.position.set(x - size, y, z);
    this.group.add(this.cube2);

    this.cube3 = new THREE.Mesh(this.geometry, this.material);
    this.cube3.position.set(x, y + size, z);
    this.group.add(this.cube3);

    this.cube4 = new THREE.Mesh(this.geometry, this.material);
    this.cube4.position.set(x + size, y + size, z);
    this.group.add(this.cube4);

    scene.add(this.group);
  }
  rotateZ() {
    // Aplicar rotación a los cubos
    this.group.rotateZ(Math.PI / 2);
  }
  rotateY() {
    // Aplicar rotación a los cubos
    this.group.rotateY(Math.PI / 2);
  }
  rotateX() {
    // Aplicar rotación a los cubos
    this.group.rotateX(Math.PI / 2);
  }
}

class ZShape {
  constructor(scene, x, y, z, size = 1, color = 0xe0800d) {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      flatShading: true,
    });
    this.linesMat = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });

    this.cube1 = new THREE.Mesh(this.geometry, this.material);
    this.cube1.position.set(x, y, z);
    this.group.add(this.cube1);

    this.cube2 = new THREE.Mesh(this.geometry, this.material);
    this.cube2.position.set(x + size, y, z);
    this.group.add(this.cube2);

    this.cube3 = new THREE.Mesh(this.geometry, this.material);
    this.cube3.position.set(x, y + size, z);
    this.group.add(this.cube3);

    this.cube4 = new THREE.Mesh(this.geometry, this.material);
    this.cube4.position.set(x - size, y + size, z);
    this.group.add(this.cube4);

    scene.add(this.group);
  }
  rotateZ() {
    // Aplicar rotación a los cubos
    this.group.rotateZ(Math.PI / 2);
  }
  rotateY() {
    // Aplicar rotación a los cubos
    this.group.rotateY(Math.PI / 2);
  }
  rotateX() {
    // Aplicar rotación a los cubos
    this.group.rotateX(Math.PI / 2);
  }
}
class CShape {
  constructor(scene, x, y, z, size = 1, color = 0xfff300) {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      flatShading: true,
    });
    this.linesMat = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });

    this.cube1 = new THREE.Mesh(this.geometry, this.material);
    this.cube1.position.set(x, y, z);
    this.group.add(this.cube1);

    this.cube2 = new THREE.Mesh(this.geometry, this.material);
    this.cube2.position.set(x + size, y, z);
    this.group.add(this.cube2);

    this.cube3 = new THREE.Mesh(this.geometry, this.material);
    this.cube3.position.set(x, y + size, z);
    this.group.add(this.cube3);

    this.cube4 = new THREE.Mesh(this.geometry, this.material);
    this.cube4.position.set(x + size, y + size, z);
    this.group.add(this.cube4);

    scene.add(this.group);
  }
  rotateZ() {
    // Aplicar rotación a los cubos
    this.group.rotateZ(Math.PI / 2);
  }
  rotateY() {
    // Aplicar rotación a los cubos
    this.group.rotateY(Math.PI / 2);
  }
  rotateX() {
    // Aplicar rotación a los cubos
    this.group.rotateX(Math.PI / 2);
  }
}

class IShape {
  constructor(scene, x, y, z, size = 1, color = 0xffffff) {
    this.group = new THREE.Group();
    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({
      color: color,
      flatShading: true,
    });
    this.linesMat = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });

    this.cube1 = new THREE.Mesh(this.geometry, this.material);
    this.cube1.position.set(x, y, z);
    this.group.add(this.cube1);

    this.cube2 = new THREE.Mesh(this.geometry, this.material);
    this.cube2.position.set(x, y + size, z);
    this.group.add(this.cube2);

    this.cube3 = new THREE.Mesh(this.geometry, this.material);
    this.cube3.position.set(x, y + size + size, z);
    this.group.add(this.cube3);

    this.cube4 = new THREE.Mesh(this.geometry, this.material);
    this.cube4.position.set(x, y + size + size + size, z);
    this.group.add(this.cube4);

    scene.add(this.group);
  }
  rotateZ() {
    // Aplicar rotación a los cubos
    this.group.rotateZ(Math.PI / 2);
  }
  rotateY() {
    // Aplicar rotación a los cubos
    this.group.rotateY(Math.PI / 2);
  }
  rotateX() {
    // Aplicar rotación a los cubos
    this.group.rotateX(Math.PI / 2);
  }
}

const width = window.innerWidth;
const height = window.innerHeight;

const fov = 80;
const aspect = width / height;
const near = 0.1;
const far = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();

console.log(camera);
camera.position.z = 2;

const light = new THREE.HemisphereLight("white", "gray");
scene.add(light);
const t1 = new TShape(scene, -0.5, -0.5, 0);
const l1 = new LShape(scene, 2.5, 0.5, 0);
const s1 = new SShape(scene, -3.5, 0.5, 0);
const z1 = new ZShape(scene, -0.5, 2.5, 0);
const c1 = new CShape(scene, -3.5, 3.5, 0);
const i1 = new IShape(scene, 3.5, 2.5, 0);

const controles = new OrbitControls(camera, renderer.domElement);

const animate = (t = 0) => {
  requestAnimationFrame(animate);
  /*     t1.rotateZ(Date.now() * 0.001);
    t1.rotateY(Date.now() * 0.001); */
  renderer.render(scene, camera);
};

animate();

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    t1.rotateX();
    l1.rotateX();
    s1.rotateX();
    z1.rotateX();
    c1.rotateX();
    i1.rotateX();
  } else if (event.key === "ArrowRight") {
    t1.rotateY();
    l1.rotateY();
    s1.rotateY();
    z1.rotateY();
    c1.rotateY();
    i1.rotateY();
  } else if (event.key === "ArrowLeft") {
    t1.rotateZ();
    l1.rotateZ();
    s1.rotateZ();
    z1.rotateZ();
    c1.rotateZ();
    i1.rotateZ();
  }
});
