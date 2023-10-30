import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';

export function Meals() {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [meals, setMeals] = useState([]);
  const [mealsCategory, setCategory] = useState([]);

  async function mealsRequest() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    const filterData = data.meals;
    return filterData;
  }
  async function categoryMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    const filterData = data.meals;
    return filterData;
  }
  async function requestAPImeals(categorie: any) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorie}`);
    const data = await response.json();
    const filterData = data.meals.slice(0, 12);
    return filterData;
  }

  async function handleClick(category: any) {
    if (toggle) {
      setMeals(await mealsRequest());
    } else {
      const filterMeals = await requestAPImeals(category.strCategory);
      setMeals(filterMeals);
    }
    setToggle(!toggle);
  }

  async function reset() {
    setMeals(await mealsRequest());
  }

  useEffect(() => {
    async function requestAPI() {
      setLoading(true);
      const result = await mealsRequest();
      setMeals(result);
      const ressult = await categoryMeals();
      setCategory(ressult);
      setLoading(false);
    }
    requestAPI();
  }, []);

  if (loading) return <h1>CARREGANDO...</h1>;

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
          mealsCategory.slice(0, 5).map((category: any) => (
            <button
              onClick={ () => handleClick(category) }
              data-testid={ `${category.strCategory}-category-filter` }
              key={ category }
            >
              {category.strCategory}
            </button>
          ))
        }
      </div>
      <div>
        {
          meals.slice(0, 12).map((param: any, index: any) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ param }
            >
              <h3 data-testid={ `${index}-card-name` }>
                {param.strMeal}
              </h3>
              <NavLink key={ param.strMeal } to={ `/meals/${param.idMeal}` }>
                <img
                  src={ param.strMealThumb }
                  data-testid={ `${index}-card-img` }
                  alt={ param.strMeal }
                />
              </NavLink>
            </div>
          ))
        }
      </div>
    </div>
  );
}
