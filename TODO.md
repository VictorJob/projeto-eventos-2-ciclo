# TODO — redesign visual Eventos Fatec

## [x] Identidade visual consistente e reconhecível
- [x] Reformular a identidade do site existente com referência visual a *Danganronpa: Trigger Happy Havoc*, especialmente contrastes, menus, interfaces e elementos gráficos, sem criar uma landing page SaaS genérica e sem reproduzir telas protegidas de forma exata.
- [x] Manter **Eventos Fatec** visível e como marca institucional dominante. A referência transforma a apresentação; não deve fazer o site parecer que deixou de ser uma plataforma acadêmica de eventos.
- [x] Usar rosa/magenta intenso como destaque, branco predominante no claro, preto/carvão em estrutura e contraste, vermelho para perigo e amarelo para advertências pontuais.
- [x] Explorar formas fortes e assimétricas, faixas diagonais preto/branco, retícula/pontos, divisores angulares, contornos pretos, sombras duras deslocadas, tarjas, carimbos, números e faixas rosa; evitar aplicar todos os recursos a cada componente.
- [x] Abandonar aurora/manchas difusas, gradientes genéricos em títulos e botões, excesso de transparências, glassmorphism, navegação cápsula, bordas muito arredondadas, sombras difusas universais, simetria previsível e ícones decorativos sem função.
- [x] Criar tokens `--color-*` para cada nova cor na seção de tokens e uma paleta correspondente para tema claro e escuro.
- [x] Usar fonte condensada expressiva nos títulos e sans-serif legível nos textos e formulários, com fallbacks adequados.

## [x] Monokuma: presença deliberada, não repetitiva
- [x] Substituir o selo antigo por sprites reais e transparentes do Monokuma, da mesma Danganronpa Wiki/Fandom usada para os sprites de Chihiro, em todos os locais onde o Monokuma aparece.
- [x] Manter a maior presença no hero e usar aparições menores com sprites apenas em pontos estratégicos, como navegação e alguns estados vazios ou páginas de calendário.
- [x] **Não inserir Monokuma em todos os cards de eventos.** A identidade dos cards deve vir de fichas, numeração, categoria, data, disponibilidade, contornos e diagonais.
- [x] O Monokuma é complementar; Chihiro continua sendo o personagem principal das interações VN.

## [x] Página inicial e navegação
- [x] Reformular a navegação com identidade própria, divisores e contornos fortes, contraste rosa/branco/preto, estado ativo marcante e sem formato de cápsula.
- [x] Preservar todos os links, páginas, controles de tema e alternância Modo normal/Modo VN.
- [x] Redesenhar o hero sem aurora, manchas coloridas ou grid genérico; usar fundo predominantemente branco ou rosa, formas geométricas, diagonais, textura e identificação institucional.
- [x] Manter Eventos Fatec como foco do hero; usar referências de sistema/arquivo apenas como rótulos auxiliares, sem substituir informações reais.
- [x] Integrar Monokuma ao hero e manter Chihiro na apresentação.
- [x] Preservar e reformular os botões Novo Jogo e Continuar.
- [x] Reformular busca e filtros como painel de consulta/arquivo com bordas claras, foco rosa e campos compactos.

## [x] Cards, detalhe, inscrição e calendário
- [x] Reestilizar cards como fichas/arquivos: número/etiquetas, categoria, data, barra de disponibilidade, contornos, diagonais e destaques rosa. Preservar legibilidade, disponibilidade e navegação; não repetir o Monokuma card a card.
- [x] Reformular `evento.html` como ficha informativa com hierarquia forte, painéis, data/local/vagas destacados e CTA de inscrição claro.
- [x] Reformular `inscricao.html` como etapa de um sistema interno, preservando simplicidade, formulários, erros, confirmação e diálogos de Chihiro.
- [x] Dar ao calendário cabeçalho, navegação mensal e divisores fortes, indicadores rosas e referências discretas ao Monokuma, sem prejudicar grade, leitura ou interação.
- [x] Preservar filtros, carrossel, estados de carregamento/vazio/erro e comportamento responsivo já existentes.

