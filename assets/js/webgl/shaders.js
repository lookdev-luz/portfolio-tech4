window.ArchShaders = {
  vertex: `attribute vec3 aPosition;
attribute vec3 aNormal;
uniform mat4 uMvp;
uniform mat4 uModel;
varying vec3 vNormal;
void main() {
  vNormal = normalize(mat3(uModel) * aNormal);
  gl_Position = uMvp * vec4(aPosition, 1.0);
}`,
  fragment: `precision mediump float;
uniform vec3 uColor;
uniform float uBlueprint;
uniform float uWire;
varying vec3 vNormal;
void main() {
  vec3 normal = normalize(vNormal);
  float diffuse = max(dot(normal, normalize(vec3(-0.45, 0.8, 0.55))), 0.0);
  float light = 0.3 + diffuse * 0.7;
  vec3 surface = uColor * light;
  vec3 drawing = mix(vec3(0.035), vec3(0.98, 0.46, 0.14), uWire);
  vec3 color = mix(surface, drawing, uBlueprint);
  gl_FragColor = vec4(color, 1.0);
}`
};
