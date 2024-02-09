const DestShader = {
  uniforms: {},

  vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main(){
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,

  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float alpha;

    varying vec2 vUv;

    void main(void) {
      vec4 dest = texture2D(tDiffuse, vUv);
      dest.a *= alpha;
      gl_FragColor = dest;
    }`,
}

export { DestShader }
