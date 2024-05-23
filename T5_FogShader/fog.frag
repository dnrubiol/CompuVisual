#ifdef GL_ES
precision mediump float;
#endif

// Entrada desde el vértice shader
varying vec2 vTexCoord;
varying vec4 vPosition;

// Uniforms
uniform sampler2D texture;
uniform float fogNear;
uniform float fogFar;

void main() {
  // Calculamos la distancia desde el fragmento hasta la cámara
  float depth = length(vPosition);

  // Calculamos el factor de niebla
  float fogFactor = smoothstep(fogNear, fogFar, depth);

  // Aplicamos la niebla al color
  vec3 fogColor = vec3(0.8, 0.8, 0.8); // Color de la niebla (gris claro)
  vec3 finalColor = mix(fogColor, texture2D(texture, vTexCoord).rgb, fogFactor);

  // Establecemos el color final
  gl_FragColor = vec4(finalColor, 1.0);
}
