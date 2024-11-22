uniform float time;
uniform sampler2D baseTexture;
uniform vec2 resolution;
uniform vec2 mousePosition;
uniform float aspectRatio;
varying vec2 vUv;

// Improved noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a,hash2(i)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    
    return dot(n, vec3(70.0));
}

void main() {
    // Sample the base texture
    vec4 texColor = texture2D(baseTexture, vUv);
    
    // Calculate aspect-ratio corrected UV coordinates
    vec2 uv = vUv;
    uv.x *= aspectRatio;
    
    // Dynamic noise effect
    float noiseScale = 40.0;
    float noiseValue = noise(uv * noiseScale + time * 0.5);
    
    // Create scanlines
    float scanline = sin(uv.y * 800.0 + time * 5.0) * 0.02;
    
    // Mouse interaction effect
    float mouseDist = length(vUv - mousePosition);
    float mouseEffect = smoothstep(0.5, 0.0, mouseDist) * 0.2;
    
    // Vignette effect
    vec2 center = vec2(0.5 * aspectRatio, 0.5);
    float vignette = 1.0 - length((vUv - vec2(0.5)) * 2.0);
    vignette = smoothstep(0.0, 0.8, vignette);
    
    // Combine all effects
    vec3 finalColor = texColor.rgb;
    finalColor += noiseValue * 0.1; // Noise overlay
    finalColor += scanline; // Scanlines
    finalColor *= (0.8 + mouseEffect); // Mouse interaction
    finalColor *= (0.7 + vignette * 0.3); // Vignette
    
    gl_FragColor = vec4(finalColor, 1.0);
}
