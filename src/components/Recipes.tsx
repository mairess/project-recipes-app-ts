import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import RecipeContext from './context/RecipesContext';
import { apiFilterDrinks, categoryMeals, drinksRequest,
  mealsRequest, requestAPImeals, requestApiCategory } from '../apiRecipes';

function Recipes() {
  const route = window.location.pathname.includes('meals') ? '/meals' : '/drinks';
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const { recipes, toggleRecipes } = useContext(RecipeContext);

  async function handleClick(category: any) {
    const apiRecipes = route === '/meals' ? await mealsRequest() : await drinksRequest();
    const apiCategory = route === '/meals' ? await requestAPImeals(category.strCategory)
      : await apiFilterDrinks(category.strCategory);
    if (toggle === category.strCategory) {
      setRecipe(await apiRecipes);
      console.log('aaaa');
    } else {
      const filterMeals = await apiCategory;
      setRecipe(filterMeals);
      console.log('bbbb');
    }
    setToggle(category.strCategory);
    if (recipes === false) {
      toggleRecipes();
    }
  }

  async function reset() {
    const apiRecipes = route === '/meals' ? await mealsRequest() : await drinksRequest();
    setRecipe(await apiRecipes);
    if (recipes === false) {
      toggleRecipes();
    }
  }

  useEffect(() => {
    async function requestAPI() {
      const apiRecipes = route === '/meals' ? await mealsRequest()
        : await drinksRequest();
      const apiCategory = route === '/meals' ? await categoryMeals()
        : await requestApiCategory();
      setLoading(true);
      const result = await apiRecipes;
      setRecipe(result);
      const ressult = await apiCategory;
      setCategorys(ressult);
      setLoading(false);
    }
    requestAPI();
  }, [route]);

  if (loading) return <h1>CARREGANDO...</h1>;

  return (
    <div>
      {route === '/meals'
        ? (
          <div>
            <button
              data-testid="All-category-filter"
              onClick={ () => reset() }
            >
              All
            </button>
            {categorys.slice(0, 5).map((category: any) => (
              <button
                onClick={ () => handleClick(category) }
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
              >
                {category.strCategory}
              </button>
            ))}
          </div>
        )
        : (
          <div>
            <button
              data-testid="All-category-filter"
              onClick={ () => reset() }
            >
              All
            </button>
            {categorys.slice(0, 5).map((category: any) => (
              <button
                onClick={ () => handleClick(category) }
                data-testid={ `${category.strCategory}-category-filter` }
                key={ category.strCategory }
              >
                {category.strCategory}
              </button>
            ))}
          </div>
        )}
      {recipes && (
        route === '/meals' ? (
          <div>
            {
            recipe.slice(0, 12).map((param: any, index: any) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ param.idMeal }
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
        )
          : (
            <div>
              { recipe.slice(0, 12).map((drink: any, index: any) => (
                <div
                  data-testid={ `${index}-recipe-card` }
                  key={ drink.idDrink }
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
          ))}
    </div>

  );
}

export default Recipes;
