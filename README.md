# Champions Challenge

Quantos campeões de League of Legends você consegue acertar antes que o tempo acabe?

**Jogar:** https://marlonrodler.github.io/leagueoflegends-game/

## Como jogar

Escolha a dificuldade e digite o nome de cada campeão. Acento, espaço, apóstrofo e maiúsculas não importam, e vale tanto o nome em português quanto o identificador em inglês (ex.: "Bardo" ou "Bard").

| Dificuldade | Tempo | Cartas |
|---|---|---|
| Yuumi (fácil) | 15 minutos | abertas: você vê o campeão |
| Lee Sin (difícil) | 20 minutos | viradas: você digita de memória |

Quando um nome também é o começo de outro (como "Vi", de Viego e Viktor), o acerto pede **Enter** para confirmar. No fim, dá para ver os campeões que faltaram.

## Dados

A lista vem do [Data Dragon](https://developer.riotgames.com/docs/lol#data-dragon), a base pública da Riot, sempre na versão mais recente e em português. Se ele não responder, o jogo usa o CommunityDragon como reserva, filtrando só os campeões jogáveis.

## Tecnologias

React 18 e Vite. Testes com Vitest e Testing Library. Títulos na fonte Cinzel (licença SIL Open Font).

## Rodar localmente

Precisa de Node.js 20.19 ou mais novo.

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm test         # testes
npm run build    # gera a pasta dist
```

## Publicar

A cada push na `main`, o GitHub Actions roda os testes, gera o build e publica na branch `gh-pages` (GitHub Pages).

## Histórico

A primeira versão (2023) usava Create React App e Chakra UI. Em 2026 o projeto foi modernizado:

- **Era impossível vencer.** A lista antiga tinha 254 entradas, mas 81 eram variantes de outros modos ("Jade_Annie"…). Acertar "Annie" virava duas cartas e contava um acerto só. Agora são os 173 campeões oficiais.
- Imagens carregam só quando aparecem na tela, por `https`, e nenhuma é baixada com as cartas viradas (antes eram ~250 imagens e 2,5 MB de uma vez).
- Sem Chakra UI, Emotion e Framer Motion: o JavaScript caiu de 171 KB para 50 KB (gzip).
- Saíram as fontes proprietárias da Riot (Beaufort e Univers) que estavam no repositório.
- Escolha de dificuldade explicada na tela, botão de desistir, tela de resultado com os que faltaram, erro com "tentar de novo" e testes.

Champions Challenge não é endossado pela Riot Games e não reflete as opiniões da Riot Games nem de ninguém oficialmente envolvido na produção ou gestão de League of Legends. League of Legends e Riot Games são marcas registradas da Riot Games, Inc.
