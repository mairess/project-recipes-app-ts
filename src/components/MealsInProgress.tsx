import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { mealsInProgress } from '../utils/apiRecipes';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

function MealsInProgress() {
  const navigate = useNavigate();
  const params = useParams() as { id: string };
  const [mealsFilter, setMealsFilter] = useState<any>('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const request = async () => {
      setMealsFilter(await mealsInProgress(params));
    };
    request();
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || '{}',
    );
    if (inProgressRecipes[params.id]) {
      const savedCheckboxStates = inProgressRecipes[params.id];
      setCheckboxStates(savedCheckboxStates);
      setStates(savedCheckboxStates.filter(Boolean).length);
    }
  }, [params]);

  const ingredientsMeals: any = Object.keys(mealsFilter).filter(
    (key) => mealsFilter[key] !== null
      && mealsFilter[key] !== ''
      && key.startsWith('strIngredient'),
  ).map((key) => mealsFilter[key]);

  const [checkboxStates, setCheckboxStates] = useState<any>(
    ingredientsMeals.map(() => false),
  );

  let aux = false;

  const [states, setStates] = useState(0);
  if (states === ingredientsMeals.length) {
    aux = true;
  }

  const handleCheckboxChange = (index: number) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setStates((prevState) => {
      if (newCheckboxStates[index]) {
        return prevState + 1;
      }
      return prevState - 1;
    });
    setCheckboxStates(newCheckboxStates);
    console.log(checkboxStates);
    console.log(newCheckboxStates);
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes') || '{}',
    );
    inProgressRecipes[params.id] = newCheckboxStates;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMeals') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter((id: any) => id !== params.id);
      localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, params.id];
      localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
    }
    setIsFavorite(!isFavorite);
  };

  const copyLinkToClipboard = () => {
    const recipeLink = `${window.location.origin}/meals/${params.id}`;
    navigator.clipboard.writeText(recipeLink);
    setIsCopied(true);
  };

  return (
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
        onClick={ copyLinkToClipboard }
      >
        Compartilhar
      </button>
      {isCopied && (
        <div data-testid="share-message">
          Link copied!
        </div>
      )}
      <button
        onClick={ toggleFavorite }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? whiteHeart : blackHeart }
          alt="Fav/Unfav"
        />
      </button>
      <h2>Ingredients</h2>
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
      <button
        data-testid="finish-recipe-btn"
        onClick={ () => navigate('/done-recipes') }
        disabled={ !aux }
      >
        Finalizar receita
      </button>
    </div>
  );
}

export default MealsInProgress;
