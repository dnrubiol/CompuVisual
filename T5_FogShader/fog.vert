#ifdef GL_ES
precision mediump float;
#endif

varying vec4 vertColor;
varying vec4 vertTexCoord;

uniform sampler2D tex0;
uniform float fogNear;
uniform float fogFar;

void main() {
    // Calcular la distancia desde el fragmento hasta la cámara
    float distToCamera = length(gl_FragCoord.xyz);

    // Calcular la cantidad de niebla
    float fogAmount = smoothstep(fogNear, fogFar, distToCamera);

    // Obtener el color de la textura y mezclar con la niebla
    vec4 texColor = texture2D(tex0, vertTexCoord.st);
    gl_FragColor = mix(texColor, vec4(texColor.rgb, 0.0), fogAmount);
}
