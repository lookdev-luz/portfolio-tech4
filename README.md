# Code Architect

Portfólio demonstrativo em português brasileiro para serviços freelancers. Usa PHP puro, HTML semântico, CSS, JavaScript, SVG e WebGL nativo. Não requer Composer, NPM, Node.js, banco de dados, framework, compilação ou serviços externos. Os contatos vazios permanecem desativados e os exemplos de projetos são conceituais.

## Estrutura

- `index.php` monta a página com includes por `__DIR__`.
- `config/portfolio.php` centraliza perfil, SEO, tecnologias, serviços, projetos e componentes.
- `includes/` contém escaping HTML, validação de URLs, caminhos de recursos e estrutura comum.
- `sections/` contém as seções semânticas.
- `assets/css/` contém identidade visual e regras responsivas.
- `assets/js/` contém as interações, o configurador e o visualizador de projetos.
- `assets/js/webgl/` contém matrizes, geometria, shaders GLSL e renderer.

## Clonar e executar

Requer PHP 8.1 ou superior:

```sh
git clone https://github.com/lookdev-luz/portfolio-tech4.git
cd portfolio-tech4
php -S 127.0.0.1:8080
```

Acesse `http://127.0.0.1:8080`. O servidor embutido é para desenvolvimento local. A função `asset_url()` resolve caminhos de recursos também em subdiretórios.

## Personalizar conteúdo e contatos

Edite `config/portfolio.php` para atualizar nome, cargo, biografia, localização, disponibilidade e SEO. Configure somente contatos próprios:

- GitHub em `github_user` e `github_url` usando HTTPS.
- WhatsApp com código internacional e 10 a 15 dígitos, por exemplo `5511999999999`.
- Telefone com DDI, aberto com `tel:`.
- E-mail válido, aberto com `mailto:`.
- LinkedIn com URL HTTPS completa.

`safe_url()` aceita HTTP ou HTTPS. `e()` escapa texto HTML. Não guarde tokens ou credenciais no arquivo de configuração.

Os arrays `technologies`, `services`, `projects`, `builder_components` e `process` personalizam o conteúdo. Desative serviços por `enabled`. Em projetos, use dados verificáveis e indique se são demonstrativos, acadêmicos ou pessoais. Cores e escalas ficam em `assets/css/variables.css` e `assets/css/refinements.css`.

## Architect Core, geometria e shaders

O Core usa WebGL 1.0 em um único canvas. `geometry.js` fornece vértices e índices de cubos para faces e arestas. `math.js` contém matrizes de projeção, rotação, translação e escala. `renderer.js` compila e vincula os shaders, verifica logs e configura buffers, atributos e uniforms. `shaders.js` implementa iluminação difusa simples. `architect-core.js` organiza cinco módulos com proporções próprias e gerencia câmera e modos.

A renderização roda sob demanda e durante transições. É suspensa fora da viewport e em abas ocultas. Buffers e programa são liberados durante a pausa e reconstruídos ao retomar. A resolução interna limita DPR a 1.4. Estrutura mostra volumes e arestas, Planta exibe desenho técnico e Camadas afasta os planos. Sem WebGL, o SVG alternativo continua visível.

## Configurador e visualizador de projetos

O Architecture Builder agrupa componentes de experiência, aplicação e infraestrutura. Conexões e dependências são relações conceituais para iniciar a conversa, não uma arquitetura definitiva. Nome, objetivo, módulos e observações só são preparados para copiar ou abrir em e-mail/WhatsApp após ação explícita. Campos vazios são omitidos. Nenhum dado é armazenado ou enviado automaticamente.

O Project Blueprint Viewer alterna entre visão geral, planta e fluxo de dados conceitual. Exemplos não alegam implementação real.

## Checklist antes da publicação

