import { useNavigate } from 'react-router-dom';
import useFetchRecommendations from '../../hooks/useFetchRecommendation';
import {
  Title, Card, CardWrapper, Container, Name, Image } from './RecomendationsStyle';

type RecomendationsType = {
  route: string,
};

function Recomendations({ route }: RecomendationsType) {
  const { recommendations, loading } = useFetchRecommendations(route);
  const navigate = useNavigate();

  return (
    <Container>
      {!loading && (<Title><h1>Recommended</h1></Title>)}
      <div>
        {route === '/drinks' && (
          <CardWrapper>
            {recommendations.meals && recommendations.meals.slice(0, 6)
              .map((meal, index) => (
                <Card
                  data-testid={ `${index}-recommendation-card` }
                  key={ meal.idMeal }
                  onClick={ () => navigate(`/meals/${meal.idMeal}`) }
                >

                  <Image src={ meal.strMealThumb } alt={ meal.strMeal } />
                  <Name
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {meal.strMeal}
                  </Name>

                </Card>
              ))}
          </CardWrapper>
        )}

        {route === '/meals' && (
          <CardWrapper>
            {recommendations.drinks && recommendations.drinks.slice(0, 6)
              .map((drink, index) => (
                <Card
                  data-testid={ `${index}-recommendation-card` }
                  key={ drink.idDrink }
                  onClick={ () => navigate(`/drinks/${drink.idDrink}`) }
                >

                  <Image src={ drink.strDrinkThumb } alt={ drink.strDrink } />
                  <Name
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {drink.strDrink}
                  </Name>

                </Card>
              ))}
          </CardWrapper>
        )}
      </div>
    </Container>
  );
}

export default Recomendations;
