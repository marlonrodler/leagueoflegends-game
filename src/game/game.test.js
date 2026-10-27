import { describe, expect, it } from 'vitest';
import fixture from '../test/champions.fixture.json';
import { normalize, toChampion } from '../data/champions';
import { initialState, reducer, formatTime } from './reducer';

const champions = fixture.map(([key, , name, title]) => toChampion({ key, name, title }));
const loaded = () => reducer(initialState, { type: 'load', champions, random: () => 0.5 });
const playing = (difficulty = 'yuumi') => reducer(loaded(), { type: 'start', difficulty, now: 0 });
const type = (s, value, extra = {}) => reducer(s, { type: 'type', value, now: 1000, ...extra });

describe('nomes', () => {
  it('ignora acento, espaço, apóstrofo e maiúsculas', () => {
    expect(normalize("Kai'Sa")).toBe('kaisa');
    expect(normalize('Dr. Mundo')).toBe('drmundo');
    expect(normalize('Nunu e Willump')).toBe('nunuewillump');
  });

  it('aceita o nome em português e o identificador em inglês', () => {
    const bard = champions.find((c) => c.key === 'Bard');
    expect(bard.answers).toEqual(['bardo', 'bard']);
  });

  it('"Nunu" espera o Enter; o nome completo vale direto', () => {
    let s = type(playing(), 'nunu');
    expect(s.hits).toBe(0);
    expect(s.pending).toBe('Nunu');
    s = type(s, 'nunu e willump');
    expect(s.found.Nunu).toBe(1);
    expect(s.input).toBe('');
  });

  it('a lista oficial não tem nomes repetidos', () => {
    const all = champions.flatMap((c) => c.answers);
    expect(new Set(all).size).toBe(all.length);
    expect(champions).toHaveLength(173);
  });
});

describe('partida', () => {
  it('acerto conta uma vez e limpa o campo', () => {
    let s = type(playing(), "kai'sa");
    expect(s.hits).toBe(1);
    expect(s.input).toBe('');
    expect(s.found.Kaisa).toBe(1);
    s = type(s, 'KAISA');
    expect(s.hits).toBe(1);
    expect(s.feedback.type).toBe('repeat');
  });

  it('"Vi" espera o Enter, porque também é o começo de Viego e Viktor', () => {
    let s = type(playing(), 'vi');
    expect(s.hits).toBe(0);
    expect(s.input).toBe('vi');
    s = type(s, 'vi', { submit: true });
    expect(s.found.Vi).toBe(1);
    s = type(s, 'viego');
    expect(s.found.Viego).toBe(2);
  });

  it('dá para vencer acertando todos (no original era impossível)', () => {
    let s = playing();
    for (const c of champions) s = type(s, c.name, { submit: true });
    expect(s.status).toBe('won');
    expect(s.hits).toBe(173);
    expect(s.elapsed).toBe(1000);
  });

  it('o tempo acaba e mostra o resultado', () => {
    let s = type(playing('leesin'), 'ahri');
    s = reducer(s, { type: 'tick', now: 20 * 60_000 });
    expect(s.status).toBe('lost');
    expect(s.hits).toBe(1);
  });

  it('desistir encerra a partida', () => {
    const s = reducer(playing(), { type: 'giveUp', now: 65_000 });
    expect(s.status).toBe('lost');
    expect(formatTime(s.elapsed)).toBe('01:05');
  });

  it('jogar de novo volta ao menu com a lista embaralhada', () => {
    const s = reducer(type(playing(), 'ahri'), { type: 'menu', random: () => 0 });
    expect(s.status).toBe('menu');
    expect(s.hits).toBe(0);
    expect(s.champions).toHaveLength(173);
  });
});
