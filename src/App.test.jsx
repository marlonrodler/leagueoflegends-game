import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import fixture from './test/champions.fixture.json';
import App from './App';

const ddragon = {
  data: Object.fromEntries(fixture.map(([id, key, name, title]) => [id, { id, key, name, title }])),
};

beforeEach(() => {
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
  vi.stubGlobal(
    'fetch',
    vi.fn(async (url) => ({
      ok: true,
      json: async () => (url.endsWith('versions.json') ? ['16.21.1'] : ddragon),
    }))
  );
});
afterEach(() => vi.unstubAllGlobals());

it('carrega a lista oficial, joga no modo Yuumi e desiste', async () => {
  const user = userEvent.setup();
  render(<App />);
  expect(await screen.findByText('173')).toBeInTheDocument();
  expect(screen.getByText(/versão 16\.21\.1/)).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: /yuumi/i }));
  const input = screen.getByLabelText(/nome do campeão/i);
  expect(input).toHaveFocus();

  await user.type(input, 'Nunu e Willump');
  expect(screen.getByText(/nunu e willump, o garoto e seu yeti/i)).toBeInTheDocument();
  expect(input).toHaveValue('');

  await user.click(screen.getByRole('button', { name: /desistir/i }));
  const dialog = await screen.findByRole('dialog');
  expect(dialog).toHaveTextContent('Você acertou 1 de 173 campeões');

  await user.click(screen.getByRole('button', { name: /ver os que faltaram/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByText('Ahri')).toBeInTheDocument();
});

it('mostra o erro e deixa tentar de novo se a lista não carregar', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 503, json: async () => ({}) })));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent(/não foi possível carregar/i);
  expect(screen.getByRole('button', { name: /tentar de novo/i })).toBeInTheDocument();
});
