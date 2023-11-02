import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { mealsInProgress, drinksInProgress } from '../apiRecipes';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function RecipeInProgress() {
  const route = window.location.pathname.includes('meals');
  const params = useParams();
  const [mealsFilter, setMealsFilter] = useState<any>('');
  const [drinksFilter, setDrinksFilter] = useState<any>('');
  const [checkboxStates, setCheckboxStates] = useState<any>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const doneRecipesJSON = localStorage.getItem('favoriteRecipes');
  const doneRecipes = doneRecipesJSON ? JSON.parse(doneRecipesJSON) : [];

  useEffect(() => {
    const request = async () => {
      if (route) {
        setMealsFilter(await mealsInProgress(params));
      }
      if (!route) {
        setDrinksFilter(await drinksInProgress(params));
      }
    };
    request();
  }, [params, route]);

  useEffect(() => {
    const progressKey = route ? 'mealsProgress' : 'drinksProgress';
    const savedProgress = localStorage.getItem(progressKey);
    if (savedProgress) {
      setCheckboxStates(JSON.parse(savedProgress));
    }
    const favoriteKey = route ? 'mealsFavorite' : 'drinksFavorite';
    const isFavorite = localStorage.getItem(favoriteKey) === 'true';
    setIsFavorited(isFavorite);
  }, [route]);

  const handleCheckboxChange = (index: number) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);

    const progressKey = route ? 'mealsProgress' : 'drinksProgress';
    localStorage.setItem(progressKey, JSON.stringify(newCheckboxStates));
  };

  const ingredientsDrinks: any = Object.keys(drinksFilter).filter(
    (key) => drinksFilter[key] !== null
      && drinksFilter[key] !== ''
      && key.startsWith('strIngredient'),
  ).map((key) => drinksFilter[key]);

  const ingredientsMeals: any = Object.keys(mealsFilter).filter(
    (key) => mealsFilter[key] !== null
      && mealsFilter[key] !== ''
      && key.startsWith('strIngredient'),
  ).map((key) => mealsFilter[key]);

  const handleShareClick = () => {
    const { origin, pathname } = window.location;
    const link = `${origin}${pathname.split('/in-progress')[0]}`;
    navigator.clipboard.writeText(link);
    setIsCopied(true);
  };

  const handleFavoriteClick = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipes));
    setIsFavorited(!isFavorited);
  };

  return (
    <div>
      { route ? (
        <div>
          <h1
            data-testid="recipe-title"
            className="recipe-title"
          >
            { mealsFilter.strMeal }
          </h1>
          <img
            src={ mealsFilter.strMealThumb }
            alt={ mealsFilter.strMeal }
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-category"
          >
            { mealsFilter.strCategory }
          </p>
          <button
            data-testid="share-btn"
            onClick={ handleShareClick }
          >
            <img
              src={ shareIcon }
              alt="Ícone de Compartilhar"
            />
          </button>
          {isCopied && (
            <p data-testid="share-message">Link copied!</p>
          )}
          <button
            onClick={ handleFavoriteClick }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeart : whiteHeart }
              alt="Favorite button"
            />
          </button>
          <h2 className="ola">Ingredients</h2>
          {ingredientsMeals.map((ingre: any, index: any) => (
            <div key={ ingre }>
              <br />
              <label
                data-testid={ `${index}-ingredient-step` }
                style={
                  checkboxStates[index]
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : {}
                }
              >
                <input
                  type="checkbox"
                  name={ ingredientsMeals }
                  checked={ checkboxStates[index] }
                  onChange={ () => handleCheckboxChange(index) }
                />
                { ingre }
              </label>
            </div>
          ))}
          <h2>Instructions</h2>
          <p data-testid="instructions">{mealsFilter.strInstructions}</p>
          <button data-testid="finish-recipe-btn">Finalizar receita</button>
        </div>
      ) : (
        <div>
          <h1
            data-testid="recipe-title"
          >
            { drinksFilter.strDrink }
          </h1>
          <img
            src={ drinksFilter.strDrinkThumb }
            alt={ drinksFilter.strDrink }
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-category"
          >
            { drinksFilter.strAlcoholic }
          </p>
          <button
            data-testid="share-btn"
            onClick={ handleShareClick }
          >
            <img
              src={ shareIcon }
              alt="Ícone de Compartilhar"
            />
          </button>
          {isCopied && (
            <p data-testid="share-message">Link copied!</p>
          )}
          <button
            onClick={ handleFavoriteClick }
          >
            <img
              data-testid="favorite-btn"
              src={ isFavorited ? blackHeart : whiteHeart }
              alt="Favorite button"
            />
          </button>
          <h2>Ingredients</h2>
          {ingredientsDrinks.map((ingre: any, index: any) => (
            <div key={ ingre }>
              <br />
              <label
                data-testid={ `${index}-ingredient-step` }
                style={
                  checkboxStates[index]
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : {}
                }
              >
                <input
                  type="checkbox"
                  name={ ingredientsDrinks }
                  checked={ checkboxStates[index] }
                  onChange={ () => handleCheckboxChange(index) }
                />
                { ingre }
              </label>
            </div>
          ))}
          <h2>Instructions</h2>
          <p
            data-testid="instructions"
          >
            { drinksFilter.strInstructions }
          </p>
          <button
            data-testid="finish-recipe-btn"
          >
            Finish Recipes
          </button>
        </div>
      ) }
    </div>
  );
}

export default RecipeInProgress;
