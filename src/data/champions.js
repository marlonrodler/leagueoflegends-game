// Lista de campeões.
// Fonte principal: Data Dragon, a base pública e oficial da Riot (versão mais recente, em português).
// A versão original usava o champion-summary do CommunityDragon, que hoje traz 254 entradas:
// 173 campeões e 81 variantes de outros modos ("Jade_Annie"...). Com as variantes, era impossível
// vencer, porque acertar "Annie" virava duas cartas mas contava um acerto só.

const DDRAGON = 'https://ddragon.leagueoflegends.com';
const CDRAGON_SUMMARY =
  'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-summary.json';

/** Deixa só letras minúsculas sem acento: "Kai'Sa" → "kaisa", "Nunu e Willump" → "nunuewillump". */
export function normalize(text = '') {
  return String(text)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
}

/** Monta um campeão no formato do jogo. `key` é o id do Data Dragon (ex.: "MonkeyKing"). */
export function toChampion({ key, name, title }) {
  return {
    key,
    name,
    title: title ?? '',
    image: `${DDRAGON}/cdn/img/champion/loading/${key}_0.jpg`,
    // Aceita o nome em português e o identificador em inglês (ex.: "Bardo" e "Bard")
    answers: [...new Set([normalize(name), normalize(key)])],
  };
}

async function getJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return res.json();
}

export async function loadChampions(signal) {
  try {
    const [version] = await getJson(`${DDRAGON}/api/versions.json`, signal);
    const data = await getJson(`${DDRAGON}/cdn/${version}/data/pt_BR/champion.json`, signal);
    return {
      version,
      champions: Object.values(data.data).map((c) => toChampion({ key: c.id, name: c.name, title: c.title })),
    };
  } catch (err) {
    if (signal?.aborted) throw err;
    // Reserva: CommunityDragon, só com os campeões jogáveis (ids abaixo de 10000)
    const list = await getJson(CDRAGON_SUMMARY, signal);
    return {
      version: null,
      champions: list
        .filter((c) => c.id > 0 && c.id < 10000)
        .map((c) => toChampion({ key: c.alias, name: c.name, title: c.description })),
    };
  }
}

/** Embaralha uma cópia da lista (Fisher-Yates). */
export function shuffle(list, random = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
