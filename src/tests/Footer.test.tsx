import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('footer', () => {
  it('Redenriza no componente meals e redireciona para drinks/meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const footer = screen.getByTestId('footer');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    await user.click(drinksBtn);

    expect(window.location.pathname).toBe('/drinks');
    expect(footer).toBeInTheDocument();

    await user.click(mealsBtn);

    expect(window.location.pathname).toBe('/meals');
    expect(footer).toBeInTheDocument();
  });
});
