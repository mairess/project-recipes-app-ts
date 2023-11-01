import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const testMail = 'vitoria@mail.com';

test('Verifica se os inputs estão presentes na tela e se o componente recupera o localStorage.', async () => {
  localStorage.setItem('user', JSON.stringify(testMail));
  renderWithRouter(<App />, { route: '/profile' });

  const userMail = screen.getByTestId('profile-email');
  const doneRecipesBtn = screen.getByTestId('profile-done-btn');
  const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
  const logoutBtn = screen.getByTestId('profile-logout-btn');

  expect(userMail).toBeInTheDocument();
  expect(doneRecipesBtn).toBeInTheDocument();
  expect(favoriteRecipesBtn).toBeInTheDocument();
  expect(logoutBtn).toBeInTheDocument();

  localStorage.clear();
});

test('Verifica se o botão Done Recipes navega para rota correta.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/profile' });

  const doneRecipesBtn = screen.getByTestId('profile-done-btn');

  await user.click(doneRecipesBtn);

  await waitFor(() => expect(window.location.pathname).toBe('/done-recipes'));
});

test('Verifica se o botão Favorite Recipes navega para rota correta.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/profile' });

  const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');

  await user.click(favoriteRecipesBtn);

  await waitFor(() => expect(window.location.pathname).toBe('/favorite-recipes'));
});

test('Verifica se o botão Logout navega para rota correta e limpa o localStorage.', async () => {
  const { user } = renderWithRouter(<App />, { route: '/profile' });

  const logoutBtn = screen.getByTestId('profile-logout-btn');

  await user.click(logoutBtn);

  await waitFor(() => expect(window.location.pathname).toBe('/'));

  const clearedUser = localStorage.getItem('user');

  expect(clearedUser).toBe(null);

  localStorage.clear();
});
