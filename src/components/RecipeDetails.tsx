import { useEffect, useState } from 'react';
import { MealType } from '../types';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<MealType | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeId = window.location.pathname.split('/')[2];
      const mealUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const drinkUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      let response;

      if (window.location.pathname.startsWith('/meals')) {
        response = await fetch(mealUrl);
      } else if (window.location.pathname.startsWith('/drinks')) {
        response = await fetch(drinkUrl);
      }

      if (response && response.ok) {
        const data = await response.json();
        setRecipe(data.meals ? data.meals[0] : data.drinks[0]);
      }
    };
    fetchRecipe();
  }, []);

  return (
    <div>
      {recipe ? (
        <div>
          <img
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
            <iframe
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
    </div>
  );
}

export default RecipeDetails;
