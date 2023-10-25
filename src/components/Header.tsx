import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchInput, setSearchInput] = useState(false);

  const shouldShowSearchIcon = () => {
    return !['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);
  };

  const getHeaderTitle = () => {
    if (pathname === '/meals') return 'Meals';
    if (pathname === '/drinks') return 'Drinks';
    if (pathname === '/profile') return 'Profile';
    if (pathname === '/done-recipes') return 'Done Recipes';
    if (pathname === '/favorite-recipes') return 'Favorite Recipes';
    // return '';
  };
  const handleClickProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      {searchInput && (
        <input
          type="text"
          data-testid="search-input"
          name="search"
        />
      )}
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
      {shouldShowSearchIcon() && (
        <button
          onClick={ () => setSearchInput(!searchInput) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </button>
      )}
      <h1 data-testid="page-title">
        { getHeaderTitle() }
      </h1>
    </div>
  );
}
