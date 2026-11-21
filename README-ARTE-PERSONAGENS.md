# Sprites e arte da Visual Novel

## Chihiro Fujisaki

As cenas públicas usam Chihiro Fujisaki, seguindo o material de referência fornecido pelo usuário. A pedido do usuário, seis sprites foram obtidos da [galeria da Danganronpa Wiki/Fandom](https://danganronpa.fandom.com/wiki/Chihiro_Fujisaki/Sprite_Gallery) e estão em `assets/images/personagens/chihiro/`. Os arquivos indexados estavam em WebP; foram convertidos para PNG RGBA sem redimensionar ou recortar.

Os seis sprites de expressão são `normal.png`, `happy.png`, `embarrassed.png`, `surprised.png`, `worried.png` e `sad.png`. Eles têm de 250 × 446 a 294 × 544 px. Para uma substituição em maior resolução, use os mesmos nomes, PNG transparente, orientação retrato e, de preferência, aproximadamente 1000 × 1500 px. O motor mantém a proporção com `object-fit: contain`.

`assets/images/personagens/chihiro/fullbody.png` (278 × 802 px, RGBA transparente) é usado somente no estado final persistente da conversa de Chihiro na página inicial. Foi obtido da [URL direta do CDN fornecida pelo usuário](https://static.wikia.nocookie.net/danganronpa/images/a/a8/Chihiro_Fujisaki_Fullbody_Sprite_%281%29.png/revision/latest?cb=20170520020217). O navegador entregou a imagem como WebP; a cópia PNG foi convertida sem recorte ou redimensionamento, mantendo dimensões e transparência.

Não foi obtida uma expressão brava; `angry.png` continua opcional e não é usado pelas falas atuais. Chihiro e seus sprites são material de *Danganronpa*, não criações originais deste projeto. A inclusão não implica domínio público ou licença de redistribuição; confirme os direitos aplicáveis antes de publicar ou redistribuir o site.

Consulte [`assets/images/personagens/chihiro/README.md`](assets/images/personagens/chihiro/README.md) para dimensões, origem e exemplo da API de diálogos sequenciais. As cenas antigas da Mika e do Sol foram migradas; seus placeholders foram removidos por não haver referências ativas.

## Monokuma

O selo SVG `assets/images/monokuma-mark.svg` foi substituído por sprites reais e transparentes em `assets/images/personagens/monokuma/`:

- `monokuma-standing.png` — sprite em pé, 360 × 516 px, usado no hero com hover e foco visíveis.
- `monokuma-grin.png` — sprite sorrindo, 360 × 360 px, usado nas aparições menores da navegação, calendário e estados vazios.
- `monokuma-stop.png` — sprite de reação fornecido pelo usuário, 526 × 560 px, usado na abertura da cena ampliada.

Os sprites `monokuma-standing.png` e `monokuma-grin.png` foram encontrados em resultados públicos indexados à [Danganronpa Wiki/Fandom](https://danganronpa.fandom.com/wiki/Monokuma), que também mantém a [galeria de sprites de Monokuma](https://danganronpa.fandom.com/wiki/Monokuma/Sprite_Gallery). Eles foram convertidos de WebP para PNG RGBA, preservando proporções e canal alfa, sem recorte nem redimensionamento. Chihiro e esses dois sprites vêm da mesma fonte comunitária Fandom. `monokuma-stop.png` veio do anexo enviado pelo usuário e foi copiado sem modificação.

Durante a revisão, a página da galeria abriu uma verificação automatizada no navegador. Não tentei contorná-la nem solicitei autenticação; usei apenas os arquivos retornados pelo índice público de imagens, que identificava a Danganronpa Wiki/Fandom como fonte, sem resolver CAPTCHA. Se os links de origem mudarem, busque novamente na galeria pública.

Monokuma é um personagem protegido de *Danganronpa*, não uma arte original do projeto. A presença é complementar, limitada ao hero e a pontos estratégicos; ele não é repetido nos cards de eventos. Chihiro continua protagonista das conversas VN. A obtenção de imagens da Wiki não concede licença de redistribuição: verifique os direitos aplicáveis antes de publicar ou distribuir o site.

No hero, o sprite é um botão com hover e foco visíveis. Clique ou Enter abre o diálogo nativo em tela cheia, que exibe a fala estática “Ei, não toque em mim!!!”. A cena não possui avanço nem replay; o botão ×, Escape e clique no backdrop encerram a cena e devolvem o foco ao gatilho.

O favicon PNG (`assets/images/personagens/monokuma/favicon.png`, 64 × 64 px, RGBA) agora usa a imagem PNG transparente fornecida pelo usuário em [pngkey.com](https://www.pngkey.com/png/full/227-2278222_monokuma-png.png), baixada em 553 × 649 px. A imagem completa é reduzida proporcionalmente e centralizada em um canvas quadrado transparente, sem recorte nem fundo opaco. `favicon.ico`, na raiz, contém versões de 16, 32, 48 e 64 px que preservam o canal alfa; os caminhos referenciados nas páginas permanecem inalterados.

A licença e os direitos de redistribuição da imagem não foram verificados; confirme os termos aplicáveis antes de publicar ou redistribuir o site.
