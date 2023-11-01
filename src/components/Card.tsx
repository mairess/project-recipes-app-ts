import useFavoritesLocalStore from '../hooks/useFavoritesLocalStore';
import { ButtonsWrapper, Container, Img, Wrapper, Name, Infos,
  Nationality } from './styles/FavoriteRecipesStyle';
import CardButtons from './CardButtons';

function Card() {
  const { favoritesRecipes, setFavoritesRecipes } = useFavoritesLocalStore();

  const handleRemoveFavorite = (recipeId: string) => {
    const updatedFavorites = favoritesRecipes.filter((recipe) => recipe.id !== recipeId);
    setFavoritesRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      {favoritesRecipes.map((recipe, index) => (
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
