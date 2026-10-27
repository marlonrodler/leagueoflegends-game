import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { loadChampions } from './data/champions';
import { DIFFICULTIES, formatTime, initialState, reducer } from './game/reducer';

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [load, setLoad] = useState({ status: 'loading', version: null, error: null });
  const [showResult, setShowResult] = useState(true);
  const inputRef = useRef(null);
  const { status, champions, found, difficulty } = state;
  const diff = difficulty ? DIFFICULTIES[difficulty] : null;
  const total = champions.length;

  const fetchList = useCallback(() => {
    const ctrl = new AbortController();
    setLoad({ status: 'loading', version: null, error: null });
    loadChampions(ctrl.signal)
      .then(({ version, champions: list }) => {
        dispatch({ type: 'load', champions: list });
        setLoad({ status: 'ready', version, error: null });
      })
      .catch((error) => {
        if (!ctrl.signal.aborted) setLoad({ status: 'error', version: null, error });
      });
    return () => ctrl.abort();
  }, []);

  useEffect(fetchList, [fetchList]);

  // Relógio
  useEffect(() => {
    if (status !== 'playing') return undefined;
    let raf;
    const loop = () => {
      dispatch({ type: 'tick', now: performance.now() });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  // Leva a carta acertada para a tela
  useEffect(() => {
    if (state.feedback?.type !== 'hit') return;
    document.getElementById(`champ-${state.feedback.key}`)?.scrollIntoView({
      block: 'nearest',
      behavior: reducedMotion() ? 'auto' : 'smooth',
    });
  }, [state.feedback]);

  useEffect(() => {
    if (status === 'won' || status === 'lost') setShowResult(true);
  }, [status]);

  const start = (id) => {
    // Mostra a barra já neste toque e põe o foco no campo: no celular, só assim o teclado abre
    flushSync(() => dispatch({ type: 'start', difficulty: id, now: performance.now() }));
    inputRef.current?.focus();
  };
  const finished = status === 'won' || status === 'lost';
  const pct = total ? state.hits / total : 0;
  const low = status === 'playing' && state.remaining <= 60_000;

  const feedbackText = (() => {
    if (status !== 'playing') return '';
    if (state.pending) return `Aperte Enter para confirmar ${champions.find((x) => x.key === state.pending).name}`;
    const f = state.feedback;
    if (!f) return '';
    const c = champions.find((x) => x.key === f.key);
    return f.type === 'hit' ? `${c.name}, ${c.title}` : `${c.name} já foi encontrado`;
  })();

  return (
    <div className={`app is-${status}`}>
      <header className="top">
        <div className="top__inner">
          <h1 className="brand">
            Champions <span>Challenge</span>
          </h1>
          {status === 'playing' && (
            <button type="button" className="btn btn--quiet" onClick={() => dispatch({ type: 'giveUp', now: performance.now() })}>
              Desistir
            </button>
          )}
          {finished && !showResult && (
            <button type="button" className="btn btn--quiet" onClick={() => dispatch({ type: 'menu' })}>
              Jogar de novo
            </button>
          )}
        </div>
      </header>

      {load.status === 'loading' && (
        <div className="state" role="status">
          <span className="spinner" aria-hidden="true" />
          Carregando os campeões…
        </div>
      )}

      {load.status === 'error' && (
        <div className="state" role="alert">
          <p className="state__title">Não foi possível carregar a lista de campeões.</p>
          <p>Confira a sua conexão e tente de novo.</p>
          <button type="button" className="btn btn--gold" onClick={fetchList}>Tentar de novo</button>
        </div>
      )}

      {load.status === 'ready' && (
        <main className="board-wrap" aria-label="Campeões">
          <ul className="board">
            {champions.map((c) => {
              const order = found[c.key];
              const missed = finished && !order;
              const visible = order || finished || (status === 'playing' && diff?.reveal);
              return (
                <li
                  key={c.key}
                  id={`champ-${c.key}`}
                  className={`card${order ? ' is-found' : ''}${missed ? ' is-missed' : ''}${visible ? '' : ' is-hidden'}`}
                >
                  {visible ? (
                    <img src={c.image} alt={order || finished ? '' : 'Campeão ainda não encontrado'} width="308" height="560" loading="lazy" decoding="async" />
                  ) : (
                    <span className="card__back" aria-hidden="true" />
                  )}
                  {(order || finished) && (
                    <span className="card__name">
                      {c.name}
                      {missed && <span className="sr-only"> (faltou)</span>}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </main>
      )}

      {/* Escolha da dificuldade */}
      {load.status === 'ready' && status === 'menu' && (
        <div className="overlay">
          <section className="panel panel--menu" aria-labelledby="menu-title">
            <h2 id="menu-title" className="panel__title">Prepare-se para o desafio</h2>
            <p className="panel__lead">
              Quantos dos <strong>{total}</strong> campeões de League of Legends você consegue acertar antes que o tempo acabe?
            </p>
            <p className="panel__hint">Digite o nome de cada campeão. Não precisa de acento, espaço nem apóstrofo.</p>
            <div className="modes">
              {Object.values(DIFFICULTIES).map((d) => (
                <button key={d.id} type="button" className={`mode mode--${d.id}`} onClick={() => start(d.id)}>
                  <span className="mode__head">
                    <strong>{d.label}</strong>
                    <span>{d.level}</span>
                  </span>
                  <span className="mode__time">{d.minutes} minutos</span>
                  <span className="mode__help">{d.help}</span>
                </button>
              ))}
            </div>
            {load.version && <p className="panel__meta">Lista oficial da versão {load.version} do jogo.</p>}
          </section>
        </div>
      )}

      {/* Barra do jogo */}
      <section className={`hud${status === 'playing' ? ' is-on' : ''}`} aria-label="Placar do jogo" aria-hidden={status !== 'playing'}>
        <div className="hud__inner">
          <div className={`hud__timer${low ? ' is-low' : ''}`}>
            <span className="hud__label">Tempo</span>
            <span className="hud__value">{formatTime(state.remaining)}</span>
          </div>
          <div className="hud__field">
            <label className="sr-only" htmlFor="guess">Nome do campeão</label>
            <input
              id="guess"
              ref={inputRef}
              className="hud__input"
              value={state.input}
              onChange={(e) => dispatch({ type: 'type', value: e.target.value, now: performance.now() })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') dispatch({ type: 'type', value: state.input, submit: true, now: performance.now() });
              }}
              placeholder="Digite o nome de um campeão"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck={false}
              enterKeyHint="done"
              tabIndex={status === 'playing' ? 0 : -1}
            />
            <p className={`hud__feedback is-${state.pending ? 'pending' : state.feedback?.type ?? 'none'}`} aria-live="polite">{feedbackText}</p>
          </div>
          <div className="hud__progress">
            <span className="hud__label">Acertos</span>
            <span className="hud__value">
              {state.hits}<small>/{total}</small>
            </span>
            <span className="hud__bar" aria-hidden="true"><i style={{ transform: `scaleX(${pct})` }} /></span>
          </div>
        </div>
      </section>

      {/* Resultado */}
      {finished && showResult && (
        <div className="overlay">
          <section className="panel panel--result" role="dialog" aria-modal="true" aria-labelledby="result-title">
            <h2 id="result-title" className="panel__title">{status === 'won' ? 'Parabéns!' : 'Fim de jogo'}</h2>
            <p className="result__big">
              {state.hits}<small> de {total}</small>
            </p>
            <p className="panel__lead">
              {status === 'won'
                ? `Você acertou todos os campeões em ${formatTime(state.elapsed)}.`
                : `Você acertou ${state.hits} de ${total} campeões em ${formatTime(state.elapsed)}, no modo ${diff.label}.`}
            </p>
            <div className="panel__actions">
              <button type="button" className="btn btn--gold" onClick={() => dispatch({ type: 'menu' })} autoFocus>
                Jogar de novo
              </button>
              {status === 'lost' && (
                <button type="button" className="btn btn--quiet" onClick={() => setShowResult(false)}>
                  Ver os que faltaram
                </button>
              )}
            </div>
          </section>
        </div>
      )}

      <footer className="foot">
        <p>
          Feito por <a href="https://marlonrodler.github.io" target="_blank" rel="noopener noreferrer">Marlon Rodler</a> como projeto de estudo.
          Imagens e nomes vêm do Data Dragon, da Riot Games.
        </p>
        <p>
          Champions Challenge não é endossado pela Riot Games e não reflete as opiniões da Riot Games nem de ninguém oficialmente
          envolvido na produção ou gestão de League of Legends. League of Legends e Riot Games são marcas registradas da Riot Games, Inc.
        </p>
      </footer>
    </div>
  );
}
