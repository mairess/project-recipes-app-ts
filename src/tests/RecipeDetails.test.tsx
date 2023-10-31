import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Testes do componente RecipeDetails', () => {
  test('Testa página de detalhes da receita em meals', async () => {
    const { user } = renderWithRouter(<App />, { route: 'meals/52977' });

    const corbaImage = await screen.findByTestId('recipe-photo');
    expect(corbaImage).toBeInTheDocument();

    const recipeVideo = await screen.findByTestId('video');
    expect(recipeVideo).toBeInTheDocument();

    const shareBtn = await screen.findByRole('img', { name: /ícone de compartilhar/i });

    user.click(shareBtn);

    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();

    const favoriteBtn = await screen.findByRole('img', { name: /favoritar/i });
    user.click(favoriteBtn);

    const unfavoriteBtn = await screen.findByRole('img', { name: /desfavoritar/i });
    user.click(unfavoriteBtn);

    expect(favoriteBtn).toBeInTheDocument();

    const recommendedImage = await screen.findByRole('img', { name: /gg/i });
    expect(recommendedImage).toBeInTheDocument();

    const startRecipeBtn = await screen.findByRole('button', { name: /start recipe/i });
    user.click(startRecipeBtn);

    await waitFor(async () => {
      await expect(window.location.pathname).toBe('/meals/52977/in-progress');
    });
  });

  test('Testa página de detalhes da receita em drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks/15997' });

    const ggImage = await screen.findByTestId('recipe-photo');
    expect(ggImage).toBeInTheDocument();

    const shareBtn = await screen.findByRole('img', { name: /ícone de compartilhar/i });

    user.click(shareBtn);

    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();

    const favoriteBtn = await screen.findByRole('img', { name: /favoritar/i });
    user.click(favoriteBtn);

    const unfavoriteBtn = await screen.findByRole('img', { name: /desfavoritar/i });
    user.click(unfavoriteBtn);

    expect(favoriteBtn).toBeInTheDocument();

    const recommendedImage = await screen.findByRole('img', { name: /corba/i });
    expect(recommendedImage).toBeInTheDocument();

    const startRecipeBtn = await screen.findByRole('button', { name: /start recipe/i });
    user.click(startRecipeBtn);

    await waitFor(async () => {
      await expect(window.location.pathname).toBe('/drinks/15997/in-progress');
    });
  });
});
