# Code Architect — portfólio demonstrativo

Modelo profissional em português para apresentar serviços de desenvolvimento freelancer. O repositório inclui conteúdo fictício de demonstração e nenhum contato de terceiros. Antes de publicar, personalize `config/portfolio.php`, substitua projetos-conceito por trabalho real e revise os textos. SEO permanece em `noindex,follow` enquanto `demo` estiver ativo.

## Tecnologias

PHP puro, HTML semântico, CSS, JavaScript nativo, Canvas, SVG e WebGL. Não há Composer, NPM, banco de dados ou etapa de compilação. O canvas usa shaders GLSL ES próprios e cubos com buffers persistentes. Caso WebGL falhe, o diagrama SVG permanece visível e controles/conteúdo continuam acessíveis.

## Estrutura

- `index.php`: composição da página.
- `config/portfolio.php`: identidade, SEO e conteúdo editável.
- `includes/`: escape, contatos, head, cabeçalho e rodapé.
- `sections/`: conteúdo semântico por assunto.
- `assets/css/`: variáveis, estilo, layout, componentes, animação e responsividade.
- `assets/js/`: navegação e interações, visualizador e configurador.
- `assets/js/webgl/`: matemática matricial, geometria, shaders, câmera e renderer.

## Executar localmente

Requer PHP 8+ com servidor embutido para desenvolvimento. A partir da raiz:

```sh
php -S 127.0.0.1:8080
```

Acesse `http://127.0.0.1:8080`. O servidor PHP embutido é apenas para desenvolvimento, não exposição pública.

## Personalização

Edite `config/portfolio.php`. Defina nome, cargo, biografia, localização e disponibilidade. Preencha contatos somente quando desejar publicá-los. Email e telefone são validados e WhatsApp aceita número internacional com dígitos. URLs de GitHub e LinkedIn precisam usar HTTPS. Contato vazio não produz link.

Edite os arrays `technologies`, `services`, `projects`, `builder_components` e `process` para ajustar as matrizes, ofertas, estudos e etapas. Cada projeto deve indicar seu caráter acadêmico, pessoal ou demonstrativo e conter apenas funcionalidades que realmente existem. Imagens podem ser adicionadas a `assets/images` e referenciadas por configuração, se o conteúdo da seção for adaptado.

Altere as cores em `assets/css/variables.css`. Tipos Space Grotesk e Manrope usam fallback local sem fonte remota. IBM Plex Mono usa Courier New como alternativa.

## Interações e WebGL

O núcleo de arquitetura utiliza WebGL/WebGL2 nativo, GLSL, buffers de vértices e índices, perspectiva e matrizes próprias. Camadas de cubos são desenhadas a partir da mesma geometria. Structure mostra sólidos, Blueprint mostra linhas e Exploded afasta módulos. Arraste o canvas para rotacionar. O movimento reduz quando a aba está oculta, a cena sai da área visível ou o usuário prefere movimento reduzido. A resolução é limitada a DPR 1.5. Em perda do contexto, o SVG alternativo volta a ser mostrado.

O configurador é uma representação SVG, compartilha o conteúdo textual das opções e não solicita dados ao servidor. Nome, objetivo e observações permanecem no navegador e só são incluídos em texto após ação de copiar, WhatsApp ou email. A estrutura não é recomendação final de produção. Os estudos de caso permitem alternar resumo, blueprint e fluxo conceitual.

## Nginx e PHP-FPM

Aponte o `root` do site para a pasta do projeto, configure um pool PHP-FPM e encaminhe arquivos PHP ao socket correspondente. Exemplo simplificado:

```nginx
server {
    listen 80;
    server_name exemplo.com www.exemplo.com;
    root /var/www/portfolio-tech4;
    index index.php;
    location / { try_files $uri $uri/ /index.php?$query_string; }
    location ~ \\.php$ {
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_pass unix:/run/php/php-fpm.sock;
    }
    location ~ /\\. { deny all; }
}
```

Adapte versão/socket e configuração à distribuição. Em hospedagem HestiaCP, carregue arquivos para o document root do domínio pela interface ou SFTP, selecione PHP disponível e confira as regras Nginx/PHP geradas pelo painel. Não edite arquivos gerenciados pelo Hestia sem conhecer o fluxo de templates do painel.

Habilite HTTPS pelo painel ou configure certificado válido no servidor, redirecione HTTP para HTTPS e confirme a renovação automática. Atualize `seo.canonical` para a URL final sem barra de rastreamento e `seo.title` / descrição. Após revisar todos os dados e remover conteúdo demonstrativo, defina `demo` como `false` e `seo.index` como `true`. Verifique o HTML servido para confirmar a diretiva robots desejada e os dados estruturados.

## Segurança e publicação

Conteúdo dinâmico de texto usa `htmlspecialchars`. Links externos aceitam somente HTTP(S) e abrem em contexto separado com `noopener noreferrer`. Não há banco de dados, armazenamento de formulário, endpoint administrativo ou envio automático. Configure backups e permissões de leitura para o usuário do servidor web conforme a hospedagem.
