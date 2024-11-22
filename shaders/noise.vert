varying vec2 vUv;
uniform float time;
uniform vec2 mousePosition;

void main() {
    vUv = uv;
    
    // Create a dynamic wave effect
    vec3 pos = position;
    float wave = sin(pos.x * 2.0 + time) * 0.02;
    wave += sin(pos.y * 2.0 + time * 0.8) * 0.02;
    
    // Add mouse interaction
    float dist = length(pos.xy - mousePosition);
    float mouseEffect = smoothstep(0.5, 0.0, dist) * 0.1;
    
    // Combine effects
    pos.z += wave + mouseEffect;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
