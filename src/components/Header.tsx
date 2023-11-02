import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const shouldShowSearchIcon = () => {
    return !['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);
  };

  const getHeaderTitle = () => {
    if (pathname === '/meals') return 'Meals';
    if (pathname === '/drinks') return 'Drinks';
    // if (pathname === '/profile') return 'Profile';
    if (pathname === '/done-recipes') return 'Done Recipes';
    // if (pathname === '/favorite-recipes') return 'Favorite Recipes';
  };

  const handleClickProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleClickProfile }
      >
        <img
          src={ profileIcon }
          alt="profile icon"
          data-testid="profile-top-btn"
        />
      </button>
      {(pathname === '/profile' || pathname === '/favorite-recipes') ? (
        <h1>
          { getHeaderTitle() }
        </h1>
      ) : (
        <h1 data-testid="page-title">
          { getHeaderTitle() }
        </h1>
      )}
      {shouldShowSearchIcon() && (
        <span>
          <SearchBar />
        </span>
      )}

    </div>
  );
}
