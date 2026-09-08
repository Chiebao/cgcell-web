# CG Cell Repair — Site Institucional

Site institucional da **CG Cell Repair**, assistência técnica de celulares em Sorocaba/SP.
Projeto real, em produção, desenvolvido para captar orçamentos pelo WhatsApp e fortalecer
a presença da loja na busca local do Google.

🔗 **Site no ar:** [chiebao.github.io/cgcell-web](https://chiebao.github.io/cgcell-web/)
📍 **Cliente:** CG Cell Repair — R. Isabel Machado Sizisnando, 11 — Jardim Josane, Sorocaba/SP

---

## Sobre o projeto

A loja precisava de uma página que resolvesse três coisas: apresentar os serviços com clareza,
transformar visitante em orçamento sem depender de ligação, e aparecer na busca de quem
procura conserto de celular na região.

O site é uma página única, estática, sem framework e sem backend — escolha proposital, porque
o cliente não tem equipe de TI e precisa hospedar de graça, sem manutenção de servidor.

---

## Funcionalidades

- **Formulário de orçamento que vira mensagem de WhatsApp** — o visitante preenche aparelho,
  serviço e descrição do problema; o JavaScript monta a mensagem formatada e abre o WhatsApp
  da loja já preenchido. Sem backend, sem banco de dados, sem custo.
- **Avaliações reais do Google** — nota, total e depoimentos vindos do perfil oficial da loja,
  com link para ler todos e para avaliar.
- **Catálogo de serviços** com foto real de cada tipo de reparo.
- **Máscara de telefone** aplicada em tempo real no campo de WhatsApp.
- **Design responsivo** pensado primeiro para o celular, que é de onde vem a maior parte
  dos acessos de uma assistência técnica.

---

## Decisões técnicas

Esta seção documenta o *porquê* de cada escolha, não só o *o quê*.

### Avaliações: dados reais, não fictícios

A seção de avaliações usa **exclusivamente conteúdo publicado no perfil real da loja no Google**,
reproduzido na íntegra e com o nome de quem escreveu. Depoimento inventado em site de empresa
é publicidade enganosa pelo Código de Defesa do Consumidor (art. 37) e viola os termos do Google.

O `Place ID` da loja (`ChIJVbZCJzNfz5QRZpLnIy0QMSE`) alimenta os links de leitura e de avaliação.
Ele também é o ponto de partida para a próxima evolução do projeto: puxar as avaliações
dinamicamente pela **Google Places API**, em vez de mantê-las no HTML.

### Otimização de imagens: 95% mais leve

As imagens originais eram PNGs de aproximadamente 2 MB cada, somando **14,4 MB** só de mídia.
Numa assistência técnica, o cliente acessa pelo celular, muitas vezes com dados móveis —
isso significava dezenas de segundos de tela em branco.

Convertendo para JPEG progressivo com qualidade 82 e redimensionando para 1200px de largura:

| | Antes | Depois |
|---|---:|---:|
| Imagens | 14,4 MB | **0,7 MB** |
| Página completa | ~14,5 MB | **~0,75 MB** |

Redução de **95%**, sem perda visível. Todas as imagens abaixo da dobra usam `loading="lazy"`.

### Animação que não quebra a página

As seções entram com uma animação de fade controlada por `IntersectionObserver`. O estado
inicial é `opacity: 0` — se o JavaScript falhar, o conteúdo sumiria.

A regra de opacidade está escopada em `.js .fade-up`, e a classe `js` é adicionada ao
`<html>` por um script inline no `<head>`. Sem JavaScript, a animação simplesmente não existe
e todo o conteúdo aparece normalmente. A animação também respeita `prefers-reduced-motion`.

### Logo e identidade

A arte do logo é quadrada e traz o nome da empresa embutido na imagem. Em 50px de altura na
barra de navegação, esse texto ficaria ilegível — e buscador não lê texto dentro de imagem.
A solução foi usar a arte como selo e escrever o nome ao lado em HTML: nítido em qualquer
resolução e indexável.

### Acessibilidade e SEO local

- `<label>` associado a cada campo do formulário, com `for` / `id`
- `aria-hidden` nos ícones decorativos e `aria-label` nos links que só têm ícone
- `alt` descritivo nas fotos de serviço
- `rel="noopener"` em todos os links externos
- `<title>` e `meta description` escritos com os termos de busca locais
- Endereço completo no rodapé, coerente com o cadastro do Google Meu Negócio
- Fonte de emoji declarada no fim da pilha de fontes, para renderizar em qualquer sistema

---

## Tecnologias

**HTML5 · CSS3 · JavaScript (ES6+)**

Sem framework, sem biblioteca de terceiros, sem etapa de build. A única dependência externa
é o Google Fonts (Rajdhani e Inter).

Recursos usados: CSS Grid, Flexbox, custom properties, `clamp()` para tipografia fluida,
`IntersectionObserver`, `backdrop-filter`.

---

## Estrutura

```
/
├── index.html      # Página completa (HTML, CSS e JS em arquivo único)
├── logo.png        # Logo da loja (também usado como favicon)
├── servico-*.jpg   # Fotos dos serviços (tela, bateria, conector, água, placa, software)
└── README.md
```

CSS e JavaScript ficam no próprio `index.html`. Para uma página única de menos de 50 KB,
isso elimina duas requisições de rede e o site carrega em uma só ida ao servidor.

---

## Como rodar

Não precisa de servidor nem de instalação:

```bash
git clone https://github.com/Chiebao/cgcell-web.git
cd cgcell-web
```

Depois é só abrir o `index.html` no navegador.

Hospedagem em **GitHub Pages**, publicado a partir da branch `main`.

---

## Próximos passos

- [ ] Integrar a **Google Places API** para carregar as avaliações dinamicamente
- [ ] Servir as imagens em **WebP** com `<picture>` e fallback em JPEG
- [ ] Menu de navegação para telas pequenas (hoje os links ficam ocultos no mobile)
- [ ] Unificar o perfil duplicado da loja no Google Meu Negócio

---

## Autoria

Desenvolvido por **Luana Chiebao Machado Godoy**
Estudante de Análise e Desenvolvimento de Sistemas — Universidade Cruzeiro do Sul

[LinkedIn](https://linkedin.com/in/luana-chiebao) · [GitHub](https://github.com/Chiebao)
