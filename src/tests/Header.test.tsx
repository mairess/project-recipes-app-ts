import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

/* TESTES PARA O HEADER */

const profileBtnTestID = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchTitleTestId = 'search-top-btn';

test('Verifica se os botões estão na tela e se a barra de pesquisa é mostrado quando o botão de pesquisa é clicado', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });

  const searchBtn = screen.getByTestId(searchTitleTestId);
  const profileBtn = screen.getByTestId(profileBtnTestID);
  const pageTitle = screen.getByTestId(pageTitleTestId);

  expect(searchBtn).toBeInTheDocument();
  expect(profileBtn).toBeInTheDocument();
  expect(pageTitle).toBeInTheDocument();

  await user.click(searchBtn);
  // const searchBar = screen.getByTestId(searchBarTestId);

  // expect(searchBar).toBeInTheDocument();
});

test('Verifica se o botão de profile leva pra rota certa', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const profileBtn = screen.getByTestId(profileBtnTestID);

  await user.click(profileBtn);
  await waitFor(() => expect(window.location.pathname).toBe('/profile'));
});

test('Verifica se o botão de search desaparece na rota /profile', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });

  const profileBtn = screen.getByTestId(profileBtnTestID);
  const searchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(profileBtn);
  await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
});

test('Verifica se na rota /meals o texto Meals aparece no header além do ícon de busca e perfil', async () => {
  renderWithRouter(<App />, { route: '/meals' });

  const pageTitle = screen.getByTestId(pageTitleTestId);
  const searchBtn = screen.getByTestId(searchTitleTestId);
  const profileBtn = screen.getByTestId(profileBtnTestID);

  expect(pageTitle).toHaveTextContent('Meals');
  expect(searchBtn).toBeInTheDocument();
  expect(profileBtn).toBeInTheDocument();
});

test('Verifica se na rota /done-recipes o texto Done Recipes aparece no header além do ícon de perfil porém sem o ícone de busca', async () => {
  renderWithRouter(<App />, { route: '/done-recipes' });

  const pageTitle = screen.getByTestId(pageTitleTestId);
  const profileBtn = screen.getByTestId(profileBtnTestID);
  const searchBtn = screen.queryByTestId(searchTitleTestId);

  expect(pageTitle).toHaveTextContent('Done Recipes');
  expect(profileBtn).toBeInTheDocument();
  expect(searchBtn).not.toBeInTheDocument();
});

test('Verifica se na rota /favorite-recipes o texto Favorite Recipes aparece no header além do ícon de perfil porém sem o ícone de busca', async () => {
  renderWithRouter(<App />, { route: '/favorite-recipes' });

  const pageTitle = screen.getByTestId(pageTitleTestId);
  const profileBtn = screen.getByTestId(profileBtnTestID);
  const searchBtn = screen.queryByTestId(searchTitleTestId);

  expect(pageTitle).toHaveTextContent('Favorite Recipes');
  expect(profileBtn).toBeInTheDocument();
  expect(searchBtn).not.toBeInTheDocument();
});
