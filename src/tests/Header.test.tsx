import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWith';
import chickenMeals from './helpers/mocks/chickenMeals';
import mealCategories from './helpers/mocks/mealCategories';

/* TESTES PARA O HEADER */

const profileBtnTestID = 'profile-top-btn';
const pageTitleTestId = 'page-title';
const searchTitleTestId = 'search-top-btn';
const firstFectchMock = { json: async () => chickenMeals } as Response;
const secondFectchMock = { json: async () => mealCategories } as Response;

describe('Testes componente Header', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(firstFectchMock)
      .mockResolvedValueOnce(secondFectchMock);
  });

  test('Verifica se o botão de profile leva pra rota certa', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const profileBtn = await screen.findByTestId(profileBtnTestID);

    await userEvent.click(profileBtn);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
  });

  test('Verifica se o botão de search desaparece na rota /profile', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const profileBtn = await screen.findByTestId(profileBtnTestID);
    const searchBtn = await screen.findByTestId(searchTitleTestId);

    await userEvent.click(profileBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  test('Verifica se na rota /meals o texto Meals aparece no header além do ícon de busca e perfil', async () => {
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

  test('Verifica se na rota /favorite-recipes o texto Favorite Recipes aparece no header além do ícon de perfil', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/favorite-recipes' });
    });

    const profileBtn = await screen.findByTestId(profileBtnTestID);
    const pageTitle = await screen.findByTestId(pageTitleTestId);

    expect(pageTitle).toHaveTextContent('Favorite Recipes');
    expect(profileBtn).toBeInTheDocument();
  });

  test('Verifica se na rota /done-recipes o texto Done Recipes aparece no header além do ícon de perfil', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/done-recipes' });
    });

    const profileBtn = await screen.findByTestId(profileBtnTestID);
    const pageTitle = await screen.findByTestId(pageTitleTestId);

    expect(pageTitle).toHaveTextContent('Done Recipes');
    expect(profileBtn).toBeInTheDocument();
  });
});
