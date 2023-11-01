import { vi } from 'vitest';
import { screen } from '@testing-library/react';
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

    global.fetch = vi.fn()
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(secondFetchMock)
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(thirdFetchMock)
      .mockResolvedValue(firstFetchMock);

    renderWithRouter(<App />, { route: '/meals' });

    const beefCategoryBtn = await screen.findByRole('button', { name: /beef/i });

    const chickenMeal = await screen.findByRole('img', { name: /Brown Stew Chicken/i });
    expect(chickenMeal).toBeInTheDocument();

    await userEvent.click(beefCategoryBtn);

    const beefMeal = await screen.findByRole('img', { name: /beef and mustard pie/i });
    expect(beefMeal).toBeInTheDocument();

    await userEvent.click(beefCategoryBtn);

    expect(await screen.findByRole('img', { name: /Brown Stew Chicken/i })).toBeInTheDocument();
  });

  test('Teste de categoria Ordinary Drink', async () => {
    const firstFetchMock = { json: async () => milkDrinks } as Response;
    const secondFetchMock = { json: async () => drinkCategories } as Response;
    const thirdFetchMock = { json: async () => ordinaryDrinks } as Response;

    global.fetch = vi.fn()
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(secondFetchMock)
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(thirdFetchMock)
      .mockResolvedValue(firstFetchMock);

    renderWithRouter(<App />, { route: '/drinks' });

    const drinkCategoryBtn = await screen.findByRole('button', { name: /ordinary drink/i });

    const milkDrink = await screen.findByRole('img', { name: /151 Florida Bushwacker/i });
    expect(milkDrink).toBeInTheDocument();

    await userEvent.click(drinkCategoryBtn);

    const ordinaryDrink = await screen.findByRole('img', { name: /mile long island iced tea/i });
    expect(ordinaryDrink).toBeInTheDocument();

    await userEvent.click(drinkCategoryBtn);
    expect(await screen.findByRole('img', { name: /151 Florida Bushwacker/i })).toBeInTheDocument();
  });

  test('Testa reset de receitas em /meals', async () => {
    const firstFetchMock = { json: async () => chickenMeals } as Response;
    const secondFetchMock = { json: async () => mealCategories } as Response;
    const thirdFetchMock = { json: async () => beefMeals } as Response;

    global.fetch = vi.fn()
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(secondFetchMock)
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(thirdFetchMock)
      .mockResolvedValue(firstFetchMock);

    renderWithRouter(<App />, { route: '/meals' });

    const beefCategoryBtn = await screen.findByRole('button', { name: /beef/i });

    let chickenMeal = await screen.findByRole('img', { name: /Brown Stew Chicken/i });
    expect(chickenMeal).toBeInTheDocument();

    await userEvent.click(beefCategoryBtn);

    const beefMeal = await screen.findByRole('img', { name: /beef and mustard pie/i });
    expect(beefMeal).toBeInTheDocument();

    const allBtn = await screen.findByRole('button', { name: /all/i });
    await userEvent.click(allBtn);

    chickenMeal = await screen.findByRole('img', { name: /Brown Stew Chicken/i });
    expect(chickenMeal).toBeInTheDocument();
  });

  test('Testa reset de receitas em /drinks', async () => {
    const firstFetchMock = { json: async () => milkDrinks } as Response;
    const secondFetchMock = { json: async () => drinkCategories } as Response;
    const thirdFetchMock = { json: async () => ordinaryDrinks } as Response;

    global.fetch = vi.fn()
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(secondFetchMock)
      .mockResolvedValueOnce(firstFetchMock)
      .mockResolvedValueOnce(thirdFetchMock)
      .mockResolvedValue(firstFetchMock);

    renderWithRouter(<App />, { route: '/drinks' });

    const drinkCategoryBtn = await screen.findByRole('button', { name: /ordinary drink/i });

    let milkDrink = await screen.findByRole('img', { name: /151 Florida Bushwacker/i });
    expect(milkDrink).toBeInTheDocument();

    await userEvent.click(drinkCategoryBtn);

    const ordinaryDrink = await screen.findByRole('img', { name: /mile long island iced tea/i });
    expect(ordinaryDrink).toBeInTheDocument();

    const allBtn = await screen.findByRole('button', { name: /all/i });
    await userEvent.click(allBtn);

    milkDrink = await screen.findByRole('img', { name: /151 Florida Bushwacker/i });
    expect(milkDrink).toBeInTheDocument();
  });
});
