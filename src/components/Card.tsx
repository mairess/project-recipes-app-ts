import { useContext } from 'react';
import useFavoritesLocalStore from '../hooks/useFavoritesLocalStore';
import { ButtonsWrapper, Container, Img, Wrapper, Name, Infos,
  Nationality } from './styles/FavoriteRecipesStyle';
import CardButtons from './CardButtons';
import FilterContext from '../context/FilterContext';

function Card() {
  const { favoritesRecipes } = useFavoritesLocalStore();
  const { filter, handleRemoveFavorite } = useContext(FilterContext);

  const filteredFavorites = favoritesRecipes.filter((recipe) => {
    if (filter === 'meals') {
      return recipe.type === 'meal';
    }
    if (filter === 'drinks') {
      return recipe.type === 'drink';
    }
    return true;
  });

  // const handleRemoveFavorite = (recipeId: string) => {
  //   const updatedFavorites = favoritesRecipes.filter((recipe) => recipe.id !== recipeId);
  //   setFavoritesRecipes(updatedFavorites);
  //   localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  // };

  return (
    <div>
      {filteredFavorites.map((recipe, index) => (
        <Container key={ recipe.id }>
          <Img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
          <Wrapper>
            <Infos>
              <Name data-testid={ `${index}-horizontal-name` }>{recipe.name}</Name>
              {recipe.type === 'meal' ? (
                <Nationality
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`${recipe.nationality} - ${recipe.category}`}
                </Nationality>
              ) : (
                <Nationality
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {`Alcoólica: ${recipe.alcoholicOrNot}`}

                </Nationality>
              )}
            </Infos>
            <ButtonsWrapper>
              <CardButtons
                handleRemoveFavorite={ () => handleRemoveFavorite(recipe.id) }
                recipe={ recipe }
                index={ index }
              />
            </ButtonsWrapper>
          </Wrapper>
        </Container>
      ))}
    </div>
  );
}

export default Card;
