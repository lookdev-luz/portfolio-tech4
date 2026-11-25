window.ArchGeometry = {
  cube() {
    const faces = [
      [[0, 0, 1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]],
      [[0, 0, -1], [1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]],
      [[-1, 0, 0], [-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
      [[1, 0, 0], [1, -1, 1], [1, -1, -1], [1, 1, -1], [1, 1, 1]],
      [[0, 1, 0], [-1, 1, 1], [1, 1, 1], [1, 1, -1], [-1, 1, -1]],
      [[0, -1, 0], [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]]
    ];
    const positions = [];
    const normals = [];
    const indices = [];
    const edges = [];
    faces.forEach(([normal, ...corners], face) => {
      const base = face * 4;
      corners.forEach((point) => {
        positions.push(...point);
        normals.push(...normal);
      });
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
      edges.push(base, base + 1, base + 1, base + 2, base + 2, base + 3, base + 3, base);
    });
    return {
      positions: new Float32Array(positions),
      normals: new Float32Array(normals),
      indices: new Uint16Array(indices),
      edges: new Uint16Array(edges)
    };
  }
};
