# Plano — redesign visual Eventos Fatec

## Direção de design

**Movimento:** direção editorial de visual novel escolar, inspirada na linguagem gráfica de *Danganronpa: Trigger Happy Havoc*, sem copiar telas protegidas.

**Princípios:** (1) Eventos Fatec permanece a marca acadêmica dominante; (2) contraste gráfico preto/branco/magenta com vermelho e amarelo só para alertas; (3) geometria angular, diagonais, retícula pontual e sombras deslocadas substituem aurora, vidro e cápsulas; (4) leitura, navegação e formulários prevalecem sobre decoração.

**Paleta:** claro com branco predominante, carvão de estrutura e rosa/magenta de ação; escuro com carvão, painéis contrastantes e o mesmo rosa como destaque. Novas cores CSS devem permanecer como tokens temáticos `--color-*` na seção de tokens.

**Layout:** navegação em barra retangular com divisores; hero assimétrico, mantendo título e logotipo Eventos Fatec em primeiro plano; busca como painel de consulta; eventos como fichas informativas; detalhe e inscrição como documentos/painéis; calendário legível e funcional; admin com a mesma gramática, porém menos decoração.

**Elementos de assinatura:** (1) diagonais preto/branco em pequenas faixas de interface; (2) tarjas rosa, numeração e carimbos de arquivo; (3) sprites PNG transparentes reais de Monokuma, obtidos da Danganronpa Wiki/Fandom, em destaque no hero e em aparições menores na navegação, calendário e estados vazios. Não colocar Monokuma em cada card. Chihiro permanece protagonista das conversas VN; o motor `assets/js/vn.js` passa a oferecer um estado final persistente opcional na home, sem alterar as demais instâncias compactas.

**Interação e movimento:** hover de alto contraste e deslocamento curto; transições discretas; `prefers-reduced-motion` preservado. A alternância “Modo normal”/“Modo VN” permanece persistente e acessível; temas continuam ligados a `assets/js/theme.js`.

**Tipografia:** Barlow Condensed em títulos e identificadores; Inter em texto, dados e formulários; manter a fonte já carregada para compatibilidade dos diálogos VN.

**Marca e voz:** posicionamento — plataforma acadêmica Fatec para descobrir, organizar e acompanhar eventos, apresentada com energia de visual novel; personalidade: gráfica, acadêmica, irreverente. Chamada principal permanece “Eventos Fatec”; microcopy pode usar rótulos de arquivo/jogo sem substituir nomes reais, orientações ou estados técnicos.

## Escopo técnico

O projeto de trabalho é a cópia aprovada em `/home/ubuntu/eventosfatec`; a origem em `/home/ubuntu/projects/eventos-fatec/projeto-eventos-2-ciclo-main` permanece intacta. A cópia não contém `.env` nem `supabase-credentials.js`; manter somente o arquivo de exemplo e não alterar conexão, consultas, políticas ou banco.

Arquivos a alterar nesta continuação anterior:
- `assets/css/styles.css`: substituir as aparições do selo SVG por sprites transparentes, manter o layout editorial e destacar o dia atual no calendário.
- `index.html`: usar sprite real de Monokuma no hero, mantendo IDs e a cena VN.
- `assets/js/theme.js`: rotular a alternância como “Modo normal” quando a VN estiver ativa e “Modo VN” quando estiver no modo normal; manter preferência e acessibilidade.
- `calendario.html` e `js/pages/calendario.js`: renderizar imediatamente o mês atual e o dia local de hoje antes da consulta ao Supabase; manter grade e data visíveis se a consulta falhar; oferecer nova tentativa e manter o erro informado.
- `README-ARTE-PERSONAGENS.md`, `TODO.md` e `plan.md`: registrar as fontes dos sprites e os resultados desta solicitação.
- Novos arquivos `assets/images/personagens/monokuma/monokuma-standing.png` e `assets/images/personagens/monokuma/monokuma-grin.png`, convertidos de imagens WebP indexadas pela Danganronpa Wiki/Fandom sem alteração de conteúdo ou proporção.
- Remover o selo SVG legado de `assets/images`, agora substituído pelos dois sprites PNG.

O calendário já calcula datas SQL como componentes locais, evitando conversões UTC. O ajuste não deve abrir o modal do dia automaticamente: ao entrar, exibe o mês atual, destaca hoje e permite abrir o painel pelo clique. Erro Supabase deve permanecer visível, pois ocultá-lo esconderia a ausência de conexão.

O visual administrativo permanece mais limpo e sem diálogos VN. Não alterar `admin/js/`, serviços, autenticação, `RLS`, tabelas ou migrations. A falta de credenciais Supabase reais impede comprovar carregamento de eventos ao vivo; a grade mensal deve funcionar independentemente dessa configuração.

## Estrutura e workflow

O site permanece estático: páginas HTML na raiz e em `admin/`; estilos compartilhados em `assets/css/`; scripts IIFE em `assets/js/`, `js/` e `admin/js/`; integrações e políticas existentes em `supabase/`. Não adicionar framework, build ou dependências JavaScript.

A cópia de trabalho já foi preparada no WebDev, mantendo a origem intacta. Manter o manifesto sincronizado; validar sintaxe, referência dos assets, comportamento visual do calendário em fallback, botão de modo e telas desktop/mobile. Operações dependentes de credenciais e sessão externas só serão consideradas testadas se estiverem disponíveis.

## Adendo — interação de Monokuma no hero

