<?php
// Personalize este arquivo antes de publicar. Dados demonstrativos ficam sem contatos reais.
return [
    'demo' => true,
    'name' => 'Rafael Monte (demonstração)',
    'professional_name' => 'Rafael Monte',
    'role' => 'Estudante de infraestrutura e redes',
    'headline' => "Planejar.\nConectar.\nOperar.",
    'description' => 'Estudos demonstrativos de redes, servidores e arquitetura de sistemas.',
    'bio' => 'Sou um desenvolvedor em início de carreira, interessado em criar produtos digitais claros, acessíveis e bem estruturados. Este portfólio é um modelo demonstrativo. Personalize as informações e os projetos antes de apresentar seu trabalho.',
    'philosophy' => 'Antes de escrever código, é preciso compreender o problema. Antes de construir uma solução, é preciso projetar sua estrutura.',
    'photo' => '', 'email' => '', 'phone' => '', 'whatsapp' => '', 'github_user' => '', 'github_url' => '', 'linkedin' => '',
    'location' => 'Brasil', 'available' => true,
    'seo' => ['title' => 'Code Architect — Portfólio de desenvolvimento', 'description' => 'Desenvolvimento de sites e sistemas web com estrutura e propósito.', 'canonical' => '', 'index' => false],
    'technologies' => [
        ['name'=>'HTML5','category'=>'Frontend','description'=>'Estrutura semântica para páginas acessíveis.','uses'=>'Sites, formulários e interfaces.','services'=>['Sites','Landing pages']],
        ['name'=>'CSS3','category'=>'Frontend','description'=>'Estilos responsivos e sistemas visuais.','uses'=>'Layouts adaptáveis e componentes.','services'=>['Sites','Landing pages']],
        ['name'=>'JavaScript','category'=>'Frontend','description'=>'Interatividade com APIs nativas do navegador.','uses'=>'Interfaces e visualizações interativas.','services'=>['Sites','Integrações']],
        ['name'=>'PHP','category'=>'Backend','description'=>'Lógica de servidor e geração de páginas.','uses'=>'Formulários e sistemas web.','services'=>['Sistemas web','Backend']],
        ['name'=>'MySQL / SQL','category'=>'Banco de dados','description'=>'Consultas e modelagem relacional.','uses'=>'Persistência de dados.','services'=>['Sistemas web','Modelagem']],
        ['name'=>'Git / GitHub','category'=>'Ferramentas','description'=>'Histórico e colaboração em código.','uses'=>'Versionamento de projetos.','services'=>['Desenvolvimento']],
        ['name'=>'Linux / Nginx','category'=>'Infraestrutura','description'=>'Ambiente e servidor web.','uses'=>'Publicação de aplicações.','services'=>['Hospedagem']],
    ],
    'services' => [
        ['name'=>'Sites institucionais','description'=>'Uma presença digital clara para apresentar negócio, serviços e formas de contato.','solves'=>'Informações dispersas e dificuldade para explicar sua oferta.','benefits'=>'Conteúdo organizado e navegação acessível.','tech'=>['HTML5','CSS3','PHP'],'enabled'=>true],
        ['name'=>'Landing pages','description'=>'Página focada em comunicar uma oferta e orientar o próximo passo.','solves'=>'Campanhas sem uma página dedicada.','benefits'=>'Mensagem objetiva e experiência responsiva.','tech'=>['HTML5','CSS3','JavaScript'],'enabled'=>true],
        ['name'=>'Sistemas web','description'=>'Ferramentas sob medida para organizar fluxos de trabalho.','solves'=>'Rotinas manuais e dados espalhados.','benefits'=>'Processos centralizados conforme escopo definido.','tech'=>['PHP','MySQL / SQL'],'enabled'=>true],
        ['name'=>'Manutenção e melhorias','description'=>'Ajustes evolutivos em sites e sistemas existentes.','solves'=>'Problemas de usabilidade ou necessidades novas.','benefits'=>'Evolução gradual e documentada.','tech'=>['PHP','JavaScript','CSS3'],'enabled'=>true],
    ],
    'projects' => [
        ['name'=>'Inventário modular','category'=>'Sistema web','type'=>'Projeto demonstrativo','description'=>'Conceito de ferramenta para organizar itens e acompanhar movimentações de estoque.','objective'=>'Facilitar a consulta de itens e quantidades.','problem'=>'Informações de inventário podem ficar espalhadas entre planilhas.','features'=>['Cadastro de itens (conceitual)','Consulta e filtros (conceitual)','Resumo de movimentações (conceitual)'],'tech'=>['PHP','MySQL / SQL','JavaScript'],'links'=>['github'=>'','demo'=>''],'visual'=>'inventory'],
        ['name'=>'Presença digital','category'=>'Website','type'=>'Estudo demonstrativo','description'=>'Direção visual para um site institucional responsivo e acessível.','objective'=>'Apresentar uma organização e facilitar o contato.','problem'=>'Uma oferta pouco clara dificulta que visitantes encontrem a informação certa.','features'=>['Apresentação de serviços','Navegação responsiva','Contato direto'],'tech'=>['HTML5','CSS3','JavaScript'],'links'=>['github'=>'','demo'=>''],'visual'=>'website'],
        ['name'=>'Painel de tarefas','category'=>'Sistema web','type'=>'Projeto demonstrativo','description'=>'Estudo conceitual de um painel para acompanhar tarefas por etapa.','objective'=>'Dar visibilidade ao andamento de atividades.','problem'=>'Acompanhamento pode depender de mensagens desconexas.','features'=>['Lista de tarefas (conceitual)','Etapas de trabalho (conceitual)','Visão geral (conceitual)'],'tech'=>['PHP','MySQL / SQL','CSS3'],'links'=>['github'=>'','demo'=>''],'visual'=>'dashboard'],
    ],
    'builder_components' => [
        ['id'=>'responsive','name'=>'Interface responsiva','group'=>'Experiência','description'=>'Layout que se adapta a celular, tablet e computador.'],['id'=>'website','name'=>'Site institucional','group'=>'Experiência','description'=>'Páginas para apresentar negócio, oferta e informações.'],['id'=>'landing','name'=>'Landing page','group'=>'Experiência','description'=>'Página dedicada a uma campanha ou serviço.'],['id'=>'form','name'=>'Formulário de contato','group'=>'Experiência','description'=>'Campos para iniciar uma conversa. O envio requer integração própria.'],['id'=>'whatsapp','name'=>'Atalho para WhatsApp','group'=>'Integração','description'=>'Link de contato que abre uma conversa com mensagem preenchida.'],['id'=>'backend','name'=>'Backend','group'=>'Aplicação','description'=>'Lógica executada no servidor para processar dados.'],['id'=>'database','name'=>'Banco de dados','group'=>'Dados','description'=>'Armazenamento estruturado para informações da aplicação.'],['id'=>'auth','name'=>'Autenticação','group'=>'Aplicação','description'=>'Fluxo de identificação de usuários, sujeito a requisitos de segurança.'],['id'=>'admin','name'=>'Painel administrativo','group'=>'Aplicação','description'=>'Área privada para gestão do conteúdo ou operação.'],['id'=>'api','name'=>'Integração com APIs','group'=>'Integração','description'=>'Troca de dados com serviços externos definidos no projeto.'],['id'=>'hosting','name'=>'Hospedagem','group'=>'Infraestrutura','description'=>'Ambiente para disponibilizar o sistema na internet.'],['id'=>'maintenance','name'=>'Manutenção','group'=>'Continuidade','description'=>'Acompanhamento e ajustes após a publicação.'],
    ],
    'process' => [
        ['name'=>'Descoberta','description'=>'Conversamos sobre o contexto, as pessoas envolvidas e o objetivo.'],['name'=>'Planejamento','description'=>'Definimos escopo, prioridades e o que caracteriza uma entrega útil.'],['name'=>'Arquitetura','description'=>'Organizamos páginas, dados e componentes antes da implementação.'],['name'=>'Desenvolvimento','description'=>'Construímos a solução em etapas, com atenção à acessibilidade.'],['name'=>'Testes','description'=>'Conferimos fluxos, conteúdo e comportamento em telas diferentes.'],['name'=>'Entrega','description'=>'Preparamos arquivos, orientações e publicação conforme o combinado.'],
    ],
    'visual' => ['background'=>'#111111','accent'=>'#F97316'],
];