## [x] Visual novel com Chihiro
- [x] Manter os seis sprites instalados, suas proporções/transparência, o motor `assets/js/vn.js`, sequência de falas, typewriter, clique/teclado, encerramento, modo compacto e integração `theme.js`.
- [x] Atualizar somente a apresentação: sprite integrado à cena e protagonista visual, tarja de nome, caixa horizontal inferior, bordas angulares, rosa/branco/preto e indicador de avanço.
- [x] Manter transições discretas de entrada/troca de expressão, acessibilidade e `prefers-reduced-motion`.
- [x] “Modo normal” esconde a camada narrativa sem comprometer conteúdo ou controles da página; “Modo VN” permite reativá-la.

## [x] Painel administrativo
- [x] Estender a identidade ao login, painel, eventos, categorias, inscritos e usuários com estilo mais contido e funcional que o público.
- [x] Priorizar tabelas, formulários, botões, painéis, marcações e estados de sucesso/erro claros.
- [x] Não inserir diálogos VN no admin e não alterar autenticação, RLS, serviços, operações de banco, CRUD, proteção de páginas nem dados pessoais.

## [x] Requisitos técnicos, responsividade e acessibilidade
- [x] Preservar HTML/CSS/JavaScript puro, estrutura de módulos IIFE e Supabase existentes; não adicionar framework ou dependência desnecessária.
- [x] Não alterar credenciais, configuração de conexão, consultas, serviços, autenticação, RLS, migrations ou funcionalidades de calendário, inscrição, filtros e carrossel.
- [x] Examinar e preservar IDs, classes e atributos `data-*` usados por scripts em `eventoView.js`, páginas públicas e admin.
- [x] Garantir temas claro/escuro persistentes, foco visível, navegação por teclado, contraste, aria existente e formulários usáveis.
- [x] Adaptar decoração e Monokuma em telas pequenas sem sobrepor textos, diálogos, campos, botões ou navegação.
- [x] Respeitar `prefers-reduced-motion` e evitar animações exageradas ou contínuas.

## [x] Ajustes solicitados: modo e calendário
- [x] Mostrar “Modo normal” quando a Visual Novel estiver ativa; no modo normal, oferecer “Modo VN”, com `aria-label` e preferência persistente coerentes.
- [x] Ao abrir o calendário, exibir imediatamente o mês atual e destacar hoje pela data local, sem abrir automaticamente o painel do dia.
- [x] Renderizar a grade e o dia de hoje antes da consulta Supabase; se a consulta falhar, conservar a grade, informar a falha e oferecer uma ação de nova tentativa.

## [x] Interação do Monokuma no hero
- [x] O sprite principal do hero responde a hover e foco com um efeito curto de visual novel; as aparições decorativas menores permanecem estáticas.
- [x] Clicar ou ativar o sprite pelo teclado abre uma cena ampliada em tela cheia com o sprite PNG transparente fornecido pelo usuário e a fala exata “Ei, não toque em mim!!!”.
- [x] A cena dispõe de nome do personagem, caixa de fala horizontal inferior e fechamento por botão, Escape ou clique no backdrop; a fala não pode ser avançada nem reiniciada, e o foco retorna ao gatilho ao fechar.
- [x] A interação permanece responsiva, acessível e compatível com `prefers-reduced-motion`, temas claro/escuro e sem cores fixas fora dos tokens.

## [x] Estado final dos diálogos de Chihiro e Monokuma
- [x] Quando a última fala de Chihiro terminar de aparecer na home, manter a cena aberta, trocar para o sprite fullbody transparente do usuário (278 × 802 px) carregado de `/assets/images/personagens/chihiro/fullbody.png` e fazer a caixa horizontal inferior com nome e texto sumir suavemente, como na referência; tornar o sprite um botão acessível, no qual clique, Enter ou Espaço reiniciam a sequência desde a primeira fala e restauram caixa, sprite e typewriter. Se o sprite falhar ao carregar, ocultar também o botão invisível de replay. Manter o botão de fechar acessível, restringir a opção à home e preservar os diálogos compactos.
- [x] Na cena do Monokuma, preservar a fala exata “Ei, não toque em mim!!!” como texto estático sem botão de avanço ou replay; permitir somente fechar por botão ×, Escape ou clique no backdrop. Ao fechar, devolver o foco ao gatilho externo original.
- [x] Usar somente animações reduzidas quando permitido, honrar `prefers-reduced-motion`, manter os temas claro/escuro e o layout mobile, sem introduzir cores CSS fixas fora dos tokens existentes.
- [x] Registrar a URL de origem e a observação de direitos de uso/redistribuição nos READMEs; manter a cópia PNG local e referenciar o fullbody localmente para funcionar tanto em servidor local quanto no WebDev.
- [x] Adicionar favicon do Monokuma em PNG e ICO e referenciá-lo nas páginas públicas e administrativas.
- [x] Não alterar banco de dados, Supabase, autenticação, RLS, serviços ou migrations.

