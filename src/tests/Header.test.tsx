import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

/* TESTES PARA O HEADER */

const profileBtnTestID = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchTitleTestId = 'search-top-btn';

/* test('Verifica se os botões estão na tela e se a barra de pesquisa é mostrado quando o botão de pesquisa é clicado', async () => {
  await act(async () => {
    renderWithRouter(<App />, { route: '/meals' });
  });

  const searchBtn = await screen.findByTestId(searchTitleTestId);
  const profileBtn = await screen.findByTestId(profileBtnTestID);
  const pageTitle = await screen.findByTestId(pageTitleTestId);

  expect(searchBtn).toBeInTheDocument();
  expect(profileBtn).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();

  await userEvent.click(searchBtn);
}); */

test('Verifica se o botão de profile leva pra rota certa', async () => {
  vi.spyOn(global, 'fetch');

  await act(async () => {
    renderWithRouter(<App />, { route: '/meals' });
  });

  const profileBtn = await screen.findByTestId(profileBtnTestID);

  await userEvent.click(profileBtn);
  await waitFor(() => expect(window.location.pathname).toBe('/profile'));
});

test('Verifica se o botão de search desaparece na rota /profile', async () => {
  vi.spyOn(global, 'fetch');

  await act(async () => {
    renderWithRouter(<App />, { route: '/meals' });
  });

  const profileBtn = await screen.findByTestId(profileBtnTestID);
  const searchBtn = await screen.findByTestId(searchTitleTestId);

  await userEvent.click(profileBtn);
  await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
});

test('Verifica se na rota /meals o texto Meals aparece no header além do ícon de busca e perfil', async () => {
  vi.spyOn(global, 'fetch');

  await act(async () => {
    renderWithRouter(<App />, { route: '/meals' });
  });

  const pageTitle = await screen.findByTestId(pageTitleTestId);
  const searchBtn = await screen.findByTestId(searchTitleTestId);
  const profileBtn = await screen.findByTestId(profileBtnTestID);

  expect(pageTitle).toHaveTextContent('Meals');
  expect(searchBtn).toBeInTheDocument();
  expect(profileBtn).toBeInTheDocument();
});

/* test('Verifica se na rota /done-recipes o texto Done Recipes aparece no header além do ícon de perfil porém sem o ícone de busca', async () => {
  renderWithRouter(<App />, { route: '/done-recipes' });

  const pageTitle = screen.getByTestId(pageTitleTestId);
  const profileBtn = screen.getByTestId(profileBtnTestID);
  const searchBtn = screen.queryByTestId(searchTitleTestId);

  expect(pageTitle).toHaveTextContent('Done Recipes');
  expect(profileBtn).toBeInTheDocument();
  expect(searchBtn).not.toBeInTheDocument();
}); */

/* test('Verifica se na rota /favorite-recipes o texto Favorite Recipes aparece no header além do ícon de perfil porém sem o ícone de busca', async () => {
  renderWithRouter(<App />, { route: '/favorite-recipes' });

  const pageTitle = screen.getByTestId(pageTitleTestId);
  const profileBtn = screen.getByTestId(profileBtnTestID);
  const searchBtn = screen.queryByTestId(searchTitleTestId);

  expect(pageTitle).toHaveTextContent('Favorite Recipes');
  expect(profileBtn).toBeInTheDocument();
  expect(searchBtn).not.toBeInTheDocument();
});
 */
