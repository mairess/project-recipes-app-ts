import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { apiFilterDrinks, categoryMeals, drinksRequest,
  mealsRequest, requestAPImeals, requestApiCategory } from '../utils/apiRecipes';
import { RecipeContext } from '../context/RecipeContext';

function Recipes() {
  const { recipes: recipe, setRecipes: setRecipe } = useContext(RecipeContext);
  const location = useLocation();
  const route = location.pathname.includes('meals') ? '/meals' : '/drinks';
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState('');
  const [categorys, setCategorys] = useState([]);

  async function handleClick(category: any) {
    const apiRecipes = route === '/meals' ? await mealsRequest() : await drinksRequest();
    const apiCategory = route === '/meals' ? await requestAPImeals(category.strCategory)
      : await apiFilterDrinks(category.strCategory);
    if (toggle === category.strCategory) {
      setRecipe(await apiRecipes);
      setToggle('');
      console.log('aaaa');
    } else {
      const filterMeals = await apiCategory;
      setRecipe(filterMeals);
      setToggle(category.strCategory);
      console.log('bbbb');
    }
  }

  const reset = async () => setRecipe(route === '/meals'
    ? await mealsRequest()
    : await drinksRequest());

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
              onClick={ reset }
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

      <div>
        {
            recipe.slice(0, 12).map((param: any, index: any) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ param.idMeal || param.idDrink }
              >
                <h3 data-testid={ `${index}-card-name` }>
                  {param.strMeal || param.strDrink}
                </h3>
                <NavLink
                  key={ param.strMeal || param.strDrink }
                  to={ `${route}/${param.idMeal || param.idDrink}` }
                >
                  <img
                    src={ param.strMealThumb || param.strDrinkThumb }
                    data-testid={ `${index}-card-img` }
                    alt={ param.strMeal || param.strDrink }
                  />
                </NavLink>
              </div>
            ))
          }
      </div>
    </div>

  );
}

export default Recipes;
