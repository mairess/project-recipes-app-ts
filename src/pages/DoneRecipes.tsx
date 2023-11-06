import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import share from '../images/shareIcon.svg';
import { DoneRecipe } from '../types';

export default function DoneRecipes() {
  const [findBy, setFindBy] = useState('all');
  const [recipes, setRecipes] = useState<DoneRecipe[]>();
  const [IsCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const doneRecipesJSON = localStorage.getItem('doneRecipes');
    const doneRecipes = doneRecipesJSON ? JSON.parse(doneRecipesJSON) : [];
    const filterMeals = doneRecipes.filter((recipe: DoneRecipe) => recipe
      .type === 'meal');
    const filterDrinks = doneRecipes.filter((recipe: DoneRecipe) => recipe
      .type === 'drink');
    if (findBy === 'all') {
      setRecipes(doneRecipes);
    } else if (findBy === 'meal') {
      setRecipes(filterMeals);
    } else {
      setRecipes(filterDrinks);
    }
  }, [findBy]);
  console.log(recipes);
  const handleShareClick = (id: string, type: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
  };
  return (
    <div>
      <Header />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setFindBy('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setFindBy('meal') }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setFindBy('drink') }
        >
          Drinks
        </button>

      </div>
      {recipes?.map((recipe: DoneRecipe, index) => (
        <div key={ recipe.name }>
          <NavLink to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt="imagem da receita"
              height={ 150 }
            />
          </NavLink>
          <NavLink to={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </NavLink>
          {recipe.type === 'meal' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          )
            : (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.alcoholicOrNot}`}
              </p>
            )}

          <p data-testid={ `${index}-horizontal-done-date` }>{`${recipe.doneDate}`}</p>
          {recipe.tags.map((tag:string) => (
            <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </p>
          ))}
          <button onClick={ () => handleShareClick(recipe.id, recipe.type) }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ share }
              alt="Compartilhar"
            />
          </button>
          {IsCopied
          && <p>Link copied!</p>}
        </div>

      ))}
    </div>
  );
}
