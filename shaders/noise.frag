uniform float time;
uniform sampler2D baseTexture;
uniform vec2 resolution;
uniform vec2 mousePosition;
uniform float aspectRatio;
uniform float scrollIntensity;
varying vec2 vUv;

void main() {
    // Sample the base texture
    vec4 texColor = texture2D(baseTexture, vUv);
    
    // Calculate aspect-ratio corrected UV coordinates
    vec2 uv = vUv;
    uv.x *= aspectRatio;
    
    // Cinematic vignette effect
    vec2 center = vec2(0.5);
    float dist = length((vUv - center) * vec2(2.0, 2.0));
    float vignette = smoothstep(1.4, 0.2, dist);
    
    // Subtle color grading for cinematic look
    vec3 color = texColor.rgb;
    color = mix(color, color * vec3(1.1, 1.05, 1.0), 0.5); // Warm highlights
    color = mix(color, color * vec3(0.95, 0.95, 1.05), 0.5); // Cool shadows
    
    // Apply vignette and maintain rich blacks
    color *= mix(0.8, 1.0, vignette);
    
    // Add subtle highlight based on movement
    float highlight = scrollIntensity * 0.1;
    color += highlight * vec3(0.1, 0.1, 0.15);
    
    gl_FragColor = vec4(color, 1.0);
}
