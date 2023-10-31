import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';

export default function Drinks() {
  const [toggle, setToggle] = useState(false);
  const [drinks, setDrinks] = useState([]);
  const [drinksCategory, setdrinkCat] = useState([]);
  const [loadings, setLoadings] = useState(false);

  async function ApiFilterDrinks(categorie: string) {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categorie}`);
    const data = await response.json();
    const filterData = data.drinks;
    return filterData;
  }

  async function requestApiCategory() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(URL);
    const data = await response.json();
    const filterData = data.drinks;
    return filterData;
  }

  async function drinksRequest() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(URL);
    const data = await response.json();
    const filterData = data.drinks;
    return filterData;
  }

  useEffect(() => {
    async function request() {
      setLoadings(true);
      const result = await drinksRequest();
      setDrinks(result);
      const drinkCategoryResult = await requestApiCategory();
      setdrinkCat(drinkCategoryResult);
      setLoadings(false);
    }
    request();
  }, []);

  async function handleClick(category: { strCategory: string }) {
    if (toggle) {
      setDrinks(await drinksRequest());
    } else {
      const filterDrinks = await ApiFilterDrinks(category.strCategory);
      setDrinks(filterDrinks);
    }
    setToggle(!toggle);
  }
  async function reset() {
    setDrinks(await drinksRequest());
  }

  if (loadings) return <h1>CARREGANDO...</h1>;

  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => reset() }
        >
          All
        </button>
        {
          drinksCategory.slice(0, 5).map((category: any) => (
            <button
              onClick={ () => handleClick(category) }
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category.strCategory }
            >
              { category.strCategory }
            </button>
          ))
        }
      </div>
      <div>
        { drinks.slice(0, 12).map((drink: any, index: any) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ drink }
          >
            <h3
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
            </h3>
            <NavLink key={ drink.strDrink } to={ `/drinks/${drink.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
