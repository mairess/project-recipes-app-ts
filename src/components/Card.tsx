import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ButtonsWrapper, Container, Img, Wrapper, Name, Infos,
  Nationality } from './styles/FavoriteRecipesStyle';
import CardButtons from './CardButtons';
import FilterContext from '../context/FilterContext';
import { FavoriteRecipe } from '../types';

function Card() {
  const { handleRemoveFavorite, filteredFavorites } = useContext(FilterContext);
  const navigate = useNavigate();

  const handleImageClick = (recipe: FavoriteRecipe) => {
    let path = '';

    if (recipe.type === 'meal') {
      path = `/meals/${recipe.id}`;
    }

    if (recipe.type === 'drink') {
      path = `/drinks/${recipe.id}`;
    }

    navigate(path);
  };

  return (
    <div>
      {filteredFavorites.map((recipe, index) => (
        <Container key={ recipe.id }>
          <Img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            onClick={ () => handleImageClick(recipe) }
          />
          <Wrapper>
            <Infos>
              <Name
                onClick={ () => handleImageClick(recipe) }
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </Name>
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
