import { useState } from 'react';
import { MealType } from '../types';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [foundRecipes, setFoundRecipes] = useState<MealType[]>([]);
  const FIRST_LETTER = 'first-letter';
  const INGREDIENT = 'ingredient';
  const NAME = 'name';

  const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const isDrinkPage = window.location.pathname.includes('drinks');
  const isValidSearch = () => searchType.length > 0;
  const getApiUrl = () => (isDrinkPage ? 'https://www.thecocktaildb.com/api/json/v1/1' : 'https://www.themealdb.com/api/json/v1/1');
  const showAlert = (message: string) => {
    window.alert(message);
  };
  const fetchAndDisplayData = async (endpoint: RequestInfo | URL) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if (data.meals && data.meals.length === 1) {
        const recipeId = data.meals[0].idMeal;
        const url = `/meals/${recipeId}`;
        window.location.assign(url);
      } else if (data.drinks && data.drinks.length === 1) {
        const recipeId = data.drinks[0].idDrink;
        const url = `/drinks/${recipeId}`;
        window.location.assign(url);
      } else {
        console.log(data.meals);
      }
      if (data.meals && data.meals.length > 1) {
        setFoundRecipes(data.meals.slice(0, 12));
      } else if (data.drinks && data.drinks.length > 1) {
        setFoundRecipes(data.drinks.slice(0, 12));
      } else {
        setFoundRecipes([]);
        showAlert("Sorry, we haven't found any recipes for these filters.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async () => {
    if (searchTerm === FIRST_LETTER && searchType.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
      return;
    }
    if (!isValidSearch()) {
      return;
    }
    const apiUrl = getApiUrl();
    let endpoint = '';
    if (searchTerm === FIRST_LETTER) {
      endpoint = `${apiUrl}/search.php?f=${searchType}`;
    } else if (searchTerm === INGREDIENT) {
      endpoint = `${apiUrl}/filter.php?i=${searchType}`;
    } else if (searchTerm === NAME) {
      endpoint = `${apiUrl}/search.php?s=${searchType}`;
    }
    await fetchAndDisplayData(endpoint);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          id="search"
          data-testid="search-input"
          placeholder="Search"
          value={ searchType }
          onChange={ (e) => setSearchType(e.target.value) }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Search
        </button>
      </div>
      <div>
        <label>
          <input
            type="radio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            placeholder="Search"
            value="ingredient"
            checked={ searchTerm === INGREDIENT }
            onChange={ handleRadioButton }
          />
          Search by ingredient
        </label>
        <label>
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            placeholder="Search"
            value="name"
            checked={ searchTerm === NAME }
            onChange={ handleRadioButton }
          />
          Search by name
        </label>
        <label>
          <input
            type="radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
            placeholder="Search"
            value="first-letter"
            checked={ searchTerm === FIRST_LETTER }
            onChange={ handleRadioButton }
          />
          Search by first letter
        </label>
      </div>
      {foundRecipes.length > 0 && (
        <div>
          {foundRecipes.map((recipe, index) => (
            <div key={ index } data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt={ recipe.strMeal || recipe.strDrink }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                {recipe.strMeal || recipe.strDrink}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
