import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

/* TESTES PARA O SEARCH BAR */

const searchTitleTestId = 'search-top-btn';

test('Verifica se o botão de search leva pra rota certa', async () => {
  const { user } = renderWithRouter(<App />, { route: '/meals' });
  const searchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(searchBtn);
  await waitFor(() => expect(window.location.pathname).toBe('/meals'));
});

test('Verifica se o fetch funciona corretamente', async () => {
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

  const iconSearchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(iconSearchBtn);

  const botaoSearch = screen.getByTestId('exec-search-btn');
  const testaBotaoRadio = screen.getByTestId('ingredient-search-radio');
  const inputType = screen.getByTestId('search-input');

  await user.type(inputType, 'tomato');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);
});

test('Verifica se o fetch funciona corretamente', async () => {
  const { user } = renderWithRouter(<App />, { route: '/drinks' });

  const mockData = {
    strDrink: 'Mango Orange Smoothie',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vdp2do1487603520.jpg',
    idDrink: '12716',
  };

  const MOCK_RESPONSE = {
    json: async () => mockData,
  } as Response;

  vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);

  const iconSearchBtn = screen.getByTestId(searchTitleTestId);

  await user.click(iconSearchBtn);

  const botaoSearch = screen.getByTestId('exec-search-btn');
  const testaBotaoRadio = screen.getByTestId('ingredient-search-radio');
  const inputType = screen.getByTestId('search-input');

  await user.type(inputType, 'Roberto');
  await user.click(testaBotaoRadio);
  await user.click(botaoSearch);
});
