import Button from './ButtonProfile';
import useProfile from '../../hooks/useProfile';
import logout from '../../images/logout.svg';
import favorite from '../../images/favorite.svg';
import done from '../../images/done.svg';
import icoProfile from '../../images/Perfil.svg';
import { Container, ContainerDoneRecipes, Title,
  ContainerFavoriteRecipes, ContainerLogout, Line } from '../styles/ButtonsProfileStyle';

function ButtonsProfile() {
  const { handleUserMail, handleLogout, navigate } = useProfile();

  return (
    <Container>
      <Title>
        <img src={ icoProfile } alt="Favorite" />
        <h1
          data-testid="page-title"
        >
          Profile
        </h1>
      </Title>
      <div>
        <p
          data-testid="profile-email"
        >
          { handleUserMail() }
        </p>
      </div>
      <ContainerDoneRecipes>
        <div>
          <img src={ done } alt="favorites" />
        </div>
        <div>
          <Button
            dataTestId="profile-done-btn"
            text="Done Recipes"
            onClick={ () => navigate('/done-recipes') }
          />
        </div>
      </ContainerDoneRecipes>
      <Line />
      <ContainerFavoriteRecipes>
        <div>
          <img src={ favorite } alt="favorites" />
        </div>
        <div>
          <Button
            dataTestId="profile-favorite-btn"
            text="Favorite Recipes"
            onClick={ () => navigate('/favorite-recipes') }
          />
        </div>
      </ContainerFavoriteRecipes>
      <Line />
      <ContainerLogout>
        <div>
          <img src={ logout } alt="logout" />
        </div>
        <div>
          <Button
            dataTestId="profile-logout-btn"
            text="Logout"
            onClick={ handleLogout }
          />
        </div>
      </ContainerLogout>
    </Container>
  );
}

export default ButtonsProfile;
