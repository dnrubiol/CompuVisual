precision highp float;

// Entradas desde la aplicación
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// Transformaciones
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// Salidas a los fragment shaders
varying vec2 vTexCoord;
varying vec4 vPosition;

void main() {
  // Transformar la posición del vértice
  vec4 positionVec4 = uModelViewMatrix * vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * positionVec4;

  // Pasar los datos de textura al fragment shader
  vTexCoord = aTexCoord;
  vPosition = positionVec4;
}