O sprite principal do hero será um botão acessível: hover e foco apresentam uma reação visual curta, e ativação abre um `<dialog>` nativo em tela cheia. A cena ampliada usa a pose PNG transparente fornecida pelo usuário (526 × 560 px), posicionada acima de uma caixa de diálogo inferior com “Ei, não toque em mim!!!”. A fala é estática, sem controles de avanço ou replay; a cena só pode ser fechada pelo botão ×, Escape ou backdrop, devolvendo o foco ao gatilho. O efeito respeita `prefers-reduced-motion`, tema claro/escuro, teclado e telas pequenas. O comportamento fica em um IIFE da home e não envolve backend, admin ou migrations.

Arquivos planejados: criar `assets/images/personagens/monokuma/monokuma-stop.png` por cópia inalterada do anexo e `assets/js/monokuma-interaction.js`; alterar `index.html`, `assets/css/styles.css`, `README-ARTE-PERSONAGENS.md`, `plan.md` e `TODO.md`.

## Adendo — estados finais persistentes dos diálogos

Na home, depois que a última fala de Chihiro estiver totalmente apresentada, manter a cena aberta e carregar o fullbody PNG transparente local em `/assets/images/personagens/chihiro/fullbody.png`; a caixa horizontal inferior com nome e texto deve desaparecer suavemente, conforme a referência do usuário. O sprite fullbody passa a ser um botão nativo acessível: clique, Enter ou Espaço reiniciam a sequência desde a primeira fala, restaurando caixa, sprite e typewriter. Se o sprite não carregar, ocultar também o botão invisível de replay. O controle de fechar permanece disponível. A opção de replay fica configurável em `vnDialogue.mount` e desativada por padrão para preservar os diálogos compactos da inscrição e de outras páginas; a alteração não mexe no comportamento do Monokuma.

Na cena do Monokuma, preservar a fala literal “Ei, não toque em mim!!!” como texto não interativo. Não mostrar botão de replay nem aceitar clique ou tecla para reiniciar/avançar a fala; os únicos controles da cena são fechar pelo botão ×, Escape ou backdrop, devolvendo o foco ao gatilho externo original.

O fullbody de Chihiro foi fornecido pelo usuário pela URL direta `https://static.wikia.nocookie.net/danganronpa/images/a/a8/Chihiro_Fujisaki_Fullbody_Sprite_%281%29.png/revision/latest?cb=20170520020217`. O arquivo entregue pelo navegador foi validado como 278 × 802, RGBA com transparência; a cópia PNG preserva o tamanho e o canal alfa. A origem e a observação de direitos de redistribuição serão registradas nos READMEs. Referenciar o asset local do projeto em `/assets/images/personagens/chihiro/fullbody.png`, em vez de depender de `/manus-storage/`, para suportar o servidor local e o Preview WebDev. O favicon do Monokuma usa agora o PNG RGBA transparente fornecido pelo usuário em `https://www.pngkey.com/png/full/227-2278222_monokuma-png.png`, mantendo a proporção, sem recorte e sem fundo opaco; preservar os links existentes nas páginas públicas e administrativas. Manter cores CSS dentro dos tokens existentes e honrar tema claro/escuro, mobile e `prefers-reduced-motion`. Não há mudança de banco, RLS, autenticação ou migrations.

Arquivos desta continuação: criar `assets/images/personagens/chihiro/fullbody.png`, `assets/images/personagens/monokuma/favicon.png` e `favicon.ico`; alterar `assets/js/vn.js`, `js/pages/home.js`, `assets/js/monokuma-interaction.js`, `index.html`, as demais páginas HTML públicas/admin para incluir o favicon, `assets/css/styles.css`, `README-ARTE-PERSONAGENS.md`, `assets/images/personagens/chihiro/README.md`, `TODO.md` e `plan.md`.

## Adendo — cenário de laboratório para a conversa de Chihiro

A imagem da sala de computadores fornecida pelo usuário será copiada sem alteração para `assets/images/personagens/chihiro/ambiente-laboratorio.png` e usada como fundo do palco VN apenas na home (`#home-vn`), atrás do sprite durante as falas e no estado fullbody final. Usar `cover` responsivo e uma camada de gradiente com o token existente `--color-vn-scene`, preservando a legibilidade da caixa e sem alterar as outras instâncias compactas ou administrativas. Não há mudança de JavaScript, backend ou migrations.

Arquivos: criar `assets/images/personagens/chihiro/ambiente-laboratorio.png`; alterar `assets/css/styles.css`, `assets/images/personagens/chihiro/README.md`, `plan.md` e `TODO.md`.

## Adendo — favicon transparente do Monokuma

Substituir a arte pixel art anterior pela imagem PNG transparente de `https://www.pngkey.com/png/full/227-2278222_monokuma-png.png` (553 × 649 px, RGBA). Preservar o conteúdo completo e a proporção, reduzir para caber centralizado em um canvas PNG RGBA de 64 × 64 px transparente, e gerar `favicon.ico` com versões 16, 32, 48 e 64 px que também preservem o canal alfa. Manter os caminhos já referenciados nas páginas públicas e administrativas; não é necessário alterar HTML, código da aplicação, banco, RLS, autenticação ou migrations.

Arquivos: atualizar `assets/images/personagens/monokuma/favicon.png`, `favicon.ico`, `README-ARTE-PERSONAGENS.md`, `plan.md` e `TODO.md`.
