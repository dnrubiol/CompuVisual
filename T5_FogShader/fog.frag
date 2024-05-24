#ifdef GL_ES
precision mediump float;
#endif

uniform float fogNear; // Distancia donde comienza la niebla
uniform float fogFar; // Distancia donde termina la niebla
uniform sampler2D tex0;

varying vec2 vTexCoord;
varying vec4 vVertexPosition;

void main() {
    // Calcular la profundidad desde la posición del vértice
    float depth = length(vVertexPosition.xyz);

    // Calcular la intensidad de la niebla
    float fogFactor = smoothstep(fogNear, fogFar, depth);

    // Color de la niebla
    vec3 fogColor = vec3(0.0, 0.0, 0.0);

    // Color del fragmento original
    vec4 texColor = texture2D(tex0, vTexCoord);

    // Combinar el color de la niebla con el color del fragmento
    vec3 finalColor = mix(fogColor, texColor.rgb, fogFactor);

    // Salida final
    gl_FragColor = vec4(finalColor, texColor.a);
}
