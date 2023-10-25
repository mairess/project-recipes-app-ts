import { useState } from 'react';
/* import { MealType } from '../types'; */

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const FIRST_LETTER = 'first-letter';
  const INGREDIENT = 'ingredient';
  const NAME = 'name';

  const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    const validSearch = searchInput.length > 0;
    if (searchTerm === FIRST_LETTER && searchInput.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
    }
    let endpoint = '';
    if (validSearch) {
      if (searchTerm === FIRST_LETTER) {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      } else if (searchTerm === INGREDIENT) {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (searchTerm === NAME) {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      }
      const isDrinkPage = window.location.pathname.includes('drinks');
      if (isDrinkPage === true && searchTerm === FIRST_LETTER) {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${searchInput}`;
      } else if (isDrinkPage === true && searchTerm === NAME) {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else if (isDrinkPage === true && searchTerm === INGREDIENT) {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      }
    }
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data.meals);
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          id="search"
          data-testid="search-input"
          placeholder="Search"
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
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
    </div>
  );
}

export default SearchBar;
