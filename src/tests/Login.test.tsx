import { screen, waitFor } from '@testing-library/react';
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