- [ ] Alterar nome profissional.
- [ ] Revisar cargo e biografia.
- [ ] Adicionar foto própria, se desejado, e texto alternativo.
- [ ] Configurar e testar e-mail.
- [ ] Configurar e testar telefone.
- [ ] Configurar e testar WhatsApp.
- [ ] Configurar GitHub.
- [ ] Configurar LinkedIn, se disponível.
- [ ] Revisar tecnologias e serviços.
- [ ] Substituir projetos demonstrativos por projetos reais verificáveis.
- [ ] Revisar descrições, funcionalidades, diagramas e links.
- [ ] Atualizar SEO, domínio e canonical.
- [ ] Configurar e testar HTTPS.
- [ ] Testar CTAs em celular e desktop.
- [ ] Testar Core, modos, câmera e restauração em navegador com WebGL.
- [ ] Testar fallback SVG sem WebGL.
- [ ] Testar seleção, remoção, resumo, cópia e reinício do configurador.
- [ ] Revisar layout mobile e zoom de 200%.
- [ ] Confirmar ausência de dados pessoais de terceiros.
- [ ] Após personalização, definir `demo` como `false` e `seo.index` como `true`.
- [ ] Verificar robots, canonical e JSON-LD no HTML público.

## Checklist de publicação

- [ ] Alterar nome profissional, cargo e biografia.
- [ ] Adicionar foto própria, se desejado, com texto alternativo.
- [ ] Configurar e testar e-mail, telefone e WhatsApp.
- [ ] Configurar GitHub e LinkedIn, se disponíveis.
- [ ] Revisar tecnologias e serviços habilitados.
- [ ] Trocar estudos demonstrativos por projetos reais e verificáveis.
- [ ] Conferir descrições, diagramas e links dos projetos.
- [ ] Atualizar title, descrição, canonical e domínio.
- [ ] Configurar e testar HTTPS.
- [ ] Testar CTAs em celular e computador.
- [ ] Testar Architect Core, modos e fallback em navegador apropriado.
- [ ] Testar selecionar, remover, copiar, compartilhar e reiniciar configurador.
- [ ] Revisar teclado, mobile, leitor de tela e zoom de 200%.
- [ ] Retirar informações pessoais de terceiros.
- [ ] Após personalizar, definir `demo` como `false` e `seo.index` como `true`.
- [ ] Conferir robots, canonical e JSON-LD no HTML servido.

## Nginx e PHP-FPM em Ubuntu

Diretório de referência: `/var/www/portfolio-tech4`. Configure o document root, `index.php`, PHP-FPM e o socket disponível, que depende da versão instalada, por exemplo `/run/php/php8.3-fpm.sock`. CSS, JS e SVG são estáticos. O projeto não usa `.htaccess` ou endpoints PHP públicos adicionais.

A política de produção Nginx deve enviar apenas `/index.php` ao PHP-FPM e negar a execução pública de outros arquivos PHP. Bloqueie acesso HTTP a `config/`, `includes/`, `sections/`, `.git/`, arquivos ocultos, logs, backups e ferramentas de desenvolvimento. Confira os MIME types dos recursos estáticos no host. A configuração exata depende do virtual host e precisa ser revisada por quem o administra. O projeto não altera o servidor, Certbot ou permissões e não executa deploy.

Configure certificado HTTPS válido e redirecionamento HTTP segundo o processo do host. Atualize canonical para o domínio final. Mantenha noindex enquanto os dados forem demonstrativos.

## HestiaCP

Caminho ilustrativo: `/home/USUARIO/web/DOMINIO/public_html/`. Substitua os marcadores. Transfira os arquivos com SFTP ou mecanismo aprovado, selecione PHP compatível e confira as regras Nginx/PHP geradas pelo HestiaCP. Configure HTTPS pelo painel e confira a renovação. Não edite arquivos administrados pelo painel fora do fluxo de templates previsto.

## Atualizações e arquivos privados

Mantenha uma cópia personalizada de `config/portfolio.php` fora do document root. Ao atualizar o template, compare e reaplique as personalizações ou faça merge em branch própria. Deixe `.git`, backups, logs e arquivos temporários fora da pasta pública. Restrinja permissões pelo proprietário e grupo apropriados. Não use `777`.

Verificações locais:

```sh
find . -name '*.php' -print0 | xargs -0 -n1 php -l
git status --short
git diff --check
```
