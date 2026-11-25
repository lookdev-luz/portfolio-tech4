(function () {
  const inputs = [...document.querySelectorAll('.component-option input')];
  const diagram = document.getElementById('builder-diagram');
  const count = document.getElementById('builder-count');
  const explanation = document.getElementById('builder-explainer');
  if (!diagram) return;

  const ns = 'http://www.w3.org/2000/svg';
  const relations = {
    backend: ['database', 'auth', 'admin', 'api'],
    database: ['backend'],
    auth: ['backend', 'database'],
    admin: ['backend', 'auth'],
    api: ['backend'],
    form: ['backend', 'whatsapp'],
    website: ['responsive'],
    landing: ['responsive'],
    hosting: ['backend', 'website', 'landing'],
    maintenance: ['hosting']
  };
  const descriptions = new Map(inputs.map((input) => [input.value, input.dataset.description]));

  function selected() {
    return inputs.filter((input) => input.checked);
  }

  function buildSummary() {
    const name = document.getElementById('client-name').value.trim();
    const goal = document.getElementById('client-goal').value.trim();
    const notes = document.getElementById('client-notes').value.trim();
    const components = selected().map((input) => input.dataset.name);
    return [
      'Olá! Conheci seu portfólio e gostaria de conversar sobre o desenvolvimento de um projeto.',
      name ? `Nome: ${name}` : '',
      goal ? `Objetivo: ${goal}` : '',
      components.length ? `Componentes desejados: ${components.join(', ')}` : '',
      notes ? `Observações: ${notes}` : ''
    ].filter(Boolean).join('\n');
  }

  function updateLinks() {
    const whatsapp = document.getElementById('builder-whatsapp');
    const email = document.getElementById('builder-email');
    const message = buildSummary();
    if (whatsapp) whatsapp.href = `${whatsapp.href.split('?')[0]}?text=${encodeURIComponent(message)}`;
    if (email) {
      const address = email.href.slice(7).split('?')[0];
      email.href = `mailto:${address}?subject=${encodeURIComponent('Conversa sobre um projeto')}&body=${encodeURIComponent(message)}`;
    }
  }

  function update() {
    const chosen = selected();
    const ids = new Set(chosen.map((input) => input.value));
    count.textContent = `${String(chosen.length).padStart(2, '0')} MÓDULOS`;
    diagram.replaceChildren();
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 560 300');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Esquema preliminar dos componentes selecionados');

    if (!chosen.length) {
      const prompt = document.createElementNS(ns, 'text');
      prompt.setAttribute('x', '280');
      prompt.setAttribute('y', '152');
      prompt.setAttribute('text-anchor', 'middle');
      prompt.setAttribute('class', 'diagram-prompt');
      prompt.textContent = 'ESCOLHA O QUE SUA IDEIA PRECISA';
      svg.append(prompt);
      explanation.textContent = 'Selecione itens como um site, um formulário ou uma área administrativa. O desenho acompanha suas escolhas.';
    } else {
      const columns = [
        chosen.filter((input) => ['responsive', 'website', 'landing', 'form', 'whatsapp'].includes(input.value)),
        chosen.filter((input) => ['backend', 'auth', 'admin', 'api'].includes(input.value)),
        chosen.filter((input) => ['database', 'hosting', 'maintenance'].includes(input.value))
      ];
      const positions = new Map();
      columns.forEach((column, columnIndex) => {
        const x = 20 + columnIndex * 183;
        const gap = Math.min(54, 240 / Math.max(column.length, 1));
        const total = column.length * gap;
        column.forEach((input, rowIndex) => {
          positions.set(input.value, { x, y: 150 - total / 2 + rowIndex * gap });
        });
      });
      const edges = new Set();
      chosen.forEach((input) => (relations[input.value] || []).forEach((target) => {
        if (ids.has(target)) edges.add([input.value, target].sort().join(':'));
      }));
      edges.forEach((edge) => {
        const [from, to] = edge.split(':');
        const a = positions.get(from);
        const b = positions.get(to);
        if (!a || !b || a.x === b.x) return;
        const line = document.createElementNS(ns, 'path');
        line.setAttribute('d', `M${a.x + 158} ${a.y + 20} C${a.x + 175} ${a.y + 20}, ${b.x - 18} ${b.y + 20}, ${b.x} ${b.y + 20}`);
        line.setAttribute('class', 'diagram-connection');
        svg.append(line);
      });
      chosen.forEach((input) => {
        const position = positions.get(input.value);
        const related = (relations[input.value] || []).some((item) => ids.has(item));
        const group = document.createElementNS(ns, 'g');
        group.setAttribute('class', `diagram-module${related ? ' is-connected' : ''}`);
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', position.x);
        rect.setAttribute('y', position.y);
        rect.setAttribute('width', '158');
        rect.setAttribute('height', '40');
        const number = document.createElementNS(ns, 'text');
        number.setAttribute('x', position.x + 10);
        number.setAttribute('y', position.y + 24);
        number.setAttribute('class', 'diagram-number');
        number.textContent = String([...positions.keys()].indexOf(input.value) + 1).padStart(2, '0');
        const label = document.createElementNS(ns, 'text');
        label.setAttribute('x', position.x + 36);
        label.setAttribute('y', position.y + 24);
        label.setAttribute('class', 'diagram-label');
        label.textContent = input.dataset.name;
        group.append(rect, number, label);
        svg.append(group);
      });
      const missing = new Set();
      chosen.forEach((input) => (relations[input.value] || []).forEach((target) => {
        if (!ids.has(target) && ['backend', 'database'].includes(target)) missing.add(target);
      }));
      explanation.textContent = chosen.map((input) => input.dataset.name).join(' · ') + (missing.size
        ? ` — uma conversa pode esclarecer se ${[...missing].map((id) => descriptions.get(id)?.split(' ')[0].toLowerCase()).join(' e ')} será necessário.`
        : ' — representação inicial para orientar a conversa sobre escopo.');
    }
    diagram.append(svg);
    updateLinks();
  }

  window.buildSummary = buildSummary;
  inputs.forEach((input) => input.addEventListener('change', update));
  ['client-name', 'client-goal', 'client-notes'].forEach((id) => {
    document.getElementById(id).addEventListener('input', updateLinks);
  });
  document.getElementById('reset-builder').addEventListener('click', () => {
    inputs.forEach((input) => { input.checked = false; });
    ['client-name', 'client-goal', 'client-notes'].forEach((id) => { document.getElementById(id).value = ''; });
    update();
  });
  update();
})();
