import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { MealType } from '../types';
import Recomendations from './Recomendations';
import useFetchRecommendations from '../hooks/useFetchRecommendation';
import useFetchDetails from '../hooks/useFetchDetails';
import { Iframe, Img } from './RecipeDetailsStyle';
import ButtonRecipe from './ButtonRecipe';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails({ type }: { type: string }) {
  const route = window.location.pathname.includes('meals') ? '/meals' : '/drinks';
  const { id } = useParams() as { id: string };
  useFetchRecommendations(route);
  const { recipe } = useFetchDetails(id, route);
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShareClick = async () => {
    if (recipe) {
      let recipeUrl;
      if (type === 'meal' && recipe.idMeal) {
        recipeUrl = `https://www.themealdb.com/meal/${recipe.idMeal}`;
      } else if (type === 'drink' && recipe.idDrink) {
        recipeUrl = `https://www.thecocktaildb.com/drink/${recipe.idDrink}`;
      }
      if (recipeUrl) {
        navigator.clipboard.writeText(recipeUrl)
          .then(() => {
            setIsCopied(true);
          })
          .catch((error) => {
            console.error('Error copying the link: ', error);
          });
      }
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div>
      {recipe ? (
        <div>
          <Img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="Recipe"
          />
          <h1 data-testid="recipe-title">
            {recipe.strMeal || recipe.strDrink}
          </h1>
          {recipe.strCategory && (
            <p data-testid="recipe-category">
              {window.location.pathname.startsWith('/meals')
                ? `Category: ${recipe.strCategory}`
                : `Alcoholic: ${recipe.strAlcoholic}`}
            </p>
          )}
          <h2>Ingredients</h2>
          <ul>
            {Object.entries(recipe as MealType)
              .filter(([key, value]) => key.startsWith('strIngredient') && value)
              .map(([key, value], index) => {
                const measureKey = `strMeasure${key.slice(13)}` as keyof MealType;
                return (
                  <li key={ key } data-testid={ `${index}-ingredient-name-and-measure` }>
                    {`${value} - ${recipe[measureKey]}`}
                  </li>
                );
              })}
          </ul>
          <h2>Instructions</h2>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          {window.location.pathname.startsWith('/meals') && recipe.strYoutube && (
            <Iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
              allowFullScreen
              title="Recipe Video"
            />
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <Recomendations
        route={ route }
      />
      <ButtonRecipe
        id={ id }
        route={ route }
      />
      {isFavorite ? (
        <button
          data-testid="favorite-btn"
          onClick={ handleFavoriteClick }
        >
          Desfavoritar
        </button>
      ) : (
        <button
          data-testid="favorite-btn"
          onClick={ handleFavoriteClick }
        >
          Favoritar
        </button>
      )}
      <button
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        Compartilhar
        <img src={ shareIcon } alt="Ícone de Compartilhar" />
      </button>
      {isCopied && (
        <div data-testid="share-message">
          Link copied!
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
