import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWith';
import mealsByIngredient from './helpers/mocks/mealsByIngredient';
import mealsByName from './helpers/mocks/mealsByName';
import mealsByFirstLetter from './helpers/mocks/mealsByFirstLetter';
import drinksByIngredient from './helpers/mocks/drinksByIngredient';
import drinksByName from './helpers/mocks/drinksByName';
import drinksByFirstLetter from './helpers/mocks/drinksByFirstLetter';
import emptyMeals from './helpers/mocks/emptyMeals';

/* TESTES PARA O SEARCH BAR */

const searchIconTestId = 'search-top-btn';
const searchInputBtnTestId = 'exec-search-btn';
const searchInputTestId = 'search-input';
const ingredientBtnTestId = 'ingredient-search-radio';
const nameBtnTestId = 'name-search-radio';
const firstLetterBtnTestId = 'first-letter-search-radio';
const ALERT_MESSAGE = "Sorry, we haven't found any recipes for these filters.";

describe('Testes do componente SearchBar', () => {
  test('Verifica se o botão de search leva pra rota certa', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });
    const searchIconBtn = screen.getByTestId(searchIconTestId);

    await user.click(searchIconBtn);
    await waitFor(() => expect(window.location.pathname).toBe('/meals'));
  });

  test('Verifica busca por ingrediente em meals', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mealsByIngredient,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'chicken');
    await user.click(ingredientRadioBtn);
    await user.click(searchBTn);

    const chickenMeals = await screen.findAllByTestId(/card-name/i);
    expect(chickenMeals).toHaveLength(10);
  });

  test('Verifica busca por ingrediente inexistente em meals', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => emptyMeals,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    const alert = vi.spyOn(window, 'alert');

    await user.type(searchInput, 'qualquer coisa');
    await user.click(ingredientRadioBtn);
    await user.click(searchBTn);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith(ALERT_MESSAGE);
    });
  });

  test('Verifica busca por nome em meals', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mealsByName,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'alfredo');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    const alfredoMeals = await screen.findAllByTestId(/card-name/i);
    expect(alfredoMeals).toHaveLength(3);
  });

  test('Verifica busca por primeira letra em meals', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mealsByFirstLetter,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'a');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    const letterAMeals = await screen.findAllByTestId(/card-name/i);
    expect(letterAMeals).toHaveLength(4);
  });

  test('Verifica busca por mais de uma letra em meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    const alert = vi.spyOn(window, 'alert');

    await user.type(searchInput, 'ab');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
  });

  test('Verifica busca por nome inteiro da receita em meal leva pra rota certa', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'Turkey Meatloaf');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    await waitFor(async () => {
      await expect(window.location.pathname).toBe('/meals/52845');
    });
  });

  test('Verifica busca por ingrediente em drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinksByIngredient,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'orange');
    await user.click(ingredientRadioBtn);
    await user.click(searchBTn);

    const orangeDrinks = await screen.findAllByTestId(/card-name/i);
    expect(orangeDrinks).toHaveLength(4);
  });

  test('Verifica busca por nome em drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinksByName,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'frozen');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    const orangeDrinks = await screen.findAllByTestId(/card-name/i);
    expect(orangeDrinks).toHaveLength(3);
  });

  test('Verifica busca por primeira letra em drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinksByFirstLetter,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'b');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    const orangeDrinks = await screen.findAllByTestId(/card-name/i);
    expect(orangeDrinks).toHaveLength(12);
  });

  test('Verifica busca por nome inteiro da receita em drinks leva pra rota certa', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await user.type(searchInput, 'B-52');
    await user.click(nameRadioBtn);
    await user.click(searchBTn);

    await waitFor(async () => {
      await expect(window.location.pathname).toBe('/drinks/15853');
    });
  });

  test('Verifica alert quando busca está vazia', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    const alert = vi.spyOn(window, 'alert');

    await user.click(searchBTn);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith(ALERT_MESSAGE);
    });

    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    await user.click(ingredientRadioBtn);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith(ALERT_MESSAGE);
    });
  });

  test('Verifica alert quando busca está vazia e opção escolhida', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const searchIconBtn = screen.getByTestId(searchIconTestId);
    await user.click(searchIconBtn);

    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    const alert = vi.spyOn(window, 'alert');

    await user.click(ingredientRadioBtn);
    await user.click(searchBTn);

    waitFor(() => {
      expect(alert).toHaveBeenCalledWith(ALERT_MESSAGE);
    });
  });
});
