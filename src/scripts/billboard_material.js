import { ShaderMaterial } from 'three';

const vertexShader = `
    varying vec2 vUv;

    void main() {
        // Get the billboard's center in view space (translation only)
        vec4 centerView = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        
        // Extract scale from modelMatrix (assuming uniform scale for simplicity)
        float scale = length(vec3(modelMatrix[0])); // Length of first column
        
        // Offset vertices in view space (camera's XY plane)
        vec3 offset = vec3(position.x * scale, position.y * scale, 0.0);
        vec4 mvPosition = centerView + vec4(offset, 0.0);
        
        // Project to clip space
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
    }
`;

const fragmentShader = `
    uniform sampler2D texture1;
    varying vec2 vUv;
    
    void main() {
        gl_FragColor = texture2D(texture1, vUv);
    }
`;

export default function CreateBillboardMaterial(texture){
    return new ShaderMaterial({
        fragmentShader,
        vertexShader,
        uniforms: { texture1: { type: 't', value: texture} }
    });
} 