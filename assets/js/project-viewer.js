(function () {
  const dialog = document.querySelector('.project-dialog');
  if (!dialog) return;
  const projects = JSON.parse(document.getElementById('project-data').textContent);
  const content = dialog.querySelector('.dialog-content');
  const svgNS = 'http://www.w3.org/2000/svg';

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function renderOverview(project, panel) {
    const objectiveHeading = element('h3', 'Objetivo do estudo');
    const objective = element('p', project.objective);
    const contextHeading = element('h3', 'Questão considerada');
    const context = element('p', project.problem);
    const list = element('ul');
    project.features.forEach((feature) => list.append(element('li', feature)));
    panel.append(objectiveHeading, objective, contextHeading, context, list);
  }

  function renderDiagram(project, panel, dataFlow) {
    const labels = dataFlow
      ? ['PESSOA', 'INTERFACE', 'APLICAÇÃO', 'DADOS']
      : ['INTERFACE', 'APLICAÇÃO', 'SERVIÇOS', 'DADOS'];
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 760 250');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', dataFlow
      ? 'Fluxo conceitual da pessoa usuária até as informações'
      : 'Planta conceitual das camadas de uma solução web');
    labels.forEach((label, index) => {
      const x = 14 + index * 188;
      const y = dataFlow ? 88 + (index % 2 ? 20 : 0) : 78 + index * 5;
      const group = document.createElementNS(svgNS, 'g');
      group.setAttribute('class', 'blueprint-node');
      const rect = document.createElementNS(svgNS, 'rect');
      rect.setAttribute('x', x);
      rect.setAttribute('y', y);
      rect.setAttribute('width', '144');
      rect.setAttribute('height', '66');
      const number = document.createElementNS(svgNS, 'text');
      number.setAttribute('x', x + 12);
      number.setAttribute('y', y + 18);
      number.setAttribute('class', 'blueprint-number');
      number.textContent = `0${index + 1}`;
      const title = document.createElementNS(svgNS, 'text');
      title.setAttribute('x', x + 72);
      title.setAttribute('y', y + 40);
      title.setAttribute('text-anchor', 'middle');
      title.setAttribute('class', 'blueprint-label');
      title.textContent = label;
      group.append(rect, number, title);
      svg.append(group);
      if (index < labels.length - 1) {
        const connector = document.createElementNS(svgNS, 'path');
        const nextY = dataFlow ? 88 + ((index + 1) % 2 ? 20 : 0) : 78 + (index + 1) * 5;
        connector.setAttribute('d', `M${x + 144} ${y + 33} H${x + 174} L${x + 184} ${nextY + 33}`);
        connector.setAttribute('class', 'blueprint-link');
        svg.insertBefore(connector, group);
      }
    });
    panel.append(svg, element('p', 'Diagrama conceitual para apoiar a conversa. Não descreve um sistema implementado.'));
  }

  function openProject(project) {
    content.replaceChildren();
    const title = element('h2', project.name);
    title.id = 'dialog-title';
    content.append(title, element('p', `${project.type} · Estudo demonstrativo`));
    const tabs = element('div', null, 'viewer-tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Perspectiva do estudo');
    const panel = element('div', null, 'viewer-panel');
    panel.setAttribute('role', 'tabpanel');
    panel.id = 'project-viewer-panel';
    content.append(tabs, panel);
    const modes = [
      { label: 'Visão geral', render: () => renderOverview(project, panel) },
      { label: 'Planta', render: () => renderDiagram(project, panel, false) },
      { label: 'Fluxo de dados', render: () => renderDiagram(project, panel, true) }
    ];
    function select(index) {
      tabs.replaceChildren();
      modes.forEach((mode, tabIndex) => {
        const button = element('button', mode.label);
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', String(index === tabIndex));
        button.setAttribute('aria-controls', panel.id);
        button.tabIndex = index === tabIndex ? 0 : -1;
        button.addEventListener('click', () => select(tabIndex));
        button.addEventListener('keydown', (event) => {
          if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
          event.preventDefault();
          const next = (tabIndex + (event.key === 'ArrowRight' ? 1 : modes.length - 1)) % modes.length;
          select(next);
          tabs.children[next].focus();
        });
        tabs.append(button);
      });
      panel.replaceChildren();
      modes[index].render();
    }
    select(0);
    dialog.showModal();
    tabs.children[0].focus();
  }

  document.querySelectorAll('.project-open').forEach((button) => {
    button.addEventListener('click', () => openProject(projects[Number(button.dataset.project)]));
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
