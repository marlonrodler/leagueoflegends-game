import { normalize, shuffle } from '../data/champions';

// As duas dificuldades do jogo original, com os mesmos tempos.
export const DIFFICULTIES = {
  yuumi: {
    id: 'yuumi',
    label: 'Yuumi',
    level: 'Fácil',
    minutes: 15,
    reveal: true,
    help: 'As cartas ficam à mostra: você vê o campeão e digita o nome.',
  },
  leesin: {
    id: 'leesin',
    label: 'Lee Sin',
    level: 'Difícil',
    minutes: 20,
    reveal: false,
    help: 'As cartas ficam viradas: você precisa lembrar os nomes de cabeça.',
  },
};

export const initialState = {
  status: 'menu', // menu | playing | won | lost
  difficulty: null,
  champions: [],
  found: {}, // key -> ordem do acerto
  hits: 0,
  input: '',
  deadline: 0,
  remaining: 0,
  startedAt: 0,
  elapsed: 0,
  feedback: null, // { type: 'hit' | 'repeat', key, id }
  pending: null, // campeão que espera o Enter para confirmar
};

export function reducer(state, action) {
  switch (action.type) {
    case 'load':
      return { ...initialState, champions: shuffle(action.champions, action.random) };

    case 'start': {
      const diff = DIFFICULTIES[action.difficulty];
      if (!diff || !state.champions.length) return state;
      const ms = diff.minutes * 60_000;
      return {
        ...state,
        status: 'playing',
        difficulty: diff.id,
        found: {},
        hits: 0,
        input: '',
        feedback: null,
        startedAt: action.now,
        deadline: action.now + ms,
        remaining: ms,
        elapsed: 0,
      };
    }

    case 'type': {
      if (state.status !== 'playing') return state;
      const value = action.value;
      const guess = normalize(value);
      if (!guess) return { ...state, input: value, pending: null };
      const champ = state.champions.find((c) => c.answers.includes(guess));
      if (!champ) return { ...state, input: value, pending: null };
      // "Vi" também é o começo de "Viego" e "Viktor", e "Nunu" é o começo de "Nunu e Willump":
      // nesses casos o acerto só vale com Enter, para não sobrar texto no campo
      const ambiguous = state.champions.some(
        (c) => (c === champ || !state.found[c.key]) && c.answers.some((a) => a !== guess && a.startsWith(guess))
      );
      if (ambiguous && !action.submit) return { ...state, input: value, pending: state.found[champ.key] ? null : champ.key };
      if (state.found[champ.key]) {
        return { ...state, input: '', pending: null, feedback: { type: 'repeat', key: champ.key, id: action.now } };
      }
      const hits = state.hits + 1;
      const next = {
        ...state,
        input: '',
        pending: null,
        hits,
        found: { ...state.found, [champ.key]: hits },
        feedback: { type: 'hit', key: champ.key, id: action.now },
      };
      if (hits === state.champions.length) {
        return { ...next, status: 'won', elapsed: action.now - state.startedAt, remaining: Math.max(0, state.deadline - action.now) };
      }
      return next;
    }

    case 'tick': {
      if (state.status !== 'playing') return state;
      const left = Math.max(0, state.deadline - action.now);
      if (left === 0) return { ...state, status: 'lost', remaining: 0, elapsed: state.deadline - state.startedAt, input: '' };
      const remaining = Math.ceil(left / 1000) * 1000; // o relógio mostra segundos
      return remaining === state.remaining ? state : { ...state, remaining };
    }

    case 'giveUp':
      if (state.status !== 'playing') return state;
      return { ...state, status: 'lost', elapsed: action.now - state.startedAt, input: '' };

    case 'menu':
      return { ...initialState, champions: shuffle(state.champions, action.random) };

    default:
      return state;
  }
}

export function formatTime(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
