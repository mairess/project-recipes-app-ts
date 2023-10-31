import { vi } from 'vitest';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import chickenMeals from './helpers/mocks/chickenMeals';
import mealCategories from './helpers/mocks/mealCategories';
import milkDrinks from './helpers/mocks/milkDrinks';
import drinkCategories from './helpers/mocks/drinkCategories';

describe('Testes do componente Recipes', () => {
  test('Teste de categoria Beef', async () => {
    const firstFectchMock = { json: async () => chickenMeals } as Response;
    const secondFectchMock = { json: async () => mealCategories } as Response;

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstFectchMock)
      .mockResolvedValueOnce(secondFectchMock);

    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const beefCategoryBtn = screen.getByRole('button', { name: /beef/i });

    await userEvent.click(beefCategoryBtn);
  });

  test('Teste de categoria Ordinary Drink', async () => {
    const firstFectchMock = { json: async () => milkDrinks } as Response;
    const secondFectchMock = { json: async () => drinkCategories } as Response;

    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstFectchMock)
      .mockResolvedValueOnce(secondFectchMock);

    await act(async () => {
      renderWithRouter(<App />, { route: '/drinks' });
    });

    const drinkCategoryBtn = screen.getByRole('button', { name: /ordinary drink/i });

    await userEvent.click(drinkCategoryBtn);
  });
});
