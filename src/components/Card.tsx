import { useContext } from 'react';
import useFavoritesLocalStore from '../hooks/useFavoritesLocalStore';
import { ButtonsWrapper, Container, Img, Wrapper, Name, Infos,
  Nationality } from './styles/FavoriteRecipesStyle';
import CardButtons from './CardButtons';
import FilterContext from '../context/FilterContext';

function Card() {
  const { handleRemoveFavorite, filteredFavorites } = useContext(FilterContext);

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
