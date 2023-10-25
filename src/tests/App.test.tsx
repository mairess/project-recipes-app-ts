import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

test("Deve redirecionar para a rota '/meals' após login válido", async () => {
  const { user } = renderWithRouter(<App />, { route: '/' });

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const enterBtn = screen.getByTestId('login-submit-btn');

  await user.type(emailInput, 'teste@teste.com');
  await user.type(passwordInput, '1234567');
  await user.click(enterBtn);

  await waitFor(() => expect(window.location.pathname).toBe('/meals'));
});

/* TESTES PARA O HEADER */

const profileBtnTestID = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchTitleTestId = 'search-top-btn';

// test('Verifica se os botões estão na tela e se a barra de pesquisa é mostrado quando o botão de pesquisa é clicado', async () => {
//   const { user } = renderWithRouter(<App />, { route: '/meals' });

//   const searchBtn = screen.getByTestId(searchTitleTestId);
//   const profileBtn = screen.getByTestId(profileBtnTestID);
//   const pageTitle = screen.getByTestId(pageTitleTestId);

//   expect(searchBtn).toBeInTheDocument();
//   expect(profileBtn).toBeInTheDocument();
//   expect(pageTitle).toBeInTheDocument();

//   await user.click(searchBtn);
//   const searchBar = screen.getByTestId(searchBarTestId);

//   expect(searchBar).toBeInTheDocument();
// });

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

/* TESTES PARA O SEARCH BAR */

test.only('Verifica se o botão de search leva pra rota certa', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const searchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(searchBtn);
  await waitFor(() => expect(window.location.pathname).toBe('/meals'));
});

test.only('Verifica se o fetch funciona corretamente', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const mockData = {
    strMeal: 'Brown Stew Chicken',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg',
    idMeal: '52940',
  };
  const MOCK_RESPONSE = {
    json: async () => mockData,
  } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  const botaoSearch = screen.getByTestId('exec-search-btn');
  const testaBotaoRadio = screen.getByTestId('ingredient-search-radio');
  const inputType = screen.getByTestId('search-input');

  await user.type(inputType, 'tomato');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);
});

test.only('Verifica se o fetch funciona corretamente', async () => {
  const { user } = renderWithRouter(<App />, { route: '/drinks' });
  // const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  const mockData = {
    strDrink: 'Mango Orange Smoothie',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vdp2do1487603520.jpg',
    idDrink: '12716',
  };
  const MOCK_RESPONSE = {
    json: async () => mockData,
  } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
  // const errorMessage = ("Sorry, we haven't found any recipes for these filters.");
  const botaoSearch = screen.getByTestId('exec-search-btn');
  const testaBotaoRadio = screen.getByTestId('ingredient-search-radio');
  const inputType = screen.getByTestId('search-input');

  await user.type(inputType, 'Roberto');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);
  // await waitFor(() => screen.getByText(errorMessage));
  // // await waitFor(() => expect(alertMock).toHaveBeenCalledWith(alertElement));
});
