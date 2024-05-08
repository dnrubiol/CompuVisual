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

    const center = new THREE.Vector3(x, y + size / 2, z);

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

    this.group.position.copy(center);
    scene.add(this.group);
  }
  rotateX() {
    // Obtener la posición promedio de los cubos para usarla como centro de rotación
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateY() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateZ() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  caer() {
    if (!detectarColision(this)) {
      this.group.position.y -= velocidadCaida;
    }
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
  rotateX() {
    // Obtener la posición promedio de los cubos para usarla como centro de rotación
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateY() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateZ() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  caer() {
    if (!detectarColision(this)) {
      this.group.position.y -= velocidadCaida;
    }
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
  rotateX() {
    // Obtener la posición promedio de los cubos para usarla como centro de rotación
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateY() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateZ() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  caer() {
    if (!detectarColision(this)) {
      this.group.position.y -= velocidadCaida;
    }
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
  rotateX() {
    // Obtener la posición promedio de los cubos para usarla como centro de rotación
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateY() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateZ() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  caer() {
    if (!detectarColision(this)) {
      this.group.position.y -= velocidadCaida;
    }
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
  rotateX() {
    // Obtener la posición promedio de los cubos para usarla como centro de rotación
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateY() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateZ() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  caer() {
    if (!detectarColision(this)) {
      this.group.position.y -= velocidadCaida;
    }
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
  rotateX() {
    // Obtener la posición promedio de los cubos para usarla como centro de rotación
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateY() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  rotateZ() {
    // Aplicar rotación a los cubos
    const centerX =
      (this.cube1.position.x + this.cube2.position.x + this.cube3.position.x) /
      3;
    const centerY =
      (this.cube1.position.y + this.cube2.position.y + this.cube3.position.y) /
      3;
    const centerZ =
      (this.cube1.position.z + this.cube2.position.z + this.cube3.position.z) /
      3;

    // Aplicar rotación a cada cubo individualmente con respecto a su propio centro
    this.cube1.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube2.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube3.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
    this.cube4.position
      .sub(new THREE.Vector3(centerX, centerY, centerZ))
      .applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2)
      .add(new THREE.Vector3(centerX, centerY, centerZ));
  }

  caer() {
    if (!detectarColision(this)) {
      this.group.position.y -= velocidadCaida;
    }
  }
}

const width = window.innerWidth;
const height = window.innerHeight;

const fov = 90; //Tam Escenario
const aspect = width / height;
const near = 0.1;
const far = 100; //plano lejano

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const scene = new THREE.Scene();

console.log(camera);
camera.position.z = 14;

const light = new THREE.HemisphereLight("white", "gray");
scene.add(light);

const velocidadCaida = 0.08;

const controles = new OrbitControls(camera, renderer.domElement);

// // Escenario opcion B
// const guideGeometry = new THREE.BoxGeometry(10, 20, 10, 10, 10, 10);
// const guideMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 });
// const guideMesh = new THREE.Mesh(guideGeometry, guideMaterial);
// scene.add(guideMesh);

// Tamaño y divisiones del grid guía en el plano XY
const gridSizeXY = { x: 10, y: 20 };
const gridDivisionsXY = { x: 10, y: 20 };

// Tamaño y divisiones del grid guía en el plano YZ
const gridSizeYZ = { y: 20, z: 10 };
const gridDivisionsYZ = { y: 20, z: 10 };

// Tamaño y divisiones del grid guía en el plano XZ
const gridSizeXZ = { x: 10, z: 10 };
const gridDivisionsXZ = { x: 10, z: 10 };

//plano XY
const gridPointsXY = [];
for (let i = 0; i <= gridDivisionsXY.x; i++) {
  const x = (i / gridDivisionsXY.x) * gridSizeXY.x - gridSizeXY.x / 2;
  gridPointsXY.push(x, -gridSizeXY.y / 2, -5);
  gridPointsXY.push(x, gridSizeXY.y / 2, -5);
}
for (let i = 0; i <= gridDivisionsXY.y; i++) {
  const y = (i / gridDivisionsXY.y) * gridSizeXY.y - gridSizeXY.y / 2;
  gridPointsXY.push(-gridSizeXY.x / 2, y, -5);
  gridPointsXY.push(gridSizeXY.x / 2, y, -5);
}

//plano YZ
const gridPointsYZ = [];
for (let i = 0; i <= gridDivisionsYZ.y; i++) {
  const y = (i / gridDivisionsYZ.y) * gridSizeYZ.y - gridSizeYZ.y / 2;
  gridPointsYZ.push(-5, y, -gridSizeYZ.z / 2);
  gridPointsYZ.push(-5, y, gridSizeYZ.z / 2);
}
for (let i = 0; i <= gridDivisionsYZ.z; i++) {
  const z = (i / gridDivisionsYZ.z) * gridSizeYZ.z - gridSizeYZ.z / 2;
  gridPointsYZ.push(-5, -gridSizeYZ.y / 2, z);
  gridPointsYZ.push(-5, gridSizeYZ.y / 2, z);
}

//plano XZ
const gridPointsXZ = [];
for (let i = 0; i <= gridDivisionsXZ.x; i++) {
  const x = (i / gridDivisionsXZ.x) * gridSizeXZ.x - gridSizeXZ.x / 2;
  gridPointsXZ.push(x, -10, -gridSizeXZ.z / 2);
  gridPointsXZ.push(x, -10, gridSizeXZ.z / 2);
}
for (let i = 0; i <= gridDivisionsXZ.z; i++) {
  const z = (i / gridDivisionsXZ.z) * gridSizeXZ.z - gridSizeXZ.z / 2;
  gridPointsXZ.push(-gridSizeXZ.x / 2, -10, z);
  gridPointsXZ.push(gridSizeXZ.x / 2, -10, z);
}

const gridGeometryXY = new THREE.BufferGeometry();
gridGeometryXY.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(gridPointsXY, 3)
);
const gridMaterialXY = new THREE.LineBasicMaterial({ color: 0xffffff });
const gridXY = new THREE.LineSegments(gridGeometryXY, gridMaterialXY);
scene.add(gridXY);

const gridGeometryYZ = new THREE.BufferGeometry();
gridGeometryYZ.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(gridPointsYZ, 3)
);
const gridMaterialYZ = new THREE.LineBasicMaterial({ color: 0xffffff });
const gridYZ = new THREE.LineSegments(gridGeometryYZ, gridMaterialYZ);
scene.add(gridYZ);

const gridGeometryXZ = new THREE.BufferGeometry();
gridGeometryXZ.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(gridPointsXZ, 3)
);
const gridMaterialXZ = new THREE.LineBasicMaterial({ color: 0xffffff });
const gridXZ = new THREE.LineSegments(gridGeometryXZ, gridMaterialXZ);
scene.add(gridXZ);

let figuraActual = null;

function generarFiguras(scene) {
  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

  const formas = [TShape, LShape, SShape, ZShape, CShape, IShape];
  const randomIndex = Math.floor(Math.random() * formas.length);

  const x = getRandomIntInclusive(-3, 2);
  const y = 11;
  const z = getRandomIntInclusive(-2, 2);

  let figura = new formas[randomIndex](scene, x, y, z);

  console.log(figura);
  return figura;
}

const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshBasicMaterial({
  color: 0x999999,
  side: THREE.DoubleSide,
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = Math.PI / 2; // Rotar el plano para que esté horizontal
ground.position.y = -10; // Colocar el suelo debajo del área visible
scene.add(ground);

function detectarColision(pieza) {
  // Obtiene la posición global de la pieza
  const piezaPos = new THREE.Vector3();
  pieza.group.getWorldPosition(piezaPos);

  if (piezaPos.y >= gridXZ.position.y - 21) {
    return false;
  }
  return true;
}

const animate = (t = 0) => {
  requestAnimationFrame(animate);
  if (!figuraActual) {
    figuraActual = generarFiguras(scene);
  }
  figuraActual.caer();
  if (detectarColision(figuraActual)) {
    figuraActual = generarFiguras(scene);
  }

  renderer.render(scene, camera);
};

animate();

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    figuraActual.rotateX();
  } else if (event.key === "ArrowRight") {
    figuraActual.rotateY();
  } else if (event.key === "ArrowLeft") {
    figuraActual.rotateZ();
  }
});
