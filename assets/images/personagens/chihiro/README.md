# Sprites de Chihiro Fujisaki

Os seis sprites abaixo foram obtidos da [galeria de sprites de Chihiro Fujisaki na Danganronpa Wiki/Fandom](https://danganronpa.fandom.com/wiki/Chihiro_Fujisaki/Sprite_Gallery), conforme autorização do usuário. Os arquivos indexados foram entregues em WebP e convertidos para PNG RGBA sem recorte ou redimensionamento. A transparência e as dimensões originais foram preservadas.

- `normal.png` — neutra; 294 × 544 px.
- `happy.png` — sorriso discreto; 250 × 463 px.
- `embarrassed.png` — olhos fechados e rubor; 250 × 462 px.
- `surprised.png` — boca aberta, mãos juntas; 250 × 470 px.
- `worried.png` — expressão apreensiva; 250 × 446 px.
- `sad.png` — chorando; 250 × 475 px.
- `fullbody.png` — sprite de corpo inteiro usado ao final da apresentação na home; 278 × 802 px, RGBA transparente. Fonte direta indicada pelo usuário: [PNG no CDN da Danganronpa Wiki/Fandom](https://static.wikia.nocookie.net/danganronpa/images/a/a8/Chihiro_Fujisaki_Fullbody_Sprite_%281%29.png/revision/latest?cb=20170520020217). O navegador serviu WebP; a cópia PNG foi convertida sem recorte ou redimensionamento.
- `ambiente-laboratorio.png` — imagem de sala de computadores fornecida pelo usuário (1013 × 760 px); usada como fundo local apenas do palco VN da home, atrás do sprite durante as falas e no estado fullbody final. Manter a cópia original, sem recorte ou alteração.

As imagens disponíveis na galeria/indexação são pequenas e podem parecer suaves quando ampliadas no palco. Para substituir por artes de maior qualidade, mantenha os mesmos nomes de arquivo e use PNG RGBA transparente, em retrato, idealmente por volta de 1000 × 1500 px. A interface usa `object-fit: contain`; não é necessário recortar nem esticar os sprites. Não há uma variante brava entre os arquivos instalados. O slot `angry.png` permanece opcional e sem uso nas falas atuais.

Os sprites são material do personagem de *Danganronpa* e não são criações originais deste projeto. A inclusão não significa que estejam em domínio público ou licenciados para redistribuição; confirme os direitos aplicáveis antes de publicar ou redistribuir o site.

## Como adicionar falas

O motor `assets/js/vn.js` mantém a compatibilidade com fala única e também aceita sequências:

Na página inicial, `completionSprite` e `completionAlt` são opções adicionais: ao concluir a última fala, o sprite muda para `fullbody.png` e a caixa com nome e texto desaparece suavemente. O próprio fullbody fica acessível por clique, Enter ou Espaço para reiniciar a sequência; o botão × sempre encerra a cena. Use o caminho local `/assets/images/personagens/chihiro/fullbody.png`, disponível tanto no servidor local quanto no WebDev, evitando depender de `/manus-storage/`.

```js
vnDialogue.mount(document.getElementById("home-vn"), {
    lines: [
        { name: "Chihiro Fujisaki", text: "Olá!", sprite: "normal.png", expression: "normal" },
        { name: "Chihiro Fujisaki", text: "Temos eventos novos!", sprite: "happy.png", expression: "happy" }
    ]
});
```

Cada clique (ou ativação pelo teclado) revela primeiro a frase inteira se ainda estiver digitando; a próxima ativação avança para a fala seguinte. O botão × encerra a sequência. Use `compact: true` para encaixar a cena em formulários e áreas estreitas. O primeiro parâmetro `host` deve ser um elemento existente na página. Respeite o modo sério salvo pelo `theme.js`; ele esconde a camada narrativa, não o conteúdo da página.
