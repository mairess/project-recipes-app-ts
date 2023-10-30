import { useNavigate, useParams } from 'react-router-dom';
import { DoneRecipe, MealType } from '../types';
import Recomendations from './Recomendations';
import useFetchRecommendations from '../hooks/useFetchRecommendation';
import useFetchDetails from '../hooks/useFetchDetails';
import { ConteinerButton, Button, Iframe, Img } from './RecipeDetailsStyle';

function RecipeDetails() {
  const navigate = useNavigate();
  const route = window.location.pathname.includes('meals') ? '/meals' : '/drinks';
  const { id } = useParams() as { id: string };
  useFetchRecommendations(route);
  const { recipe } = useFetchDetails(id, route);

  const doneRecipesJSON = localStorage.getItem('doneRecipes');
  const doneRecipes = doneRecipesJSON ? JSON.parse(doneRecipesJSON) : [];
  const findRecipes = doneRecipes.find((recipes: DoneRecipe) => recipes.id === id);
  const inProgressRecipesJSON = localStorage.getItem('inProgressRecipes');
  const inProgressRecipes = inProgressRecipesJSON
    ? JSON.parse(inProgressRecipesJSON)
    : {};
  const isRecipeInProgress = inProgressRecipes[route.slice(1)]
    && inProgressRecipes[route.slice(1)][id];

  const handleClick = () => {
    navigate(`${route}/${id}/in-progress`);
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
      <ConteinerButton>

        {!findRecipes && (
          <Button
            data-testid="start-recipe-btn"
            onClick={ handleClick }
          >
            {isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </Button>
        )}

      </ConteinerButton>
    </div>
  );
}

export default RecipeDetails;
