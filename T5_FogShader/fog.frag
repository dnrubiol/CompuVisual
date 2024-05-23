#ifdef GL_ES
precision mediump float;
#endif

uniform float fogNear; // Distancia donde comienza la niebla
uniform float fogFar; // Distancia donde termina la niebla

varying float depth;

void main() {
    // Normalizar la profundidad
    float depthNormalized = depth / gl_FragCoord.w;

    // Calcular la intensidad de la niebla
    float fogFactor = smoothstep(fogNear, fogFar, depthNormalized);

    // Color de la niebla
    vec3 fogColor = vec3(0.8, 0.8, 0.8);

    // Combinar el color de la niebla con el color del fragmento
    vec3 finalColor = mix(fogColor, gl_FragColor.rgb, fogFactor);

    // Salida final
    gl_FragColor = vec4(finalColor, gl_FragColor.a);
}