## [x] Atualização do favicon pixel art do Monokuma
- [x] Substituir a arte usada pelos favicons existentes pela imagem pixel art fornecida pelo usuário, preservar o fundo branco e o formato quadrado, gerar PNG de 64 × 64 px e ICO multirresolução de 16, 32, 48 e 64 px com vizinho mais próximo, e conservar as referências já presentes nas páginas públicas e administrativas.

> **Validação do favicon:** comparação pixel a pixel com a redução nearest-neighbor da imagem enviada, verificação dos quatro tamanhos do ICO, 10 páginas HTML com as referências e respostas HTTP 200 nos dois caminhos.

## [x] Favicon transparente do Monokuma
- [x] Substituir o favicon pixel art anterior pelo PNG transparente fornecido em `https://www.pngkey.com/png/full/227-2278222_monokuma-png.png`, preservar a imagem completa e sua proporção em um canvas transparente quadrado de 64 × 64 px, gerar ICO transparente nas resoluções 16, 32, 48 e 64 px e manter os caminhos de favicon já usados nas páginas públicas e administrativas.

> **Validação do favicon transparente:** PNG 64 × 64 RGBA com transparência confirmada; ICO contém 16, 32, 48 e 64 px e preserva alfa em todos os tamanhos. As 10 páginas HTML mantêm os caminhos atuais, os dois assets responderam HTTP 200 no servidor Preview e `git diff --check` passou.

## [x] Fundo de ambiente da conversa de Chihiro
- [x] Usar a imagem de sala de computadores fornecida pelo usuário como ambiente atrás do sprite de Chihiro na cena VN da home (`#home-vn`), mantendo-a visível também no estado fullbody final. Copiar a imagem sem alteração para um asset local, adaptar o enquadramento a desktop e celular, preservar contraste/legibilidade da caixa e controles, e não alterar os outros diálogos, o admin nem os fluxos existentes.

> **Validação do cenário:** screenshots do Preview em desktop (1280 × 900) e celular (375 × 812) mostram o ambiente atrás do sprite; o enquadramento se adapta ao palco e a caixa/controles permanecem legíveis. O asset local mede 1013 × 760 px.

## [ ] Verificação e entrega
- [ ] Verificar páginas públicas e administrativas, tema claro/escuro e modo normal/VN em todos os fluxos funcionais.
- [ ] Verificar renderização/avanço dos diálogos de Chihiro, composição e escala do Monokuma, calendário, filtros, carrossel, formulários e navegação com dados reais.
- [ ] Conferir layout em desktop e celular e corrigir sobreposições ou falhas visuais detectadas.
- [x] Não afirmar que uma funcionalidade foi testada sem executá-la. Registrar limitações decorrentes de credenciais/sessão externa ausentes.
- [x] Entregar lista de arquivos e resumo das mudanças, com instruções de teste; informar que nenhuma migration é necessária se nenhuma alteração de banco foi feita.

> **Limitação da validação:** a cópia não contém credenciais Supabase reais nem sessão administrativa. Portanto, carregamento de eventos ao vivo, inscrições, login e CRUD do admin não foram testados. O calendário mantém mês e hoje visíveis e informa a falha de conexão; outras telas de dados continuam mostrando seus estados de erro sem conexão. Nenhum schema foi alterado e nenhuma migration foi criada.

> **Validação desta correção:** no Preview, a fala de Chihiro foi avançada até o fim; `fullbody.png` carregou (278 px), ficou visível, e a caixa chegou a opacidade 0 após a transição. O clique no fullbody reiniciou a sequência. A cena do Monokuma exibiu “Ei, não toque em mim!!!”, sem botões de avanço/replay; o botão × a fechou e o foco voltou ao gatilho. Capturei o layout em desktop; não emulei `prefers-reduced-motion`, nem validei admin/eventos ao vivo por falta de credenciais.
