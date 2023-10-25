import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

/* TESTES PARA O SEARCH BAR */

const searchTitleTestId = 'search-top-btn';
const searchBtnTestId = 'exec-search-btn';
const ingredientBtnTestId = 'ingredient-search-radio';
const searchInputTestId = 'search-input';

test('Verifica se o botão de search leva pra rota certa', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const searchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(searchBtn);
  await waitFor(() => expect(window.location.pathname).toBe('/meals'));
});

test('Verifica se o fetch de meals funciona corretamente', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const alert = vi.spyOn(window, 'alert');

  vi.spyOn(global, 'fetch');

  const iconSearchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(iconSearchBtn);

  const botaoSearch = screen.getByTestId(searchBtnTestId);
  const testaBotaoRadio = screen.getByTestId(ingredientBtnTestId);
  const inputType = screen.getByTestId(searchInputTestId);

  await user.type(inputType, 'tomato');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);

  expect(fetch).toHaveBeenCalled();
  const mealList = await screen.findAllByTestId(/card-img/i);
  expect(mealList).toHaveLength(9);

  user.clear(inputType);

  await user.type(inputType, 'brown');
  const radioBtnName = screen.getByTestId('name-search-radio');
  await user.click(radioBtnName);
  await user.click(botaoSearch);

  user.clear(inputType);

  await user.type(inputType, 'a');
  const radioBtnFL = screen.getByTestId('first-letter-search-radio');
  await user.click(radioBtnFL);
  await user.click(botaoSearch);

  const profileBtn = screen.getByTestId('profile-top-btn');

  user.clear(inputType);

  await user.type(inputType, 'coisa-que-nao-exite');
  await user.click(botaoSearch);

  expect(alert).toBeCalledWith('Your search must have only 1 (one) character');
  await user.click(profileBtn);

  await waitFor(() => expect(window.location.pathname).toBe('/profile'));
});

test('Verifica se o fetch drinks funciona corretamente', async () => {
  const { user } = renderWithRouter(<App />, { route: '/drinks' });

  vi.spyOn(global, 'fetch');

  const iconSearchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(iconSearchBtn);

  const botaoSearch = screen.getByTestId(searchBtnTestId);
  const testaBotaoRadio = screen.getByTestId(ingredientBtnTestId);
  const inputType = screen.getByTestId(searchInputTestId);

  await user.type(inputType, 'orange');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);

  expect(fetch).toHaveBeenCalled();
  const mealList = await screen.findAllByTestId(/card-img/i);
  expect(mealList).toHaveLength(4);
});

test('Verifica se o alert é chamado', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const alert = vi.spyOn(window, 'alert');

  vi.spyOn(global, 'fetch');

  const iconSearchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(iconSearchBtn);

  const botaoSearch = screen.getByTestId(searchBtnTestId);
  const testaBotaoRadio = screen.getByTestId(ingredientBtnTestId);
  const inputType = screen.getByTestId(searchInputTestId);

  await user.type(inputType, 'outra coisa');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);

  waitFor(() => expect(alert).toBeCalledWith("Sorry, we haven't found any recipes for these filters."));
});
