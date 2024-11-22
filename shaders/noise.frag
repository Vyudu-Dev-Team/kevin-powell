uniform float time;
uniform sampler2D baseTexture;
uniform vec2 resolution;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Calculate aspect-ratio corrected UVs
    vec2 uv = vUv;
    float aspectRatio = resolution.x / resolution.y;
    if (aspectRatio > 1.0) {
        uv.x = (uv.x - 0.5) * aspectRatio + 0.5;
    } else {
        uv.y = (uv.y - 0.5) / aspectRatio + 0.5;
    }
    
    // Sample the base texture
    vec4 baseColor = texture2D(baseTexture, uv);
    
    // Create noise
    vec2 uvNoise = uv * vec2(1000.0);
    float noise = random(uvNoise + time) * 0.1;
    
    // Create scanline effect
    float scanline = sin(uv.y * 400.0 + time * 5.0) * 0.02;
    
    // Create RGB shift effect
    float shift = 0.002;
    vec4 rColor = texture2D(baseTexture, uv + vec2(shift * sin(time), 0.0));
    vec4 bColor = texture2D(baseTexture, uv - vec2(shift * sin(time), 0.0));
    vec3 color = vec3(rColor.r, baseColor.g, bColor.b);
    
    // Mix effects
    vec3 finalColor = color + vec3(noise) + vec3(scanline);
    
    // Add vignette
    float vignette = 1.0 - length(vUv - 0.5) * 1.5;
    vignette = smoothstep(0.0, 1.0, vignette);
    finalColor *= vignette;
    
    // Add subtle grain
    float grain = random(uv + time) * 0.05;
    finalColor += grain;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
