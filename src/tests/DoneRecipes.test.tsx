import { screen } from '@testing-library/dom';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testes do componente DoneRecipes', () => {
  test('Primeiro teste', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { user } = renderWithRouter(<App />, { route: '/done-recipes' });

    const filterAllBtn = await screen.findByTestId('filter-by-all-btn');
    const filterByMealBtn = await screen.findByTestId('filter-by-meal-btn');
    const filterByDrinkBtn = await screen.findByTestId('filter-by-drink-btn');
    const shareBtn = await screen.findByTestId(/0-horizontal-share-btn/i);

    await user.click(shareBtn);

    const linkCopied = await screen.findAllByText(/link copied!/i);
    expect(linkCopied).toHaveLength(2);

    await user.click(filterByMealBtn);
    await user.click(filterByDrinkBtn);
    await user.click(filterAllBtn);

    localStorage.clear();
  });
});
