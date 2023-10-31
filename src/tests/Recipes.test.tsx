import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import chickenMeals from './helpers/mocks/chickenMeals';
import mealCategories from './helpers/mocks/mealCategories';
import milkDrinks from './helpers/mocks/milkDrinks';
import drinkCategories from './helpers/mocks/drinkCategories';
import beefMeals from './helpers/mocks/beefMeals';
import ordinaryDrinks from './helpers/mocks/ordinaryDrinks';

describe('Testes do componente Recipes', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Teste de categoria Beef', async () => {
    const firstFetchMock = { json: async () => chickenMeals } as Response;
    const secondFetchMock = { json: async () => mealCategories } as Response;
    const thirdFetchMock = { json: async () => beefMeals } as Response;

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(secondFetchMock)
      .mockResolvedValue(thirdFetchMock);

    await waitFor(() => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const allBtn = await screen.findByRole('button', { name: /all/i });
    const beefCategoryBtn = await screen.findByRole('button', { name: /beef/i });

    await userEvent.click(beefCategoryBtn);

    const beefMeal = await screen.findByRole('img', { name: /beef and mustard pie/i });
    expect(beefMeal).toBeInTheDocument();

    await userEvent.click(allBtn);
  });

  test('Teste de categoria Ordinary Drink', async () => {
    const firstFetchMock = { json: async () => milkDrinks } as Response;
    const secondFetchMock = { json: async () => drinkCategories } as Response;
    const thirdFetchMock = { json: async () => ordinaryDrinks } as Response;

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(secondFetchMock)
      .mockResolvedValue(thirdFetchMock);

    await waitFor(() => {
      renderWithRouter(<App />, { route: '/drinks' });
    });

    const allBtn = await screen.findByRole('button', { name: /all/i });
    const drinkCategoryBtn = await screen.findByRole('button', { name: /ordinary drink/i });

    await userEvent.click(drinkCategoryBtn);

    const ordinaryDrink = await screen.findByRole('img', { name: /mile long island iced tea/i });
    expect(ordinaryDrink).toBeInTheDocument();

    await userEvent.click(allBtn);
  });
});
