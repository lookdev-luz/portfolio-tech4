window.ArchRenderer = {
  create(canvas) {
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, powerPreference: 'low-power' })
      || canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
    if (!gl) return null;

    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Falha ao compilar shader do Architect Core:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertex = compile(gl.VERTEX_SHADER, ArchShaders.vertex);
    const fragment = compile(gl.FRAGMENT_SHADER, ArchShaders.fragment);
    if (!vertex || !fragment) return null;
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Falha ao vincular shader do Architect Core:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    gl.useProgram(program);
    const geometry = ArchGeometry.cube();
    const vertexBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    const edgeBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.positions, gl.STATIC_DRAW);
    let attribute = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, geometry.normals, gl.STATIC_DRAW);
    attribute = gl.getAttribLocation(program, 'aNormal');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 3, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.indices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, edgeBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geometry.edges, gl.STATIC_DRAW);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    const uniforms = {
      mvp: gl.getUniformLocation(program, 'uMvp'),
      model: gl.getUniformLocation(program, 'uModel'),
      color: gl.getUniformLocation(program, 'uColor'),
      blueprint: gl.getUniformLocation(program, 'uBlueprint'),
      wire: gl.getUniformLocation(program, 'uWire')
    };
    return {
      gl,
      draw(mvp, model, color, blueprint, wire) {
        gl.useProgram(program);
        gl.uniformMatrix4fv(uniforms.mvp, false, mvp);
        gl.uniformMatrix4fv(uniforms.model, false, model);
        gl.uniform3fv(uniforms.color, color);
        gl.uniform1f(uniforms.blueprint, blueprint);
        gl.uniform1f(uniforms.wire, wire ? 1 : 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, wire ? edgeBuffer : indexBuffer);
        gl.drawElements(wire ? gl.LINES : gl.TRIANGLES, wire ? geometry.edges.length : geometry.indices.length, gl.UNSIGNED_SHORT, 0);
      },
      resize(width, height, pixelRatio) {
        const ratio = Math.min(pixelRatio, 1.4);
        const renderWidth = Math.max(1, Math.floor(width * ratio));
        const renderHeight = Math.max(1, Math.floor(height * ratio));
        if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
          canvas.width = renderWidth;
          canvas.height = renderHeight;
          gl.viewport(0, 0, renderWidth, renderHeight);
        }
      },
      dispose() {
        [vertexBuffer, normalBuffer, indexBuffer, edgeBuffer].forEach((buffer) => gl.deleteBuffer(buffer));
        gl.deleteProgram(program);
      }
    };
  }
};
