(function () {
  const canvas = document.getElementById('architect-core');
  if (!canvas) return;

  const panel = document.querySelector('.core-panel');
  const status = document.getElementById('webgl-status');
  let renderer = null;
  let gl = null;
  let contextExtension = null;
  const M = ArchMath;
  const projection = ArchCamera.projection();
  const view = ArchCamera.model();
  const rotationX = new Float32Array(16);
  const rotationY = new Float32Array(16);
  const rotation = new Float32Array(16);
  const transform = new Float32Array(16);
  const layerScale = new Float32Array(16);
  const layers = [
    { label: 'INTERFACE', color: [0.98, 0.58, 0.24], size: [1.3, 0.14, 0.9], y: 1.48, offset: 1.4 },
    { label: 'APLICAÇÃO', color: [0.86, 0.37, 0.11], size: [0.88, 0.3, 0.72], y: 0.74, offset: 0.7 },
    { label: 'SERVIÇOS', color: [0.97, 0.69, 0.4], size: [0.55, 0.23, 0.56], y: 0.03, offset: 0 },
    { label: 'DADOS', color: [0.72, 0.31, 0.1], size: [0.96, 0.2, 0.72], y: -0.65, offset: -0.7 },
    { label: 'INFRA', color: [0.91, 0.45, 0.16], size: [1.25, 0.12, 0.88], y: -1.31, offset: -1.4 }
  ];
  const buffers = layers.map(() => ({ model: new Float32Array(16), mvp: new Float32Array(16) }));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let yaw = 0.62;
  let pitch = -0.42;
  let pointer = null;
  let mode = 'structure';
  let separation = 0;
  let targetSeparation = 0;
  let frame = 0;
  let isVisible = false;
  let contextLost = false;
  let lastTime = 0;
  let destroyed = false;

  function initialize() {
    renderer = ArchRenderer.create(canvas);
    if (!renderer) {
      panel.classList.remove('webgl-ready');
      status.textContent = 'ALTERNATIVA SVG';
      return false;
    }
    gl = renderer.gl;
    contextExtension = renderer.contextExtension;
    panel.classList.add('webgl-ready');
    status.textContent = 'ATIVO';
    return true;
  }

  function render(time) {
    frame = 0;
    if (!renderer || !isVisible || document.hidden || contextLost || destroyed) return;
    const elapsed = Math.min((time - lastTime) / 1000 || 1 / 60, 0.05);
    lastTime = time;
    const easing = 1 - Math.exp(-8 * elapsed);
    separation += (targetSeparation - separation) * easing;

    const bounds = canvas.getBoundingClientRect();
    renderer.resize(bounds.width, bounds.height, devicePixelRatio || 1);
    gl.clearColor(0.055, 0.055, 0.055, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    M.perspective(projection, Math.PI / 4.1, canvas.width / canvas.height, 0.1, 60);
    M.translate(view, 0, 0, -7.5);
    M.rotateY(rotationY, yaw);
    M.rotateX(rotationX, pitch);
    M.multiply(rotation, rotationY, rotationX);
    M.multiply(transform, view, rotation);

    layers.forEach((layer, index) => {
      const matrices = buffers[index];
      const lift = mode === 'exploded' ? layer.offset * separation : 0;
      M.translate(matrices.model, 0, layer.y + lift, 0);
      M.multiply(matrices.model, transform, matrices.model);
      M.scale(layerScale, ...layer.size);
      M.multiply(matrices.model, matrices.model, layerScale);
      M.multiply(matrices.mvp, projection, matrices.model);
      const blueprint = mode === 'blueprint' ? 1 : 0;
      if (mode !== 'blueprint') {
        renderer.draw(matrices.mvp, matrices.model, layer.color, 0, false);
        gl.depthFunc(gl.LEQUAL);
        renderer.draw(matrices.mvp, matrices.model, [1, 0.43, 0.12], 1, true);
        gl.depthFunc(gl.LESS);
      } else {
        renderer.draw(matrices.mvp, matrices.model, layer.color, 1, true);
      }
    });

    if (mode === 'exploded' && Math.abs(targetSeparation - separation) > 0.002) schedule();
  }

  function schedule() {
    if (renderer && !frame && !document.hidden && isVisible && !contextLost && !destroyed) frame = requestAnimationFrame(render);
  }

  function releaseResources() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    if (renderer && renderer.contextExtension) contextExtension = renderer.contextExtension;
    if (renderer && !contextLost) renderer.dispose();
    renderer = null;
    gl = null;
  }

  function recreateRenderer() {
    if (contextLost || document.hidden || !isVisible || destroyed) return;
    if (initialize()) schedule();
  }

  function setMode(button) {
    mode = button.dataset.coreMode;
    targetSeparation = mode === 'exploded' ? 1 : 0;
    document.querySelectorAll('[data-core-mode]').forEach((control) => {
      control.setAttribute('aria-pressed', String(control === button));
    });
    schedule();
  }

  const visibility = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !renderer && !contextLost) recreateRenderer();
    if (isVisible && renderer) schedule();
    else releaseResources();
  });
  visibility.observe(canvas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) releaseResources();
    else if (isVisible && !renderer && !contextLost) recreateRenderer();
    schedule();
  });
  new ResizeObserver(schedule).observe(canvas);

  document.querySelectorAll('[data-core-mode]').forEach((button) => {
    button.addEventListener('click', () => setMode(button));
  });
  document.querySelector('[data-core-reset]').addEventListener('click', () => {
    yaw = 0.62;
    pitch = -0.42;
    setMode(document.querySelector('[data-core-mode="structure"]'));
  });
  canvas.addEventListener('pointerdown', (event) => {
    pointer = [event.clientX, event.clientY];
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (!pointer) return;
    yaw += (event.clientX - pointer[0]) * 0.008;
    pitch = Math.max(-1.1, Math.min(1.1, pitch + (event.clientY - pointer[1]) * 0.008));
    pointer = [event.clientX, event.clientY];
    schedule();
  });
  canvas.addEventListener('pointerup', () => { pointer = null; });
  canvas.addEventListener('pointercancel', () => { pointer = null; });
  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    contextLost = true;
    releaseResources();
    panel.classList.remove('webgl-ready');
    status.textContent = 'ALTERNATIVA SVG';
  });
  canvas.addEventListener('webglcontextrestored', () => {
    contextLost = false;
    recreateRenderer();
  });
  window.addEventListener('pagehide', () => {
    destroyed = true;
    releaseResources();
    visibility.disconnect();
  }, { once: true });

  if (reducedMotion) canvas.setAttribute('aria-description', 'A animação permanece parada até interação.');
  canvas.addEventListener('keydown', (event) => {
    const step = event.shiftKey ? 0.12 : 0.06;
    if (event.key === 'ArrowLeft') yaw -= step;
    else if (event.key === 'ArrowRight') yaw += step;
    else if (event.key === 'ArrowUp') pitch = Math.max(-1.1, pitch - step);
    else if (event.key === 'ArrowDown') pitch = Math.min(1.1, pitch + step);
    else return;
    event.preventDefault(); schedule();
  });
  document.querySelectorAll('[data-core-layer]').forEach((button) => button.addEventListener('click', () => { button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true')); schedule(); }));
  initialize();
  schedule();
})();
